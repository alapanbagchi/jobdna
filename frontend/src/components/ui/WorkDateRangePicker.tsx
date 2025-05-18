import { MonthSelect } from "./MonthSelect";
import { YearSelect } from "./YearSelect";

export const WorkDateRangePicker = ({
  startingMonth,
  setStartingMonth,
  startingYear,
  setStartingYear,
  endingMonth,
  setEndingMonth,
  endingYear,
  setEndingYear,
}: any) => (
  <div className="flex items-center gap-1">
    <MonthSelect value={startingMonth} onChange={setStartingMonth} />
    <span>/</span>
    <YearSelect value={startingYear} onChange={setStartingYear} />
    <span className="mx-1">to</span>
    <MonthSelect value={endingMonth} onChange={setEndingMonth} />
    <span>/</span>
    <YearSelect value={endingYear} onChange={setEndingYear} />
  </div>
);
