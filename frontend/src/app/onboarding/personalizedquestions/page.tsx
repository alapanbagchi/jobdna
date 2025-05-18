"use client";

import { useForm, FormProvider } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FormValues = {
  [key: string]: string | string[] | undefined;
};

const PersonalizedQuestionsPage = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      "Do you want to work full time or something else": "",
      "Select what you know": [],
      "Describe yourself": "",
    },
  });
  const { handleSubmit, control } = methods;

  const questions = [
    {
      question: "Do you want to work full time or something else",
      type: "radio",
      options: ["Full-time", "Part-time", "Internship", "Contract", "Other"],
    },
    {
      question: "Select what you know",
      type: "checkbox",
      options: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
    },
    {
      question: "Describe yourself",
      type: "textarea",
      options: [],
    },
  ];

  const onSubmit = (data: FormValues) => {
    console.log("Form modulate submitted:", data);
    // Replace with your submission logic (e.g., API call)
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-2 w-full mb-4">
        <h1 className="text-2xl font-medium">Personalized Questions</h1>
        <p className="opacity-60 leading-6 text-[15px]">
          Here's some personalized questions for you to help us get to know you
          better and match you with the right job.
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {questions.map((q) => (
            <div key={q.question}>
              <FormField
                control={control}
                name={q.question}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">
                      {q.question}
                    </FormLabel>
                    {q.type === "radio" && (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value as string}
                        className="flex flex-col space-y-2 mt-2"
                      >
                        {q.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={option}
                                id={`${q.question}-${option}`}
                              />
                            </FormControl>
                            <Label
                              htmlFor={`${q.question}-${option}`}
                              className="font-normal"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                    {q.type === "checkbox" && (
                      <div className="flex flex-col space-y-2 mt-2">
                        {q.options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <Checkbox
                                id={`${q.question}-${option}`}
                                checked={(field.value as string[])?.includes(
                                  option
                                )}
                                onCheckedChange={(checked) => {
                                  const current =
                                    (field.value as string[]) || [];
                                  const updated = checked
                                    ? [...current, option]
                                    : current.filter((item) => item !== option);
                                  field.onChange(updated);
                                }}
                              />
                            </FormControl>
                            <Label
                              htmlFor={`${q.question}-${option}`}
                              className="font-normal"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                    {q.type === "textarea" && (
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter your response..."
                          className="bg-transparent border-2 border-dashed border-accent rounded-md focus-within:border-primary transition-all focus:ring-0 focus-visible:ring-0 px-4 py-2 text-muted-foreground min-h-[100px] mt-2"
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button type="submit" className="w-full mt-6">
            Next
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PersonalizedQuestionsPage;
