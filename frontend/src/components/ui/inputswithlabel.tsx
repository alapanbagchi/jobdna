"use client";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { useEffect, useState, useRef, isValidElement, ReactNode } from "react";
import { Control, FieldValues, FieldErrors } from "react-hook-form";

interface InputsWithLabelProps {
  label: string;
  children: ReactNode;
  error?: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
}

export default function InputsWithLabel({
  label,
  children,
  error,
  control,
  errors,
}: InputsWithLabelProps) {
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsErrorVisible(!!error);
  }, [error]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleFocusIn = () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
      setIsFocused(true);
    };

    const handleFocusOut = () => {
      blurTimeoutRef.current = setTimeout(() => {
        setIsFocused(false);
      }, 0);
    };

    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    return () => {
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  // Normalize children to an array
  const childrenArray = Array.isArray(children) ? children : [children];

  // Determine if any of the child inputs has an error
  const fieldNames = childrenArray
    .filter(isValidElement)
    .map((child) => (child.props as any).name)
    .filter(Boolean);

  const hasError = !!error || fieldNames.some((name) => errors[name]);
  return (
    <div className="mx-auto space-y-4">
      <div
        ref={containerRef}
        className={cn(
          "rounded-lg",
          "border-2 transition-all border-dashed",
          hasError
            ? "bg-destructive/20 border-destructive/40"
            : "bg-accent border-dashed",
          hasError && isFocused && "border-destructive",
          isFocused && !hasError && "border-primary"
        )}
      >
        <Label
          className={cn(
            "text-accent-foreground p-3 border-b-2 border-dashed transition-all",
            hasError && "border-destructive/40",
            hasError && isFocused && "border-destructive/100",
            isFocused && !hasError && "border-primary"
          )}
        >
          {label}
        </Label>
        {childrenArray.map((child, index) => {
          const name = isValidElement(child)
            ? (child.props as any).name
            : undefined;
          const childHasError = name && errors[name];
          return (
            <div
              key={index}
              className={cn(
                "w-full",
                childrenArray.length > 1 &&
                  index !== childrenArray.length - 1 &&
                  "border-b-2 border-dashed",
                childHasError && !isFocused && "border-destructive",
                isFocused && !childHasError && "border-primary",
                isFocused && childHasError && "border-destructive"
              )}
            >
              {child}
              {childHasError && (
                <p className="text-destructive text-sm mt-1 px-4 py-2 bg-destructive/20 border-t-2 border-dashed border-destructive">
                  {errors[name]?.message as string}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
