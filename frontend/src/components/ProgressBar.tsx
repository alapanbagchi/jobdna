"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react"; // Using Lucide React for the checkmark icon

interface ProgressStep {
  title: string;
  description: string;
  completed: boolean;
}

interface ProgressBarProps {
  steps?: ProgressStep[];
}

export default function ProgressBar({
  steps = [
    {
      title: "Platform Usage Details",
      description:
        "Let us know what you are here for so we can make your journey easier",
      completed: true,
    },
    {
      title: "Curriculum Vitae",
      description:
        "Let us know what you are here for so we can make your journey easier",
      completed: false,
    },
    {
      title: "Personalized Questions",
      description:
        "Let us know what you are here for so we can make your journey easier",
      completed: false,
    },
  ],
}: ProgressBarProps) {
  return (
    <div className="bg-accent rounded-xl pt-15 w-fit">
      <div className="relative flex flex-col items-start space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start relative",
              !step.completed
                ? "opacity-60 text-black"
                : "opacity-100 text-primary"
            )}
          >
            {/* Circle with Checkmark */}
            <div
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full bg-primary",
                !step.completed && "bg-primary/50"
              )}
            >
              {step.completed && <Check className="w-5 h-5 text-white" />}
            </div>

            {/* Dashed Line (not shown for the last step) */}
            {index < steps.length - 1 && (
              <div className="absolute top-8 left-4 w-0.5 h-16 border-l-2 border-dashed border-primary/50" />
            )}

            {/* Text Content */}
            <div className="ml-4">
              <h3 className="text-primary font-medium text-lg">{step.title}</h3>
              <p className="text-primary/80 opacity-80 text-sm leading-6 max-w-xs">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
