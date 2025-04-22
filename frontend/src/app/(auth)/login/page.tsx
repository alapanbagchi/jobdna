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
    <div className="min-h-screen grid grid-cols-2">
      <div className="absolute top-0 left-0 w-full pt-16 px-16">
        <Navbar style="auth" />
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
            Welcome Back to Kaaryo
          </h2>
          <p className="text-[16px] mb-8 leading-7 opacity-60">
            We are trying hard to find you a job so that you don't have to log
            in too many times
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

              <Button
                type="submit"
                className="mt-6 w-full font-semibold py-2 rounded-md transition-colors"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
