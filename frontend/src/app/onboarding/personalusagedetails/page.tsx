"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PersonalUsageDetails = () => {
  const [selectedOption, setSelectedOption] = useState("employer");

  return (
    <div>
      <div className="space-y-2 max-w-[700px]">
        <h1 className="text-2xl font-medium">Personal Usage Details</h1>
        <p className="opacity-60 w-[700px] leading-7">
          We want to know what you are here to do so that we can personalize
          your onboarding experience for you
        </p>
      </div>
      <RadioGroup
        value={selectedOption}
        onValueChange={(e) => setSelectedOption(e)}
        className="mt-5 gap-6 max-w-[650px]"
      >
        <div className="relative w-full">
          <RadioGroupItem
            value="employee"
            id="employee"
            className="peer sr-only"
          />
          <Label
            htmlFor="employee"
            className={cn(
              "block cursor-pointer peer-checked:bg-secondary peer-checked:text-white transition-colors duration-300 bg-accent rounded-2xl p-8",
              selectedOption === "employee" && "bg-primary text-white"
            )}
          >
            <h2 className="text-[17px] font-medium">I am here to find a job</h2>
            <p className="text-sm leading-6 mt-2 opacity-80 ">
              We will need a lot of information from you about your work
              experience, educational background and other relevant professional
              information so that we can match you with your dream job
            </p>
          </Label>
        </div>
        <div className="relative w-full">
          <RadioGroupItem
            value="employer"
            id="employer"
            className="peer sr-only"
          />
          <Label
            htmlFor="employer"
            className={cn(
              "block cursor-pointer peer-checked:bg-secondary peer-checked:text-white transition-colors duration-300 bg-accent rounded-2xl p-8",
              selectedOption === "employer" && "bg-primary text-white"
            )}
          >
            <h2 className="text-[17px] font-medium">
              I am here to hire someone
            </h2>
            <p className="text-sm leading-6 mt-2 opacity-80">
              Good news for you! You don't need to answer a plethora of
              questions just yet. You can post a job straight away and we will
              take care of the rest. In the future if you want to use Kaaryo to
              find a job, you can give us your professional information
            </p>
          </Label>
        </div>
      </RadioGroup>
      <Button className="mt-8">Continue</Button>
    </div>
  );
};

export default PersonalUsageDetails;
