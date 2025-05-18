import { useFormContext } from "react-hook-form";
import { CountryAndVisaInput } from "./CountryAndVisaInput";

export const WorkLocations = () => {
  const { getValues } = useFormContext();
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] font-medium text-accent-foreground">
        1. What countries do you want to work in? Also mention if you have the
        right to work in that country and if you will need a visa or work permit
        sponsorship. Be as detailed about your visa circumstances as possible to
        allow us to understand your situation
      </p>
      {getValues("countryVisas").map((countryVisa: any, index: number) => (
        <CountryAndVisaInput key={index} index={index} />
      ))}
    </div>
  );
};
