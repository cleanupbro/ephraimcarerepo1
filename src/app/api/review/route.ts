import { NextRequest, NextResponse } from "next/server";

// AI Reviewer API Keys (from environment variables)
const DEEPSEEK_API = process.env.DEEPSEEK_API_KEY || "";
const GEMINI_API = process.env.GEMINI_API_KEY || "";
const CLAUDE_API = process.env.CLAUDE_API_KEY || "";

interface Review {
  persona: string;
  type?: string;
  review?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { changes, commit, code } = await request.json();

    const reviews: Review[] = [];

    // DeepSeek Review (Technical Critic)
    try {
      const deepseekReview = await callDeepSeek(changes, commit, code);
      reviews.push({
        persona: "🔍 DeepSeek",
        type: "Technical Critic",
        review: deepseekReview
      });
    } catch (e) {
      console.error("DeepSeek error:", e);
      reviews.push({ persona: "DeepSeek", error: "API call failed" });
    }

    // Gemini Review (Google's Perspective)
    try {
      const geminiReview = await callGemini(changes, commit, code);
      reviews.push({
        persona: "🌟 Gemini",
        type: "Google's View",
        review: geminiReview
      });
    } catch (e) {
      console.error("Gemini error:", e);
      reviews.push({ persona: "Gemini", error: "API call failed" });
    }

    // Claude Review (Balanced & Thoughtful)
    try {
      const claudeReview = await callClaude(changes, commit, code);
      reviews.push({
        persona: "🎭 Claude",
        type: "Balanced Review",
        review: claudeReview
      });
    } catch (e) {
      console.error("Claude error:", e);
      reviews.push({ persona: "Claude", error: "API call failed" });
    }

    const passedReviews = reviews.filter(r => !r.error).length;
    const rating = calculateRating(reviews);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      changes,
      commit,
      reviews,
      summary: {
        completed: `${passedReviews}/${reviews.length} reviews`,
        rating: rating,
        stars: "⭐".repeat(rating)
      }
    });
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json(
      { success: false, error: "Review failed" },
      { status: 500 }
    );
  }
}

async function callDeepSeek(changes: string, commit: string, code?: string): Promise<string> {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DEEPSEEK_API}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{
        role: "system",
        content: `You are a senior code reviewer for an NDIS provider website (Next.js + TypeScript).
Be critical but constructive. Focus on:
- Bugs and edge cases
- Performance issues
- Security concerns
- Code quality
Keep response under 80 words. Be direct.`
      }, {
        role: "user",
        content: `Review this commit:
Files changed: ${changes}
Commit message: ${commit}
${code ? `\nCode snippet:\n${code}` : ""}`
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No review generated";
}

async function callGemini(changes: string, commit: string, code?: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a code reviewer from Google. Be practical and focus on scalability.
Review this commit in under 60 words:
Files: ${changes}
Commit: ${commit}
${code ? `Code:\n${code}` : ""}`
          }]
        }],
        generationConfig: {
          maxOutputTokens: 100,
          temperature: 0.7
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No review generated";
}

async function callClaude(changes: string, commit: string, code?: string): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": CLAUDE_API,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 100,
      messages: [{
        role: "user",
        content: `As a balanced code reviewer, give constructive feedback on this commit.
Be fair - acknowledge what's good, note what could improve.
Keep it under 60 words.

Files changed: ${changes}
Commit message: ${commit}
${code ? `\nCode snippet:\n${code}` : ""}`
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "No review generated";
}

function calculateRating(reviews: Review[]): number {
  const successfulReviews = reviews.filter(r => !r.error);
  if (successfulReviews.length === 0) return 1;

  // Simple rating based on review sentiment (could be improved with NLP)
  let positiveSignals = 0;
  let negativeSignals = 0;

  for (const review of successfulReviews) {
    const text = (review.review || "").toLowerCase();

    // Positive signals
    if (text.includes("good") || text.includes("nice") || text.includes("clean")) positiveSignals++;
    if (text.includes("solid") || text.includes("approve") || text.includes("well done")) positiveSignals++;

    // Negative signals
    if (text.includes("bad") || text.includes("garbage") || text.includes("terrible")) negativeSignals++;
    if (text.includes("bug") || text.includes("issue") || text.includes("problem")) negativeSignals++;
    if (text.includes("security") || text.includes("vulnerable")) negativeSignals += 2;
  }

  const score = 3 + positiveSignals - negativeSignals;
  return Math.max(1, Math.min(5, score)); // Clamp between 1-5
}
