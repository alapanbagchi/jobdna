import { useReducer, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";
import { COUNTRIES } from "@/lib/countries";
import { format } from "date-fns";

// MonthSelect Component
const MonthSelect = ({
  value,
  onChange,
  placeholder = "Month",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <Select defaultValue={value} onValueChange={onChange}>
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

// YearSelect Component
const YearSelect = ({
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

// WorkDateRangePicker Component
const WorkDateRangePicker = ({
  startingMonth,
  setStartingMonth,
  startingYear,
  setStartingYear,
  endingMonth,
  setEndingMonth,
  endingYear,
  setEndingYear,
}: any) => (
  <div className="flex items-center gap-1">
    <MonthSelect value={startingMonth} onChange={setStartingMonth} />
    <span>/</span>
    <YearSelect value={startingYear} onChange={setStartingYear} />
    <span className="mx-1">to</span>
    <MonthSelect value={endingMonth} onChange={setEndingMonth} />
    <span>/</span>
    <YearSelect value={endingYear} onChange={setEndingYear} />
  </div>
);

// Reducer Setup
type State = {
  companyName: string;
  jobTitle: string;
  description: string;
  country: string;
  jobType: string;
  startingMonth: string;
  startingYear: string;
  endingMonth: string;
  endingYear: string;
};

type Action = { type: "SET_FIELD"; field: keyof State; value: string };

const initialState: State = {
  companyName: "",
  jobTitle: "",
  description: "",
  country: "",
  jobType: "",
  startingMonth: "1",
  startingYear: "2024",
  endingMonth: "12",
  endingYear: "2025",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

// Final Component
export const WorkExperienceInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFocused, setIsFocused] = useState(false);

  const set = (field: keyof State) => (value: string) =>
    dispatch({ type: "SET_FIELD", field, value });

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed transition-all w-full bg-accent mx-auto",
        isFocused ? "border-primary" : "border-border"
      )}
    >
      {/* Company Name */}
      <div
        className={cn(
          "flex justify-between items-center border-b-2 border-dashed pl-4 py-2 h-12",
          isFocused ? "border-primary" : "border-border"
        )}
      >
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Company Name"
          className="p-0 m-0 h-8"
          value={state.companyName}
          onChange={(e) => set("companyName")(e.target.value)}
        />
        <WorkDateRangePicker
          startingMonth={state.startingMonth}
          setStartingMonth={set("startingMonth")}
          startingYear={state.startingYear}
          setStartingYear={set("startingYear")}
          endingMonth={state.endingMonth}
          setEndingMonth={set("endingMonth")}
          endingYear={state.endingYear}
          setEndingYear={set("endingYear")}
        />
      </div>

      {/* Job Title */}
      <div
        className={cn(
          "flex justify-between items-center border-b-2 border-dashed pl-4 py-2 h-12",
          isFocused ? "border-primary" : "border-border"
        )}
      >
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Job title"
          className="p-0 m-0 h-8"
          value={state.jobTitle}
          onChange={(e) => set("jobTitle")(e.target.value)}
        />
      </div>

      {/* Description */}
      <Textarea
        placeholder="Tell us what you did at the job......"
        className="bg-transparent border-none focus:ring-0 focus-visible:ring-0 px-4 py-2 text-muted-foreground min-h-[100px]"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={state.description}
        onChange={(e) => set("description")(e.target.value)}
      />

      {/* Country & Job Type */}
      <div
        className={cn(
          "flex justify-between items-center border-t-2 border-dashed px-4 py-2 text-muted-foreground gap-4",
          isFocused ? "border-primary" : "border-border"
        )}
      >
        {/* Country */}
        <Select value={state.country} onValueChange={set("country")}>
          <SelectTrigger className="border-0 outline-none ring-0 focus:ring-0">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Job Type */}
        <Select value={state.jobType} onValueChange={set("jobType")}>
          <SelectTrigger className="border-0 outline-none ring-0 focus:ring-0">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
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
      </div>
    </div>
  );
};
