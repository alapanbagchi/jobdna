"use client";

import { useFormContext, FieldPath, FieldValues } from "react-hook-form";
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
import { WorkDateRangePicker } from "./WorkDateRangePicker";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { COUNTRIES } from "@/lib/countries";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const WorkExperienceInput = ({ index }: { index: number }) => {
  const { control, formState, setValue, getValues } = useFormContext<any>();
  const [isFocused, setIsFocused] = useState(false);
  const error = (formState.errors as any).workExperiences?.[index];

  const handleRemove = () => {
    setValue(
      `workExperiences`,
      getValues("workExperiences").filter((_: any, i: number) => i !== index)
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
        aria-label="Remove work experience"
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
          "flex justify-between items-center border-b-2 border-dashed border-inherit pl-4 py-2 h-12"
        )}
      >
        <FormField
          control={control}
          name={`workExperiences.${index}.companyName`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Company Name"
                  className="p-0 m-0 h-8"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <WorkDateRangePicker namePrefix={`workExperiences.${index}`} />
      </div>

      <div
        className={cn(
          "flex justify-between items-center border-b-2 border-inherit border-dashed pl-4 py-2 h-12"
        )}
      >
        <FormField
          control={control}
          name={`workExperiences.${index}.jobTitle`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Job title"
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
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Tell us what you did at the job......"
                className="bg-transparent border-none focus:ring-0 focus-visible:ring-0 px-4 py-2 text-muted-foreground min-h-[100px]"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div
        className={cn(
          "flex justify-between items-center border-t-2 border-inherit border-dashed px-4 py-2 text-muted-foreground gap-4"
        )}
      >
        <FormField
          control={control}
          name={`workExperiences.${index}.country`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="border-0 outline-none ring-0 focus:ring-0"
                  >
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`workExperiences.${index}.jobType`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="border-0 outline-none ring-0 focus:ring-0"
                  >
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-lg h-[200px] overflow-auto p-2 bg-background">
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                  <SelectItem value="Volunteer">Volunteer</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
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
