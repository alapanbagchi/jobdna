// components/StatsCard.tsx
interface StatsCardProps {
  value: string;
  description: string;
}

export default function StatsCard({ value, description }: StatsCardProps) {
  return (
    <div className="relative p-6 rounded-xl overflow-hidden bg-[#B3B8F5] w-[240px] h-[200px]">
      <div className="absolute z-10 mt-auto h-fit bottom-7">
        <div className="text-2xl font-bold text-[#424994]">{value}</div>
        <div className="text-sm text-[#424994]">{description}</div>
      </div>
    </div>
  );
}
