"use client";

import * as React from "react";
import { useReducer, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { LANGUAGES } from "@/lib/languages";

// Define the shape of a single language entry
type LanguageEntry = {
  language: string;
  proficiency: string;
};

// Define the state as an array of language entries
type State = LanguageEntry[];

// Define actions for the reducer
type Action =
  | { type: "ADD_LANGUAGE" }
  | {
      type: "UPDATE_LANGUAGE";
      index: number;
      field: keyof LanguageEntry;
      value: string;
    }
  | { type: "REMOVE_LANGUAGE"; index: number };

// Initial state with one empty language entry
const initialState: State = [{ language: "", proficiency: "" }];

// Reducer to manage the languages state
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_LANGUAGE":
      return [...state, { language: "", proficiency: "" }];
    case "UPDATE_LANGUAGE":
      return state.map((entry, i) =>
        i === action.index ? { ...entry, [action.field]: action.value } : entry
      );
    case "REMOVE_LANGUAGE":
      return state.filter((_, i) => i !== action.index);
    default:
      return state;
  }
}

// Proficiency options
const PROFICIENCIES = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" },
];

// LanguagesInput Component
export const LanguagesInput = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFocused, setIsFocused] = useState(false);

  const updateLanguage =
    (index: number, field: keyof LanguageEntry) => (value: string) => {
      dispatch({ type: "UPDATE_LANGUAGE", index, field, value });

      // Check if the current row has either language or proficiency filled
      const currentEntry = { ...state[index], [field]: value };
      const isLastRow = index === state.length - 1;

      // If either field is filled in the last row, add a new empty row
      if (isLastRow && (currentEntry.language || currentEntry.proficiency)) {
        dispatch({ type: "ADD_LANGUAGE" });
      }
    };

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-gray-300 bg-[#e6eaff] p-2 w-full mx-auto",
        isFocused ? "border-primary" : "border-gray-300"
      )}
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-dashed border-gray-300">
            <th className="text-muted-foreground text-[15px] font-medium p-2 text-left">
              Language
            </th>
            <th className="text-muted-foreground text-[15px] font-medium p-2 text-left">
              Proficiency
            </th>
          </tr>
        </thead>
        <tbody>
          {state.map((entry, index) => (
            <tr
              key={index}
              className={cn(
                "border-dashed border-gray-300",
                isFocused ? "border-primary" : "border-gray-300",
                index !== state.length - 1 && "border-b"
              )}
            >
              <td className="p-2">
                <Select
                  value={entry.proficiency}
                  onValueChange={updateLanguage(index, "proficiency")}
                >
                  <SelectTrigger
                    className="border-0 outline-none ring-0 focus:ring-0 w-full h-8 bg-transparent px-0"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  >
                    <SelectValue placeholder="Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((prof) => (
                      <SelectItem key={prof.name} value={prof.code}>
                        {prof.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="p-2 text-right">
                <Select
                  value={entry.proficiency}
                  onValueChange={updateLanguage(index, "proficiency")}
                >
                  <SelectTrigger
                    className="border-0 outline-none ring-0 focus:ring-0 w-full h-8 bg-transparent px-0"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  >
                    <SelectValue placeholder="Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROFICIENCIES.map((prof) => (
                      <SelectItem key={prof.value} value={prof.value}>
                        {prof.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
