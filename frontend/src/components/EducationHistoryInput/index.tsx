import { useReducer, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { COUNTRIES } from "@/lib/countries";
import { WorkDateRangePicker } from "./WorkDateRangePicker";

type State = {
  schoolName: string;
  courseName: string;
  modules: string;
  achievements: string;
  country: string;
  startingMonth: string;
  startingYear: string;
  endingMonth: string;
  endingYear: string;
  gpa: string;
};

type Action = { type: "SET_FIELD"; field: keyof State; value: string };

const initialState: State = {
  schoolName: "",
  courseName: "",
  modules: "",
  achievements: "",
  country: "",
  startingMonth: "1",
  startingYear: "2024",
  endingMonth: "12",
  endingYear: "2025",
  gpa: "",
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
export const EducationHistoryInput = () => {
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
          placeholder="School Name"
          className="p-0 m-0 h-8"
          value={state.schoolName}
          onChange={(e) => set("schoolName")(e.target.value)}
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
          placeholder="Course Name"
          className="p-0 m-0 h-8"
          value={state.courseName}
          onChange={(e) => set("courseName")(e.target.value)}
        />
        <Input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          placeholder="Grade/GPA"
          className="p-0 m-0 h-8 w-[200px]"
          value={state.gpa}
          onChange={(e) => set("gpa")(e.target.value)}
        />
      </div>

      {/* Description */}
      <Textarea
        placeholder="Tell us about the core modules that you studied in this course...."
        className={cn(
          "bg-transparent border-b focus:ring-0 focus-visible:ring-0 px-4 py-2 text-muted-foreground min-h-[100px]",
          isFocused ? "border-primary" : "border-border"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={state.modules}
        onChange={(e) => set("modules")(e.target.value)}
      />
      <Textarea
        placeholder="Tell us about any extracurricular activities or achievements from your course..."
        className={cn(
          "bg-transparent border-t focus:ring-0 focus-visible:ring-0 px-4 py-2 text-muted-foreground min-h-[100px]",
          isFocused ? "border-primary" : "border-border"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={state.achievements}
        onChange={(e) => set("achievements")(e.target.value)}
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
      </div>
    </div>
  );
};
