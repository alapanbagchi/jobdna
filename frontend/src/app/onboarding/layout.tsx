import { Navbar } from "@/components/navbar";
import ProgressBar from "@/components/ProgressBar";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full grid grid-cols-2 max-[1220px]:grid-cols-1">
      <div className="fixed max-[1220px]:bg-background z-30 top-0 left-0 w-full pt-16 px-16 max-[1220px]:py-6 max-[1220px]:px-6 max-[1220px]:border-b max-[1220px]:border-dashed">
        <Navbar style={"auth"} />
      </div>
      <div className="w-full">
        <div className="rounded-xl min-w-[600px] max-w-[650px] fixed top-0 h-screen bg-accent flex flex-col justify-center px-10 py-16 w-fit max-[1220px]:hidden">
          <div className="h-full flex flex-col justify-between px-5 pt-2">
            <ProgressBar />
          </div>
        </div>
        <div className="flex flex-col px-10 pt-36 ml-auto w- absolute right-0 mr-40 h-screen max-w-[700px] max-[1220px]:w-full max-[1220px]:h-fit my-auto max-[1220px]:px-6 max-[1220px]:mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
