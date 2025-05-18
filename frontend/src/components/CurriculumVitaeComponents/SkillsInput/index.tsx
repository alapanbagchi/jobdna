"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multi-select";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const DEMONSTRATIONS = [
  { value: "QUERKAUF_UG", label: "QUERKAUF UG" },
  { value: "PERSONAL_PORTFOLIO", label: "Personal Portfolio" },
  { value: "ECOMMERCE_APP", label: "Ecommerce App" },
];

export const SkillsInput = ({ index }: { index: number }) => {
  const { control, setValue, getValues, formState } = useFormContext();
  const [skillsInput, setSkillsInput] = useState("");

  const handleSkillsKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillsInput.trim()) {
      e.preventDefault();
      const currentSkills = getValues(`skills.${index}.skills`) || [];
      setValue(`skills.${index}.skills`, [
        ...new Set([...currentSkills, skillsInput.trim()]),
      ]);
      setSkillsInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = getValues(`skills.${index}.skills`) || [];
    setValue(
      `skills.${index}.skills`,
      currentSkills.filter((skill: string) => skill !== skillToRemove)
    );
  };
  const [isFocused, setIsFocused] = useState(false);
  const error = (formState.errors as any).skills?.[index];
  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed transition-all w-full bg-accent mx-auto",
        error &&
          (isFocused
            ? "border-destructive bg-destructive/20 "
            : "bg-destructive/20 border-destructive/40"),
        isFocused && !error && "border-primary"
      )}
    >
      <div
        className={cn("border-b-2 border-dashed border-inherit px-4 py-2 h-12")}
      >
        <FormField
          control={control}
          name={`skills.${index}.category`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Skill Category"
                  className="p-0 m-0 h-8 w-full"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className={cn("border-dashed border-b-2 border-inherit px-4 py-2")}>
        <Input
          type="text"
          placeholder="Type a skill and press Enter..."
          className="p-0 m-0 h-8 w-full "
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          onKeyPress={handleSkillsKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <FormField
          control={control}
          name={`skills.${index}.skills`}
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value?.map((skill: string) => (
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
            </FormItem>
          )}
        />
      </div>
      <div className={cn("px-2 py-2 text-muted-foreground")}>
        <FormField
          control={control}
          name={`skills.${index}.demonstrations`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MultipleSelector
                  {...field}
                  placeholder="Demonstrated in..."
                  options={DEMONSTRATIONS}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {error && (
        <div className="border-t-2 border-dashed border-inherit">
          <div className="bg-destructive p-4 rounded-md space-y-1 m-1">
            {Object.values(error).map((error: any, index) => (
              <p key={error.message} className="text-sm text-white">
                0{index + 1}. {error.message}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
