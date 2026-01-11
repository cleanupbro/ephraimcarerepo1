"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

interface Question {
  id: number;
  question: string;
  emoji: string;
  options: {
    label: string;
    value: string;
    emoji: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Who needs support?",
    emoji: "👤",
    options: [
      { label: "Myself", value: "self", emoji: "🙋" },
      { label: "A family member", value: "family", emoji: "👨‍👩‍👧" },
      { label: "A client I support", value: "professional", emoji: "💼" },
    ],
  },
  {
    id: 2,
    question: "What type of support is needed?",
    emoji: "🎯",
    options: [
      { label: "Daily living & personal care", value: "personal", emoji: "🏠" },
      { label: "Community access & social", value: "community", emoji: "🌍" },
      { label: "Mental health & recovery", value: "mental", emoji: "💚" },
      { label: "Multiple types", value: "multiple", emoji: "✨" },
    ],
  },
  {
    id: 3,
    question: "How often is support needed?",
    emoji: "📅",
    options: [
      { label: "Daily", value: "daily", emoji: "☀️" },
      { label: "A few times a week", value: "weekly", emoji: "📆" },
      { label: "Weekly", value: "once-weekly", emoji: "🗓️" },
      { label: "As needed / flexible", value: "flexible", emoji: "🔄" },
    ],
  },
  {
    id: 4,
    question: "Where will support be provided?",
    emoji: "📍",
    options: [
      { label: "At home", value: "home", emoji: "🏡" },
      { label: "In the community", value: "community", emoji: "🌳" },
      { label: "Both home & community", value: "both", emoji: "🔀" },
    ],
  },
];

const recommendations: Record<string, string[]> = {
  personal: ["Personal Care", "Household Tasks", "Life Skills"],
  community: ["Community Care", "Travel Care", "Group Activities"],
  mental: ["Psychosocial Recovery", "Community Care"],
  multiple: ["Personal Care", "Community Care", "Life Skills", "Plan Management"],
};

export function ServiceQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentStep]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setIsComplete(true), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  const getRecommendedServices = () => {
    const supportType = answers[1] || "multiple";
    return recommendations[supportType] || recommendations.multiple;
  };

  return (
    <section className="section bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Service Finder
          </span>
          <h2 className="text-balance">Not Sure Which Service You Need?</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Answer a few quick questions and we will recommend the best services for your situation.
          </p>
        </FadeIn>

        {/* Quiz Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
            {/* Progress bar */}
            <div className="h-2 bg-neutral-100">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{
                  width: isComplete
                    ? "100%"
                    : `${((currentStep + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Question */}
                    <div className="text-center mb-8">
                      <span className="text-4xl mb-4 block">
                        {questions[currentStep].emoji}
                      </span>
                      <p className="text-sm text-neutral-500 mb-2">
                        Question {currentStep + 1} of {questions.length}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                        {questions[currentStep].question}
                      </h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {questions[currentStep].options.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option.value)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            answers[currentStep] === option.value
                              ? "border-primary bg-primary-50"
                              : "border-neutral-200 hover:border-primary-300 hover:bg-neutral-50"
                          }`}
                        >
                          <span className="text-2xl">{option.emoji}</span>
                          <span className="font-medium text-neutral-900">
                            {option.label}
                          </span>
                          {answers[currentStep] === option.value && (
                            <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Navigation */}
                    {currentStep > 0 && (
                      <button
                        onClick={goBack}
                        className="mt-6 flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    {/* Success */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      Here are your recommended services
                    </h3>

                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {getRecommendedServices().map((service) => (
                        <span
                          key={service}
                          className="px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <p className="text-neutral-600 mb-8">
                      Based on your answers, these services would best support your needs.
                      Contact us for a personalized consultation!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="shadow-lg">
                        <Link href="/referrals">
                          Make a Referral
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" onClick={restart}>
                        Start Over
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
