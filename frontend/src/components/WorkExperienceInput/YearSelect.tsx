import { format } from "date-fns";
import {
  SelectContent,
  SelectValue,
  Select,
  SelectTrigger,
  SelectItem,
} from "../ui/select";

export const YearSelect = ({
  value,
  onChange,
  placeholder = "Year",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <Select defaultValue={value} onValueChange={onChange}>
    <SelectTrigger className="border-0 outline-none ring-0 focus:ring-0 [&_svg:not([class*='text-'])]:hidden">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="max-h-[300px] overflow-auto">
      {Array.from(
        { length: new Date().getFullYear() - 1950 + 1 },
        (_, i) => 1950 + i
      ).map((year) => (
        <SelectItem key={year} value={year.toString()}>
          {year}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
