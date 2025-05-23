"use client";

import StatsCard from "@/components/cards/StatsCard";
import { Button } from "@/components/ui/button";
import InputsWithLabel from "@/components/ui/inputswithlabel";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

// Zod validation schema
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      <h2 className="text-[32px] font-medium text-primary mb-3">
        Welcome to Kaaryo
      </h2>
      <p className="text-[16px] mb-8 leading-7 opacity-60">
        We built a great website for you but if we do our job properly, you
        won't get to experience it too many times
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputsWithLabel
            label="Full Name"
            error={form.formState.errors.fullName?.message}
            control={form.control}
            errors={form.formState.errors}
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="What should we call you?" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </InputsWithLabel>

          <InputsWithLabel
            label="Email"
            error={form.formState.errors.email?.message}
            control={form.control}
            errors={form.formState.errors}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Where should we contact you?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </InputsWithLabel>

          <InputsWithLabel
            label="Password"
            error={
              form.formState.errors.password?.message ||
              form.formState.errors.confirmPassword?.message
            }
            control={form.control}
            errors={form.formState.errors}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password should be just as strong as your CV"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Type your password again"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </InputsWithLabel>
          <div className="flex flex-col gap-2">
            <Button type="submit">Create Account</Button>
            <Button type="button" variant="link" asChild>
              <Link href="/login">Already have an account? Login</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
