"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import InputsWithLabel from "@/components/ui/inputswithlabel";
import { WorkExperienceInput } from "@/components/CurriculumVitaeComponents/WorkExperienceInput";
import { EducationHistoryInput } from "@/components/CurriculumVitaeComponents/EducationHistoryInput";
import { SkillsInput } from "@/components/CurriculumVitaeComponents/SkillsInput";
import { LanguagesInput } from "@/components/CurriculumVitaeComponents/LanguagesInput";
import { CertificationsInput } from "@/components/CurriculumVitaeComponents/CertificationsInput";
import { AdditionalQuestionsInput } from "@/components/CurriculumVitaeComponents/AdditionalQuestionsInput";
import { useFieldArray } from "react-hook-form";
import { COUNTRIES } from "@/lib/countries";
import { LANGUAGES } from "@/lib/languages";
import { ProjectsInput } from "@/components/CurriculumVitaeComponents/ProjectsInput";
import { useEffect } from "react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) =>
  (1950 + i).toString()
);
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const jobTypes = [
  "Full Time",
  "Part Time",
  "Internship",
  "Contract",
  "Temporary",
  "Volunteer",
  "Other",
];
const proficiencies = ["native", "fluent", "intermediate", "basic"];
const countryCodes = COUNTRIES.map((c) => c.code);
const languageCodes = LANGUAGES.map((l) => l.code);

const dateRangeSchema = z.object({
  startingMonth: z.string().nonempty("Starting month is required"),
  startingYear: z.string().nonempty("Starting year is required"),
  endingMonth: z.string().nonempty("Ending month is required"),
  endingYear: z.string().nonempty("Ending year is required"),
});

const formSchema = z.object({
  personalSummary: z
    .string()
    .min(50, "Personal summary must be at least 50 characters"),
  workExperiences: z
    .array(
      z
        .object({
          companyName: z.string().nonempty("Company name is required"),
          jobTitle: z.string().nonempty("Job title is required"),
          description: z
            .string()
            .min(50, "Description must be at least 50 characters"),
          country: z
            .string()
            .nonempty("Country is required")
            .refine((val) => countryCodes.includes(val), "Invalid country"),
          jobType: z
            .string()
            .nonempty("Job type is required")
            .refine((val) => jobTypes.includes(val), "Invalid job type"),
        })
        .merge(dateRangeSchema)
        .refine(
          (data) => {
            const start = new Date(
              parseInt(data.startingYear),
              parseInt(data.startingMonth) - 1
            );
            const end = new Date(
              parseInt(data.endingYear),
              parseInt(data.endingMonth) - 1
            );
            return start <= end;
          },
          {
            message: "Start date must be before end date",
            path: ["endingYear"],
          }
        )
    )
    .min(1, "At least one work experience is required"),
  educations: z
    .array(
      z
        .object({
          schoolName: z.string().nonempty("School name is required"),
          courseName: z.string().nonempty("Course name is required"),
          modules: z.string().min(50, "Modules must be at least 50 characters"),
          achievements: z.string().optional(),
          country: z
            .string()
            .nonempty("Country is required")
            .refine((val) => countryCodes.includes(val), "Invalid country"),
          gpa: z
            .string()
            .optional()
            .refine(
              (val) => !val || /^\d(\.\d{1,2})?$/.test(val),
              "GPA must be between 0 and 4.0 (e.g., 3.5)"
            ),
        })
        .merge(dateRangeSchema)
        .refine(
          (data) => {
            const start = new Date(
              parseInt(data.startingYear),
              parseInt(data.startingMonth) - 1
            );
            const end = new Date(
              parseInt(data.endingYear),
              parseInt(data.endingMonth) - 1
            );
            return start <= end;
          },
          {
            message: "Start date must be before end date",
            path: ["endingYear"],
          }
        )
    )
    .min(1, "At least one education entry is required"),
  skills: z
    .array(
      z.object({
        category: z.string().nonempty("Skill category is required"),
        skills: z.array(z.string()).min(1, "At least one skill is required"),
        demonstrations: z.array(z.string()).optional(),
      })
    )
    .min(1, "At least one skill category is required"),
  projects: z.array(
    z.object({
      projectName: z.string().nonempty("Project name is required"),
      projectDescription: z
        .string()
        .min(50, "Project description must be at least 50 characters"),
      projectUrl: z
        .string()
        .optional()
        .refine(
          (val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val),
          "Invalid URL"
        ),
    })
  ),
  languages: z
    .array(
      z.object({
        language: z
          .string()
          .nonempty("Language is required")
          .refine((val) => languageCodes.includes(val), "Invalid language"),
        proficiency: z
          .string()
          .nonempty("Proficiency is required")
          .refine((val) => proficiencies.includes(val), "Invalid proficiency"),
      })
    )
    .min(1, "At least one language is required"),
  certifications: z
    .array(
      z
        .object({
          title: z.string().nonempty("Certification title is required"),
          organization: z.string().nonempty("Issuing organization is required"),
          credentialId: z.string().optional(),
          credentialUrl: z
            .string()
            .optional()
            .refine(
              (val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val),
              "Invalid URL"
            ),
          achievements: z.string().optional(),
        })
        .merge(dateRangeSchema)
        .refine(
          (data) => {
            const start = new Date(
              parseInt(data.startingYear),
              parseInt(data.startingMonth) - 1
            );
            const end = new Date(
              parseInt(data.endingYear),
              parseInt(data.endingMonth) - 1
            );
            return start <= end;
          },
          {
            message: "Start date must be before end date",
            path: ["endingYear"],
          }
        )
    )
    .min(1, "At least one certification is required"),
  countryVisas: z
    .array(
      z.object({
        country: z
          .string()
          .nonempty("Country is required")
          .refine((val) => countryCodes.includes(val), "Invalid country"),
        workAuthorization: z
          .string()
          .nonempty("Work Authorization is required"),
      })
    )
    .min(1, "At least one country is required"),
  jobTypes: z
    .array(
      z
        .string()
        .nonempty("Job type is required")
        .refine((val) => jobTypes.includes(val), "Invalid job type")
    )
    .min(1, "At least one job type is required"),
});

