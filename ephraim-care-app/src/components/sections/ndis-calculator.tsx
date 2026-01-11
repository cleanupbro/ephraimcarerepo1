"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

const fundingCategories = [
  {
    id: "core",
    name: "Core Supports",
    emoji: "🏠",
    description: "Daily activities, transport, consumables",
    hourlyRate: 65.47,
  },
  {
    id: "capacity",
    name: "Capacity Building",
    emoji: "📈",
    description: "Skills development, therapy, training",
    hourlyRate: 75.82,
  },
  {
    id: "capital",
    name: "Capital Supports",
    emoji: "🛠️",
    description: "Equipment, home modifications",
    hourlyRate: 0, // Not hourly
  },
];

export function NDISCalculator() {
  const [selectedCategory, setSelectedCategory] = useState("core");
  const [budget, setBudget] = useState(10000);
  const [showResult, setShowResult] = useState(false);

  const category = fundingCategories.find((c) => c.id === selectedCategory)!;
  const estimatedHours = category.hourlyRate > 0 ? Math.floor(budget / category.hourlyRate) : 0;
  const estimatedWeeklyHours = Math.floor(estimatedHours / 52);

  const handleCalculate = () => {
    setShowResult(true);
  };

  return (
    <section className="section bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Funding Estimator
          </span>
          <h2 className="text-balance">NDIS Funding Calculator</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Get an estimate of how many support hours your NDIS funding could provide.
          </p>
        </FadeIn>

        {/* Calculator Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Category Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Select Funding Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {fundingCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowResult(false);
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedCategory === cat.id
                          ? "border-primary bg-primary-50"
                          : "border-neutral-200 hover:border-primary-300"
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{cat.emoji}</span>
                      <span className="font-medium text-neutral-900 text-sm block">
                        {cat.name}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {cat.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Input */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Your Annual Budget: ${budget.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={budget}
                  onChange={(e) => {
                    setBudget(Number(e.target.value));
                    setShowResult(false);
                  }}
                  className="w-full h-3 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-neutral-500 mt-2">
                  <span>$1,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              {/* Calculate Button */}
              {!showResult && (
                <Button
                  onClick={handleCalculate}
                  size="lg"
                  className="w-full"
                  disabled={category.id === "capital"}
                >
                  <Calculator className="mr-2 w-5 h-5" />
                  Calculate My Hours
                </Button>
              )}

              {/* Result */}
              {showResult && category.hourlyRate > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 text-center"
                >
                  <p className="text-sm text-neutral-600 mb-2">
                    Estimated Support Hours
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div>
                      <p className="text-5xl font-bold text-primary">
                        {estimatedHours}
                      </p>
                      <p className="text-sm text-neutral-600">hours/year</p>
                    </div>
                    <div className="w-px h-16 bg-neutral-300" />
                    <div>
                      <p className="text-5xl font-bold text-secondary-600">
                        ~{estimatedWeeklyHours}
                      </p>
                      <p className="text-sm text-neutral-600">hours/week</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-left bg-white/50 rounded-xl p-4 mb-6">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-600">
                      This is an estimate based on standard NDIS rates. Actual hours may
                      vary depending on your specific supports, location, and provider.
                      Contact us for an accurate quote.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link href="/referrals">
                        Get a Personalized Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowResult(false)}
                      className="flex-1"
                    >
                      Recalculate
                    </Button>
                  </div>
                </motion.div>
              )}

              {category.id === "capital" && (
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-yellow-800">
                    Capital supports are typically for equipment and modifications, not
                    hourly services. Contact us to discuss your specific needs.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
