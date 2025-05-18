"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";

export const CountryAndVisaInput = ({ index }: { index: number }) => {
  const { control, formState } = useFormContext();
  const error = (formState.errors as any).countryVisas?.[index];
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed transition-all w-full bg-accent mx-auto ",
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
            <th className="text-[14px] font-medium px-4 py-4 text-left">
              Country
            </th>
            <th className="text-[14px] font-medium p-2 text-left">
              Work Authorization
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={cn("border-dashed border-gray-300")}>
            <td className="py-2 px-4">
              <FormField
                control={control}
                name={`countryVisas.${index}.country`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          className="border-0 outline-none ring-0 focus:ring-0 w-full h-8 bg-transparent px-0"
                        >
                          <SelectValue placeholder="Select Country" />
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
            </td>
            <td className="p-2">
              <FormField
                control={control}
                name={`countryVisas.${index}.workAuthorization`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Work Authorization"
                        className="border-0 outline-none ring-0 focus:ring-0 w-full h-8 bg-transparent px-0"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                    </FormControl>
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