const CurriculumVitae = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalSummary: "",
      workExperiences: [
        {
          companyName: "",
          jobTitle: "",
          description: "",
          country: "",
          jobType: "",
          startingMonth: "1",
          startingYear: "2024",
          endingMonth: "12",
          endingYear: "2025",
        },
      ],
      educations: [
        {
          schoolName: "",
          courseName: "",
          modules: "",
          achievements: "",
          country: "",
          gpa: "",
          startingMonth: "1",
          startingYear: "2024",
          endingMonth: "12",
          endingYear: "2025",
        },
      ],
      skills: [
        {
          category: "",
          skills: [],
          demonstrations: [],
        },
      ],
      languages: [
        {
          language: "",
          proficiency: "",
        },
      ],
      certifications: [
        {
          title: "",
          organization: "",
          credentialId: "",
          credentialUrl: "",
          achievements: "",
          startingMonth: "1",
          startingYear: "2024",
          endingMonth: "12",
          endingYear: "2025",
        },
      ],
      projects: [
        {
          projectName: "",
          projectDescription: "",
          projectUrl: "",
        },
      ],
      countryVisas: [
        {
          country: "",
          workAuthorization: "",
        },
      ],
      jobTypes: [],
    },
  });

  const { fields: workExperienceFields, append: appendWorkExperience } =
    useFieldArray({
      control: form.control,
      name: "workExperiences",
    });

  const { fields: educationFields, append: appendEducation } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const { fields: skillFields, append: appendSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const { fields: languageFields, append: appendLanguage } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const { fields: certificationFields, append: appendCertification } =
    useFieldArray({
      control: form.control,
      name: "certifications",
    });

  const { fields: countryVisaFields, append: appendCountryVisa } =
    useFieldArray({
      control: form.control,
      name: "countryVisas",
    });

  const { fields: projectFields, append: appendProject } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2 w-full">
          <h1 className="text-2xl font-medium">Curriculum Vitae</h1>
          <p className="opacity-60 leading-6 text-[15px]">
            On Kaaryo, we match talents, not keywords. The way you say or phrase
            things here doesn't matter. Just tell us the facts and we will take
            care of the rest
          </p>
        </div>
        <div>
          <div className="mt-5">
            <InputsWithLabel
              label="Personal Summary"
              error={form.formState.errors.personalSummary?.message}
            >
              <FormField
                control={form.control}
                name="personalSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell us a little about who you are, what your aspirations are, what kind of job you would like to have and anything in general you would like us to know......"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </InputsWithLabel>
          </div>
          <div className="flex justify-between my-6 items-center">
            <h2 className="text-xl font-medium">
              Professional Work Experience
            </h2>
            <Button
              type="button"
              onClick={() =>
                appendWorkExperience({
                  companyName: "",
                  jobTitle: "",
                  description: "",
                  country: "",
                  jobType: "",
                  startingMonth: "1",
                  startingYear: "2024",
                  endingMonth: "12",
                  endingYear: "2025",
                })
              }
            >
              Add More
            </Button>
          </div>
          <div className="space-y-4">
            {workExperienceFields.map((field, index) => (
              <WorkExperienceInput key={field.id} index={index} />
            ))}
          </div>
          <div className="flex justify-between my-6 items-center">
            <h2 className="text-xl font-medium">Projects</h2>
            <Button
              type="button"
              onClick={() =>
                appendProject({
                  projectName: "",
                  projectDescription: "",
                  projectUrl: "",
                })
              }
            >
              Add More
            </Button>
          </div>
          <div className="space-y-4">
            {projectFields.map((field, index) => (
              <ProjectsInput key={field.id} index={index} />
            ))}
          </div>
          <div className="flex justify-between my-6 items-center">
            <h2 className="text-xl font-medium">Education History</h2>
            <Button
              type="button"
              onClick={() =>
                appendEducation({
                  schoolName: "",
                  courseName: "",
                  modules: "",
                  achievements: "",
                  country: "",
                  gpa: "",
                  startingMonth: "1",
                  startingYear: "2024",
                  endingMonth: "12",
                  endingYear: "2025",
                })
              }
            >
              Add More
            </Button>
          </div>
          <div className="space-y-4">
            {educationFields.map((field, index) => (
              <EducationHistoryInput key={field.id} index={index} />
            ))}
          </div>
          <div className="flex justify-between my-6 items-center">
            <h2 className="text-xl font-medium">Skills</h2>
            <Button
              type="button"
              onClick={() =>
                appendSkill({
                  category: "",
                  skills: [],
                  demonstrations: [],
                })
              }
            >
              Add More
            </Button>
          </div>
          <div className="space-y-4">
            {skillFields.map((field, index) => (
              <SkillsInput key={field.id} index={index} />
            ))}
          </div>
          <div className="flex justify-between my-6 items-center">
            <h2 className="text-xl font-medium">Languages</h2>
            <Button
              type="button"
              onClick={() =>
                appendLanguage({
                  language: "",
                  proficiency: "",
                })
              }
            >
              Add More
            </Button>
          </div>
          <div className="space-y-4">
            {languageFields.map((field, index) => (
              <LanguagesInput key={field.id} index={index} />
            ))}
          </div>
          <div className="flex justify-between my-6 items-center">
            <h2 className="text-xl font-medium">Certification</h2>
            <Button
              type="button"
              onClick={() =>
                appendCertification({
                  title: "",
                  organization: "",
                  credentialId: "",
                  credentialUrl: "",
                  achievements: "",
                  startingMonth: "1",
                  startingYear: "2024",
                  endingMonth: "12",
                  endingYear: "2025",
                })
              }
            >
              Add More
            </Button>
          </div>
          <div className="space-y-4">
            {certificationFields.map((field, index) => (
              <CertificationsInput key={field.id} index={index} />
            ))}
          </div>
          <div className="flex justify-between my-6 items-center">
            <h2 className="text-xl font-medium">Additional Questions</h2>
            <Button
              type="button"
              onClick={() =>
                appendCountryVisa({
                  country: "",
                  workAuthorization: "",
                })
              }
            >
              Add More
            </Button>
          </div>
          <AdditionalQuestionsInput />
          <Button
            type="submit"
            onClick={() => console.log(form.formState.errors)}
            className="mt-8"
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CurriculumVitae;
