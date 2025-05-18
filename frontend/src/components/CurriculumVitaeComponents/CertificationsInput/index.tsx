"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { WorkDateRangePicker } from "@/components/ui/WorkDateRangePicker";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const CertificationsInput = ({ index }: { index: number }) => {
  const { control, formState, setValue, getValues } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const error = (formState.errors as any).certifications?.[index];

  const handleRemove = () => {
    setValue(
      `certifications`,
      getValues("certifications").filter((_: any, i: number) => i !== index)
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
        aria-label="Remove certification"
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
          "flex justify-between border-inherit items-center border-b-2 border-dashed pl-4 py-2 h-12"
        )}
      >
        <FormField
          control={control}
          name={`certifications.${index}.title`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Certification Title"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="p-0 m-0 h-8"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <WorkDateRangePicker namePrefix={`certifications.${index}`} />
      </div>
      <div
        className={cn(
          "flex justify-between items-center border-inherit border-b-2 border-dashed pl-4 py-2 h-12 space-x-4"
        )}
      >
        <FormField
          control={control}
          name={`certifications.${index}.organization`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Issuing Organization"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="p-0 m-0 h-8 w-[200px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`certifications.${index}.credentialId`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Credential ID"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="p-0 m-0 h-8 w-[200px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`certifications.${index}.credentialUrl`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Credential URL"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="p-0 m-0 h-8 w-[200px]"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div
        className={cn(
          "flex justify-between items-center border-dashed pl-4 py-2 h-12"
        )}
      >
        <FormField
          control={control}
          name={`certifications.${index}.achievements`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Performance Metric/Grade/GPA (if applicable)"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="p-0 m-0 h-8"
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
