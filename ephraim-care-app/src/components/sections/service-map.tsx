"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, CheckCircle } from "lucide-react";
import { FadeIn } from "@/components/animations";

interface ServiceArea {
  id: string;
  name: string;
  suburbs: string[];
  position: { x: number; y: number };
  highlighted?: boolean;
}

const serviceAreas: ServiceArea[] = [
  {
    id: "liverpool",
    name: "Liverpool",
    suburbs: ["Liverpool", "Moorebank", "Chipping Norton", "Warwick Farm", "Casula", "Lurnea"],
    position: { x: 50, y: 60 },
    highlighted: true,
  },
  {
    id: "parramatta",
    name: "Parramatta",
    suburbs: ["Parramatta", "Westmead", "Harris Park", "Granville", "Merrylands", "Guildford"],
    position: { x: 60, y: 25 },
  },
  {
    id: "penrith",
    name: "Penrith",
    suburbs: ["Penrith", "Kingswood", "St Marys", "Werrington", "Emu Plains", "Jamisontown"],
    position: { x: 20, y: 20 },
  },
  {
    id: "campbelltown",
    name: "Campbelltown",
    suburbs: ["Campbelltown", "Ingleburn", "Minto", "Leumeah", "Macquarie Fields"],
    position: { x: 55, y: 85 },
  },
  {
    id: "blacktown",
    name: "Blacktown",
    suburbs: ["Blacktown", "Seven Hills", "Doonside", "Rooty Hill", "Mt Druitt", "Quakers Hill"],
    position: { x: 35, y: 15 },
  },
  {
    id: "fairfield",
    name: "Fairfield",
    suburbs: ["Fairfield", "Cabramatta", "Canley Vale", "Wetherill Park", "Smithfield"],
    position: { x: 45, y: 45 },
  },
  {
    id: "prestons",
    name: "Prestons",
    suburbs: ["Prestons", "Hoxton Park", "Edmondson Park", "Leppington", "West Hoxton"],
    position: { x: 40, y: 70 },
    highlighted: true, // Office location
  },
];

export function ServiceMap() {
  const [activeArea, setActiveArea] = useState<ServiceArea | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section className="section bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-100 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Service Areas
          </span>
          <h2 className="text-balance">We Serve Western & Southwestern Sydney</h2>
          <p className="mt-4 text-lg text-neutral-600">
            From our base in Prestons, we provide support services across Western & Southwestern Sydney.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <FadeIn className="relative">
            <div className="relative aspect-square max-w-lg mx-auto bg-gradient-to-br from-primary-50 to-white rounded-3xl border border-primary-100 shadow-xl overflow-hidden p-8">
              {/* Map background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              {/* Area markers */}
              {serviceAreas.map((area) => (
                <motion.button
                  key={area.id}
                  onClick={() => setActiveArea(activeArea?.id === area.id ? null : area)}
                  onMouseEnter={() => setHoveredArea(area.id)}
                  onMouseLeave={() => setHoveredArea(null)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${area.position.x}%`, top: `${area.position.y}%` }}
                >
                  <div
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                      area.highlighted
                        ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                        : activeArea?.id === area.id || hoveredArea === area.id
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-white text-primary border-2 border-primary shadow-md"
                    }`}
                  >
                    <MapPin className="w-5 h-5" />

                    {/* Pulse ring for highlighted areas */}
                    {area.highlighted && (
                      <span className="absolute inset-0 rounded-full bg-secondary animate-ping opacity-30" />
                    )}
                  </div>

                  {/* Label */}
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: hoveredArea === area.id || activeArea?.id === area.id ? 1 : 0, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded-lg whitespace-nowrap"
                  >
                    {area.name}
                    {area.highlighted && " (Office)"}
                  </motion.span>
                </motion.button>
              ))}

              {/* Sydney label */}
              <div className="absolute top-4 left-4 text-xs font-medium text-primary-600 bg-white/80 px-2 py-1 rounded">
                Western & SW Sydney
              </div>
            </div>
          </FadeIn>

          {/* Area Details */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              {/* Office location card */}
              <div className="bg-secondary-50 rounded-2xl p-6 border border-secondary-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Our Office</h3>
                    <p className="text-neutral-600 mt-1">
                      Factory 1A, 9 Lyn Parade<br />
                      Prestons NSW 2170
                    </p>
                  </div>
                </div>
              </div>

              {/* Areas we serve */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                <h3 className="font-bold text-neutral-900 mb-4">Areas We Serve</h3>
                <div className="grid grid-cols-2 gap-3">
                  {serviceAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setActiveArea(activeArea?.id === area.id ? null : area)}
                      className={`flex items-center gap-2 p-3 rounded-xl transition-all text-left ${
                        activeArea?.id === area.id
                          ? "bg-primary text-white"
                          : "bg-neutral-50 hover:bg-primary-50 text-neutral-700"
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${activeArea?.id === area.id ? "text-white" : "text-primary"}`} />
                      <span className="font-medium text-sm">{area.name}</span>
                    </button>
                  ))}
                </div>

                {/* Suburbs detail */}
                {activeArea && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-neutral-200"
                  >
                    <p className="text-sm font-medium text-neutral-700 mb-2">
                      Suburbs in {activeArea.name}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeArea.suburbs.map((suburb) => (
                        <span
                          key={suburb}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                        >
                          {suburb}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Travel note */}
              <p className="text-sm text-neutral-500 text-center">
                Don&apos;t see your suburb? Contact us - we may still be able to help!
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
