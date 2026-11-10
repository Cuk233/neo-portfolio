"use client";

import { useReducer, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, RotateCcw, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AuditTrail,
  focusRing,
  RequestSummary,
  RoleSwitcher,
  Stamp,
  Stepper,
  type LogEntry,
  type Role,
  type Status,
  type VoucherRequest,
} from "./maker-checker-parts";

interface State {
  role: Role;
  status: Status;
  request: VoucherRequest;
  rejectReason: string;
  log: LogEntry[];
  nextId: number;
}

type Action =
  | { type: "SET_ROLE"; role: Role }
  | { type: "UPDATE_DRAFT"; patch: Partial<VoucherRequest> }
  | { type: "SUBMIT" }
  | { type: "MAKER_SELF_APPROVE_ATTEMPT" }
  | { type: "APPROVE" }
  | { type: "REJECT"; reason: string }
  | { type: "RESET" };

const DEFAULT_REQUEST: VoucherRequest = {
  name: "Payday Cashback",
  cashback: 10,
  quota: 500,
};

const REJECT_REASONS = [
  "Cashback too high",
  "Quota exceeds budget",
  "Missing campaign code",
];

function nowTime() {
  return new Date().toTimeString().slice(0, 8);
}

function addLog(state: State, actor: LogEntry["actor"], action: string): Pick<State, "log" | "nextId"> {
  const entry: LogEntry = { id: state.nextId, time: nowTime(), actor, action };
  return { log: [entry, ...state.log], nextId: state.nextId + 1 };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ROLE":
      if (state.role === action.role) return state;
      return {
        ...state,
        role: action.role,
        ...addLog(state, "SYSTEM", `Switched active session role to ${action.role}`),
      };
    case "UPDATE_DRAFT":
      return { ...state, request: { ...state.request, ...action.patch } };
    case "SUBMIT":
      if (state.status !== "DRAFT") return state;
      return {
        ...state,
        status: "PENDING_APPROVAL",
        ...addLog(
          state,
          "MAKER",
          `Submitted "${state.request.name}" (${state.request.cashback}% cashback, quota ${state.request.quota})`
        ),
      };
    case "MAKER_SELF_APPROVE_ATTEMPT":
      return {
        ...state,
        ...addLog(state, "MAKER", "Blocked self-approval attempt (RBAC four-eyes rule)"),
      };
    case "APPROVE":
      if (state.status !== "PENDING_APPROVAL" || state.role !== "CHECKER") return state;
      return {
        ...state,
        status: "APPROVED",
        ...addLog(state, "CHECKER", `Approved voucher "${state.request.name}"`),
      };
    case "REJECT":
      if (state.status !== "PENDING_APPROVAL" || state.role !== "CHECKER") return state;
      return {
        ...state,
        status: "REJECTED",
        rejectReason: action.reason.trim() || "Policy violation",
        ...addLog(state, "CHECKER", `Rejected "${state.request.name}" — ${action.reason.trim() || "Policy violation"}`),
      };
    case "RESET":
      return {
        ...state,
        role: "MAKER",
        status: "DRAFT",
        request: DEFAULT_REQUEST,
        rejectReason: "",
        ...addLog(state, "SYSTEM", "Reset sandbox to new draft"),
      };
  }
}

const initialState: State = {
  role: "MAKER",
  status: "DRAFT",
  request: DEFAULT_REQUEST,
  rejectReason: "",
  log: [],
  nextId: 1,
};

