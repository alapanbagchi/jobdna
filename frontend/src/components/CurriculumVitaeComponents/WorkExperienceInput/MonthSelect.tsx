"use client";

import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export const MonthSelect = ({
  value,
  onChange,
  placeholder = "Month",
}: MonthSelectProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="border-0 outline-none ring-0 focus:ring-0 [&_svg:not([class*='text-'])]:hidden">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
        <SelectItem key={month} value={month.toString()}>
          {format(new Date(2022, month - 1), "MMMM")}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
