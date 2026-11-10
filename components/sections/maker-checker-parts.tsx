"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Role = "MAKER" | "CHECKER";
export type Status = "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "REJECTED";

export interface VoucherRequest {
  name: string;
  cashback: number;
  quota: number;
}

export interface LogEntry {
  id: number;
  time: string;
  actor: Role | "SYSTEM";
  action: string;
}

export const HIGH_CASHBACK = 30;
const AVG_TXN_IDR = 100_000;

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2";

const ROLE_META: Record<Role, { label: string; color: string; perms: string }> = {
  MAKER: { label: "Maker", color: "bg-coral", perms: "can create · cannot approve" },
  CHECKER: { label: "Checker", color: "bg-teal", perms: "can approve/reject · cannot create" },
};

const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function RoleSwitcher({ role, onChange }: { role: Role; onChange: (role: Role) => void }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div role="group" aria-label="Choose your role" className="flex gap-2">
        {(Object.keys(ROLE_META) as Role[]).map((r) => {
          const active = r === role;
          return (
            <button
              key={r}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(r)}
              className={cn(
                "rounded-base border-2 border-ink px-4 py-2 font-heading text-ink transition-all",
                focusRing,
                active
                  ? cn(ROLE_META[r].color, "shadow-none translate-x-[2px] translate-y-[2px]")
                  : "bg-white shadow-brutal-sm hover:-translate-y-0.5"
              )}
            >
              {ROLE_META[r].label}
            </button>
          );
        })}
      </div>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-base border-2 border-ink bg-white px-2.5 py-1 font-mono text-xs text-ink">
        <ShieldCheck className="size-3.5" aria-hidden />
        RBAC: {ROLE_META[role].perms}
      </span>
    </div>
  );
}

const STEPS = ["Draft", "Pending", "Decision"] as const;

export function Stepper({ status }: { status: Status }) {
  const current = status === "DRAFT" ? 0 : status === "PENDING_APPROVAL" ? 1 : 2;
  const decisionColor = status === "REJECTED" ? "bg-coral" : "bg-teal";
  return (
    <ol className="flex items-center gap-1 text-xs font-heading text-ink sm:text-sm" aria-label="Request progress">
      {STEPS.map((step, i) => (
        <li key={step} className="flex flex-1 items-center gap-1" aria-current={i === current ? "step" : undefined}>
          <span
            className={cn(
              "flex-1 rounded-base border-2 border-ink px-2 py-1 text-center",
              i < current && "bg-ink/10",
              i === current && (i === 2 ? decisionColor : "bg-sunny") + " shadow-brutal-sm",
              i > current && "bg-white opacity-60"
            )}
          >
            {i === 2 && status === "APPROVED" ? "Approved" : i === 2 && status === "REJECTED" ? "Rejected" : step}
          </span>
          {i < STEPS.length - 1 && <span aria-hidden className="text-ink/60">→</span>}
        </li>
      ))}
    </ol>
  );
}

export function RequestSummary({ request }: { request: VoucherRequest }) {
  const rows: [string, string][] = [
    ["Voucher name", request.name],
    ["Cashback", `${request.cashback}%`],
    ["Quota", `${request.quota.toLocaleString("id-ID")} users`],
  ];
  const exposure = request.quota * AVG_TXN_IDR * (request.cashback / 100);
  return (
    <div className="space-y-3">
      <table className="w-full text-left text-sm text-ink">
        <caption className="sr-only">Changes in this request</caption>
        <thead>
          <tr className="border-b-2 border-ink font-heading">
            <th scope="col" className="py-1 pr-2">Field</th>
            <th scope="col" className="py-1 pr-2">Before</th>
            <th scope="col" className="py-1">After</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {rows.map(([field, value]) => (
            <tr key={field} className="border-b border-ink/20">
              <th scope="row" className="py-1.5 pr-2 font-sans font-base">{field}</th>
              <td className="py-1.5 pr-2 text-ink/50 line-through">—</td>
              <td className="break-all py-1.5 bg-teal/20">+ {value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-ink/70">
        Max exposure ≈ <strong className="font-mono text-ink">{idr.format(exposure)}</strong>{" "}
        (quota × cashback × Rp100k avg. txn)
      </p>
      {request.cashback > HIGH_CASHBACK && (
        <p className="w-fit rounded-base border-2 border-ink bg-sunny px-2 py-1 text-xs font-heading text-ink">
          ⚠️ High cashback — needs extra scrutiny
        </p>
      )}
    </div>
  );
}

export function Stamp({ status, reason, reduceMotion }: { status: Status; reason: string; reduceMotion: boolean }) {
  if (status !== "APPROVED" && status !== "REJECTED") return null;
  const approved = status === "APPROVED";
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
      <motion.div
        initial={reduceMotion ? false : { scale: 2, opacity: 0, rotate: -25 }}
        animate={{ scale: 1, opacity: 1, rotate: -12 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={cn(
          "max-w-full rounded-base border-4 bg-white/90 px-4 py-2 text-center font-heading uppercase tracking-widest shadow-brutal",
          approved ? "border-sea text-sea" : "border-coral text-coral"
        )}
      >
        <span className="flex items-center justify-center gap-2 text-2xl sm:text-4xl">
          {approved ? <Check className="size-8" aria-hidden /> : <X className="size-8" aria-hidden />}
          {approved ? "Approved ✅" : "Rejected"}
        </span>
        {!approved && <span className="mt-1 block text-xs normal-case tracking-normal text-ink">Reason: {reason}</span>}
      </motion.div>
    </div>
  );
}

export function AuditTrail({ log, reduceMotion }: { log: LogEntry[]; reduceMotion: boolean }) {
  return (
    <aside aria-labelledby="audit-heading" className="rounded-base border-2 border-ink bg-ink p-4 text-white shadow-brutal">
      <h3 id="audit-heading" className="mb-3 font-heading text-lg text-sunny">Audit trail</h3>
      {log.length === 0 ? (
        <p className="font-mono text-xs text-white/60">No events yet. Every action lands here.</p>
      ) : (
        <ol className="max-h-80 space-y-1.5 overflow-y-auto font-mono text-xs">
          <AnimatePresence initial={false}>
            {log.map((entry) => (
              <motion.li
                key={entry.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="break-words border-b border-white/10 pb-1.5"
              >
                <span className="text-white/50">{entry.time}</span>{" "}
                <span className={cn(entry.actor === "MAKER" ? "text-coral" : entry.actor === "CHECKER" ? "text-teal" : "text-lilac")}>
                  [{entry.actor}]
                </span>{" "}
                {entry.action}
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      )}
    </aside>
  );
}
