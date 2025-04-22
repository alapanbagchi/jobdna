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

// Zod validation schema for login form
const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .min(1, "Password is required"),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Login form submitted:", data);
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      <h2 className="text-[32px] font-medium text-primary mb-3">
        Welcome Back to Kaaryo
      </h2>
      <p className="text-[16px] mb-8 leading-7 opacity-60">
        We are trying hard to find you a job so that you don't have to log in
        too many times
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </InputsWithLabel>

          <InputsWithLabel
            label="Password"
            error={form.formState.errors.password?.message}
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
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </InputsWithLabel>

          <div className="flex flex-col gap-2">
            <Button type="submit">Log in</Button>
            <Button type="button" variant="link" asChild>
              <Link href="/register">Don't have an account? Register</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
