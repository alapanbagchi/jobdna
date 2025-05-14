"use client";

import { EducationHistoryInput } from "@/components/EducationHistoryInput";
import { LanguagesInput } from "@/components/LanguagesInput";
import { SkillsInput } from "@/components/SkillsInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputsWithLabel from "@/components/ui/inputswithlabel";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WorkExperienceInput } from "@/components/WorkExperienceInput";
import { cn } from "@/lib/utils";

const CurriculumVitae = () => {
  return (
    <div className="w-full">
      <div className="space-y-2 w-full">
        <h1 className="text-2xl font-medium">Curriculum Vitae</h1>
        <p className="opacity-60  leading-7">
          On Kaaryo, we match talents, not keywords. The way you say or phrase
          things here doesn't matter. Just tell us the facts and we will take
          care of the rest
        </p>
      </div>
      <div>
        <div className="mt-5">
          <InputsWithLabel label="Personal Summary">
            <Textarea placeholder="Tell us a little about who you are, what your aspirations are, what kind of job you would like to have and anything in general you would like us to know......" />
          </InputsWithLabel>
        </div>
        <div className="flex justify-between  my-6 items-center">
          <h2 className="text-xl font-medium">Professional Work Experience</h2>
          <Button>Add More</Button>
        </div>
        <WorkExperienceInput />
        <div className="flex justify-between  my-6 items-center">
          <h2 className="text-xl font-medium">Education History</h2>
          <Button>Add More</Button>
        </div>
        <EducationHistoryInput />
        <div className="flex justify-between  my-6 items-center">
          <h2 className="text-xl font-medium">Skills</h2>
        </div>
        <SkillsInput />
        <div className="flex justify-between  my-6 items-center">
          <h2 className="text-xl font-medium">Languages</h2>
        </div>
        <LanguagesInput />
        <div className="flex justify-between  my-6 items-center">
          <h2 className="text-xl font-medium">Certification</h2>
          <Button>Add More</Button>
        </div>
        <Button className="mt-8">Continue</Button>
      </div>
    </div>
  );
};

export default CurriculumVitae;
