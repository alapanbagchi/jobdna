"use client";

import { useEffect, useState } from "react";
import { CountryAndVisaInput } from "./CountryAndVisaInput";
import { useFormContext } from "react-hook-form";
import { WorkLocations } from "./WorkLocations";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";

export const AdditionalQuestionsInput = () => {
  const { control, formState, watch } = useFormContext();
  const error = (formState.errors as any).jobTypes?.message;
  return (
    <div className="flex flex-col gap-4">
      <WorkLocations />
      <div className="flex flex-col gap-4">
        <p className="text-[15px] font-medium text-accent-foreground">
          2. What kind of job are you looking for?
        </p>
        <div>
          <FormField
            control={control}
            name={`jobTypes`}
            render={({ field }) => (
              <FormItem>
                <MultipleSelector
                  {...field}
                  placeholder="Do you want to work full time or something else"
                  className={cn(
                    "border-2 border-dashed bg-accent py-2",
                    error && "border-destructive/40 bg-destructive/20"
                  )}
                  options={[
                    {
                      value: "Full-time",
                      label: "Full-time",
                    },
                    {
                      value: "Part-time",
                      label: "Part-time",
                    },
                    {
                      value: "Internship",
                      label: "Internship",
                    },
                    {
                      value: "Contract",
                      label: "Contract",
                    },
                    {
                      value: "Temporary",
                      label: "Temporary",
                    },
                  ]}
                />
              </FormItem>
            )}
          />
          {error && (
            <div className=" border-inherit">
              <div className="bg-destructive p-4 rounded-md space-y-1 mt-2">
                <p key={error} className="text-sm text-white">
                  {error}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
