import { type ReactNode } from "react";

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface FlightScheduleProps {
  children: ReactNode;
  className?: string;
}

/** Highlighted date — flights only */
export function FlightDateBadge({ children, className }: FlightScheduleProps) {
  return (
    <span
      className={cx(
        "inline-flex max-w-full flex-wrap items-center rounded-lg border border-safari-green/25 bg-safari-green/10 px-3 py-1.5 font-serif text-sm font-semibold text-safari-green shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Highlighted time range — flights only */
export function FlightTimeBadge({ children, className }: FlightScheduleProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md bg-safari-ivory px-3 py-1.5 font-serif text-sm font-semibold tabular-nums text-safari-green ring-2 ring-safari-green/20",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Departure or arrival block with accent bar — flights only */
export function FlightTimeBlock({
  label,
  time,
  suffix,
  align = "left",
}: {
  label: string;
  time: string;
  suffix?: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div
      className={cx(
        "rounded-xl border-safari-green bg-linear-to-r from-safari-green/12 to-transparent px-4 py-3",
        align === "left"
          ? "border-l-4"
          : "border-l-4 sm:border-l-0 sm:border-r-4 sm:bg-linear-to-l sm:text-right",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-safari-charcoal/50">
        {label}
      </p>
      <p className="mt-1 font-serif text-xl font-semibold tabular-nums text-safari-green sm:text-2xl">
        {time}
        {suffix}
      </p>
    </div>
  );
}

/** Date strip at top of a flight leg card */
export function FlightLegScheduleHeader({
  date,
  meta,
}: {
  date: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-safari-green/15 bg-safari-green/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5">
      <FlightDateBadge className="w-fit max-w-full text-balance">{date}</FlightDateBadge>
      {meta && (
        <p className="text-xs leading-relaxed text-safari-charcoal/50 sm:max-w-[55%] sm:text-right">
          {meta}
        </p>
      )}
    </div>
  );
}
