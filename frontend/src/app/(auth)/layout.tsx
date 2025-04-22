import StatsCard from "@/components/cards/StatsCard";
import { Navbar } from "@/components/navbar";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen grid grid-cols-2 max-[1220px]:grid-cols-1">
      <div className="fixed max-[1220px]:bg-background z-30 top-0 left-0 w-full pt-16 px-16 max-[1220px]:py-6 max-[1220px]:px-6 max-[1220px]:border-b max-[1220px]:border-dashed">
        <Navbar style={"auth"} />
      </div>

      <div className="rounded-xl min-w-[600px] max-w-[650px] bg-accent flex flex-col justify-center px-10 py-16 m-6 w-fit max-[1220px]:hidden">
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

      <div className="flex flex-col justify-center px-10 py-16 w-full h-screen overflow-auto  max-[1220px]:w-full max-[1220px]:h-fit my-auto max-[1220px]:px-6 max-[1220px]:mt-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
