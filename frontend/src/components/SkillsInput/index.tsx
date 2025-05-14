"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import MultipleSelector from "../ui/multi-select";

// Sample demonstration projects (you can expand this list)
const DEMONSTRATIONS = [
  { value: "QUERKAUF_UG", label: "QUERKAUF UG" },
  { value: "PERSONAL_PORTFOLIO", label: "Personal Portfolio" },
  { value: "ECOMMERCE_APP", label: "Ecommerce App" },
];

// SkillsInput Component
export const SkillsInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [category, setCategory] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDemonstrations, setSelectedDemonstrations] = useState<
    string[]
  >([]);

  const handleSkillsKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillsInput.trim()) {
      e.preventDefault();
      setSelectedSkills([...new Set([...selectedSkills, skillsInput.trim()])]);
      setSkillsInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed transition-all w-full bg-accent mx-auto",
        isFocused ? "border-primary" : "border-border"
      )}
    >
      {/* Skill Category */}
      <div
        className={cn(
          "border-b-2 border-dashed px-4 py-2 h-12",
          isFocused ? "border-primary" : "border-border"
        )}
      >
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Skill Category"
          className="p-0 m-0 h-8 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Skills Input and Badges */}
      <div
        className={cn(
          "border-dashed px-4 py-2",
          isFocused ? "border-primary" : "border-border"
        )}
      >
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Type a skill and press Enter..."
          className="p-0 m-0 h-8 w-full"
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          onKeyPress={handleSkillsKeyPress}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 text-muted-foreground hover:text-destructive"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Demonstrated In Multi-Select */}
      <div
        className={cn(
          "border-t-2 border-dashed px-2 py-2 text-muted-foreground",
          isFocused ? "border-primary" : "border-border"
        )}
      >
        <MultipleSelector
          placeholder="Demonstrated in..."
          options={DEMONSTRATIONS}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};
