"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { COUNTRIES } from "@/lib/countries";
import { WorkDateRangePicker } from "../WorkExperienceInput/WorkDateRangePicker";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const ProjectsInput = ({ index }: { index: number }) => {
  const { control, formState, setValue, getValues } = useFormContext<any>();
  const [isFocused, setIsFocused] = useState(false);
  const error = (formState.errors as any).projects?.[index];

  const handleRemove = () => {
    setValue(
      `projects`,
      getValues("projects").filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed transition-all w-full bg-accent mx-auto relative",
        error &&
          (isFocused
            ? "border-destructive bg-destructive/20 "
            : "bg-destructive/20 border-destructive/40"),
        isFocused && !error && "border-primary"
      )}
    >
      {/* Close (X) Button */}
      <Button
        type="button"
        onClick={handleRemove}
        size="icon"
        className={cn(
          "absolute text-primary border-2 border-inherit border-dashed bg-accent -top-5 -right-4 p-1 rounded-full hover:bg-muted transition-colors",
          error &&
            "bg-destructive/20 hover:bg-destructive hover:text-white text-destructive"
        )}
        aria-label="Remove project"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>

      <div
        className={cn(
          "flex justify-between items-center border-b-2 border-inherit border-dashed pl-4 py-2 h-12"
        )}
      >
        <FormField
          control={control}
          name={`projects.${index}.projectName`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Project Name"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={cn("p-0 m-0 h-8")}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div
        className={cn(
          "flex justify-between items-center border-b-2 border-inherit border-dashed pl-4 py-2 h-12"
        )}
      >
        <FormField
          control={control}
          name={`projects.${index}.projectUrl`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Project Url"
                  className="p-0 m-0 h-8"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name={`projects.${index}.projectDescription`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Tell us more about this project"
                className={cn(
                  "bg-transparent focus:ring-0 focus-visible:ring-0 px-4 py-2 text-muted-foreground min-h-[100px]"
                )}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </FormControl>
          </FormItem>
        )}
      />
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
