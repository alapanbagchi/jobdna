"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { LANGUAGES } from "@/lib/languages";
import { useState } from "react";

const PROFICIENCIES = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" },
];

export const LanguagesInput = ({ index }: { index: number }) => {
  const { control, formState } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const error = (formState.errors as any).languages?.[index];

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
      <table className="w-full">
        <thead className="border-inherit">
          <tr className="border-b-2 border-dashed border-inherit">
            <th className="text-primary text-[14px] font-medium py-2 px-4 text-left">
              Language
            </th>
            <th className="text-primary text-[14px] font-medium py-2 px-2 text-left">
              Proficiency
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={cn("border-dashed border-inherit")}>
            <td className="px-4 py-2">
              <FormField
                control={control}
                name={`languages.${index}.language`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      >
                        <SelectTrigger className="border-0 outline-none ring-0 focus:ring-0 w-full h-8 bg-transparent px-0">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </td>
            <td className="p-2">
              <FormField
                control={control}
                name={`languages.${index}.proficiency`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      >
                        <SelectTrigger className="border-0 outline-none ring-0 focus:ring-0 w-full h-8 bg-transparent px-0">
                          <SelectValue placeholder="Proficiency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROFICIENCIES.map((prof) => (
                          <SelectItem key={prof.value} value={prof.value}>
                            {prof.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </td>
          </tr>
        </tbody>
      </table>
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
