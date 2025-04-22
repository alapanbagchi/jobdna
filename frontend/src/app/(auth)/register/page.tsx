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
    <div className="min-h-screen grid grid-cols-2">
      <div className="absolute top-0 left-0 w-full pt-16 px-16">
        <Navbar style={"auth"} />
      </div>

      <div className="rounded-xl min-w-[600px] max-w-[650px] bg-accent flex flex-col justify-center px-10 py-16 m-6 w-fit">
        <div className="h-full flex flex-col justify-between">
          <div className="my-auto">
            <h2 className="text-[32px] font-medium mb-1 text-primary leading-12">
              Can you do the job? <br />
              We'll make sure you get hired.
            </h2>
            <p className="text-[15px] my-10 w-full leading-7 text-primary/80 opacity-80">
              In a world overloaded with polished resumes and inflated titles,
              what truly counts is the ability to deliver. We believe hiring
              should be grounded in real skills — not where you studied, who you
              know, or what fancy words you used. It's time to cut through the
              noise and focus on what matters: the work, the skill, the drive.
              Because the best teams aren't built on buzzwords — they're built
              on ability.
            </p>
          </div>
          <div className="grid grid-cols-2">
            <StatsCard value="35K" description="Companies Satisfied" />
            <StatsCard value="500k" description="Candidates Hired" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-10 py-16 w-full h-screen overflow-auto">
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
                        <Input
                          placeholder="What should we call you?"
                          {...field}
                        />
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

              <Button
                type="submit"
                className="mt-6 w-full font-semibold py-2 rounded-md transition-colors"
              >
                Create Account
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