export function MakerCheckerSection() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [shakeCount, setShakeCount] = useState(0);
  const [reasonInput, setReasonInput] = useState(REJECT_REASONS[0]);
  const reduceMotion = Boolean(useReducedMotion());

  const { role, status, request, rejectReason, log } = state;

  const statusAnnouncement =
    status === "DRAFT"
      ? "Status: Draft. Maker can configure and submit a voucher request."
      : status === "PENDING_APPROVAL"
      ? "Status: Pending approval. Switch to Checker role to approve or reject."
      : status === "APPROVED"
      ? "Status: Approved by Checker."
      : `Status: Rejected by Checker. Reason: ${rejectReason}`;

  return (
    <section id="playground" className="py-20 px-4 bg-white border-b-2 border-ink">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-4xl font-heading text-ink">Try my day job 🏦</h2>
          <p className="text-base font-medium text-ink/80">
            I built Maker-Checker approval flows across 7 banking modules. Here&apos;s a tiny, harmless version — play both roles.
          </p>
        </div>

        <div className="sr-only" aria-live="polite">
          {statusAnnouncement}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 rounded-base border-2 border-ink bg-bg p-5 sm:p-6 shadow-brutal-lg space-y-5">
            <RoleSwitcher
              role={role}
              onChange={(nextRole) => dispatch({ type: "SET_ROLE", role: nextRole })}
            />

            <Stepper status={status} />

            <div className="relative rounded-base border-2 border-ink bg-white p-4 sm:p-5 space-y-4">
              {status === "DRAFT" && role === "MAKER" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch({ type: "SUBMIT" });
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="voucher-name" className="block text-xs font-heading uppercase text-ink mb-1">
                      Voucher campaign name
                    </label>
                    <input
                      id="voucher-name"
                      type="text"
                      required
                      value={request.name}
                      onChange={(e) =>
                        dispatch({ type: "UPDATE_DRAFT", patch: { name: e.target.value } })
                      }
                      className={cn(
                        "w-full rounded-base border-2 border-ink bg-white px-3 py-2 text-sm font-medium text-ink",
                        focusRing
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="voucher-cashback" className="flex justify-between text-xs font-heading uppercase text-ink mb-1">
                        <span>Cashback %</span>
                        <span className="font-mono text-coral">{request.cashback}%</span>
                      </label>
                      <input
                        id="voucher-cashback"
                        type="range"
                        min={1}
                        max={50}
                        value={request.cashback}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_DRAFT",
                            patch: { cashback: Number(e.target.value) },
                          })
                        }
                        className="w-full accent-coral cursor-pointer"
                      />
                    </div>

                    <div>
                      <label htmlFor="voucher-quota" className="block text-xs font-heading uppercase text-ink mb-1">
                        User quota
                      </label>
                      <input
                        id="voucher-quota"
                        type="number"
                        min={10}
                        max={10000}
                        step={50}
                        value={request.quota}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_DRAFT",
                            patch: { quota: Math.max(10, Number(e.target.value) || 10) },
                          })
                        }
                        className={cn(
                          "w-full rounded-base border-2 border-ink bg-white px-3 py-1.5 text-sm font-mono text-ink",
                          focusRing
                        )}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-base border-2 border-ink bg-coral px-4 py-2 text-sm font-heading text-ink shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm",
                      focusRing
                    )}
                  >
                    <Send className="size-4" aria-hidden="true" />
                    Submit for approval
                  </button>
                </form>
              )}

              {status === "DRAFT" && role === "CHECKER" && (
                <div className="py-6 text-center space-y-3">
                  <p className="text-sm font-medium text-ink">
                    Nothing to review yet — switch to <strong>Maker</strong> and create a request.
                  </p>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "SET_ROLE", role: "MAKER" })}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-base border-2 border-ink bg-coral px-4 py-2 text-xs font-heading text-ink shadow-brutal-sm",
                      focusRing
                    )}
                  >
                    Switch to Maker
                  </button>
                </div>
              )}

              {status !== "DRAFT" && (
                <div className="space-y-4">
                  <RequestSummary request={request} />

                  {status === "PENDING_APPROVAL" && role === "MAKER" && (
                    <div className="rounded-base border-2 border-ink bg-sunny/60 p-3 space-y-2">
                      <p className="text-xs font-bold text-ink flex items-center gap-1.5">
                        <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
                        🚫 Four-eyes principle: makers can&apos;t approve their own request.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <motion.button
                          key={shakeCount}
                          type="button"
                          animate={
                            shakeCount > 0 && !reduceMotion
                              ? { x: [0, -8, 8, -6, 6, 0] }
                              : undefined
                          }
                          transition={{ duration: 0.35 }}
                          onClick={() => {
                            setShakeCount((c) => c + 1);
                            dispatch({ type: "MAKER_SELF_APPROVE_ATTEMPT" });
                          }}
                          className={cn(
                            "rounded-base border-2 border-ink bg-ink/10 px-3 py-1.5 text-xs font-heading text-ink/70 cursor-not-allowed",
                            focusRing
                          )}
                        >
                          Try to self-approve anyway
                        </motion.button>
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "SET_ROLE", role: "CHECKER" })}
                          className={cn(
                            "rounded-base border-2 border-ink bg-teal px-3 py-1.5 text-xs font-heading text-ink shadow-brutal-sm",
                            focusRing
                          )}
                        >
                          Switch to Checker to review →
                        </button>
                      </div>
                    </div>
                  )}

                  {status === "PENDING_APPROVAL" && role === "CHECKER" && (
                    <div className="space-y-3 pt-2 border-t-2 border-dashed border-ink/20">
                      <div className="flex flex-wrap gap-2 items-center">
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "APPROVE" })}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-base border-2 border-ink bg-teal px-4 py-2 text-sm font-heading text-ink shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm",
                            focusRing
                          )}
                        >
                          <Check className="size-4" aria-hidden="true" />
                          Approve request
                        </button>
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "REJECT", reason: reasonInput })}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-base border-2 border-ink bg-coral px-4 py-2 text-sm font-heading text-ink shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm",
                            focusRing
                          )}
                        >
                          <X className="size-4" aria-hidden="true" />
                          Reject
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="reject-reason" className="block text-xs font-bold text-ink">
                          Rejection reason (if rejecting):
                        </label>
                        <input
                          id="reject-reason"
                          type="text"
                          value={reasonInput}
                          onChange={(e) => setReasonInput(e.target.value)}
                          className={cn(
                            "w-full rounded-base border-2 border-ink bg-white px-2.5 py-1 text-xs text-ink",
                            focusRing
                          )}
                        />
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {REJECT_REASONS.map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setReasonInput(preset)}
                              className="rounded-base border border-ink bg-sunny/60 px-2 py-0.5 text-xs font-medium text-ink hover:bg-sunny"
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Stamp status={status} reason={rejectReason} reduceMotion={reduceMotion} />
            </div>

            {(status === "APPROVED" || status === "REJECTED") && (
              <button
                type="button"
                onClick={() => dispatch({ type: "RESET" })}
                className={cn(
                  "inline-flex items-center gap-2 rounded-base border-2 border-ink bg-sunny px-4 py-2 text-sm font-heading text-ink shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm",
                  focusRing
                )}
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Start over
              </button>
            )}
          </div>

          <div className="lg:col-span-5">
            <AuditTrail log={log} reduceMotion={reduceMotion} />
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm font-mono text-ink/70">
          Real version: 7 modules · granular RBAC · Next.js Edge Middleware · full audit trail.
        </p>
      </div>
    </section>
  );
}
