import { marqueeItems } from "@/lib/data";
import { cn } from "@/lib/utils";

function MarqueeSet({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center gap-6 px-3 font-heading text-lg uppercase tracking-wide sm:text-xl">
          <span>{item}</span>
          <span aria-hidden="true" className="text-coral">✦</span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="w-full overflow-hidden py-4">
      <div
        className={cn(
          "-ml-[5%] w-[110%] overflow-hidden border-y-2 border-ink py-3",
          reverse ? "rotate-1 bg-ink text-sunny" : "-rotate-1 bg-sunny text-ink"
        )}
      >
        <div className={cn("flex w-max animate-marquee", reverse && "[animation-direction:reverse]")}>
          <MarqueeSet />
          <MarqueeSet hidden />
        </div>
      </div>
    </div>
  );
}
