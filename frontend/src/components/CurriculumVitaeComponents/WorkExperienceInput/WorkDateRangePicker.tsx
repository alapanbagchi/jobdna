"use client";

import { MonthSelect } from "./MonthSelect";
import { YearSelect } from "./YearSelect";
import { Controller, useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

interface WorkDateRangePickerProps {
  namePrefix: string;
}
export const WorkDateRangePicker = ({
  namePrefix,
}: WorkDateRangePickerProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <FormField
          control={control}
          name={`${namePrefix}.startingMonth`}
          render={({ field }) => (
            <FormItem>
              <MonthSelect value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <span>/</span>
        <FormField
          control={control}
          name={`${namePrefix}.startingYear`}
          render={({ field }) => (
            <FormItem>
              <YearSelect value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="mx-1">to</span>
        <FormField
          control={control}
          name={`${namePrefix}.endingMonth`}
          render={({ field }) => (
            <FormItem>
              <MonthSelect value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <span>/</span>
        <FormField
          control={control}
          name={`${namePrefix}.endingYear`}
          render={({ field }) => (
            <FormItem>
              <YearSelect value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
