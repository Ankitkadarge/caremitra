"use client";

import { useMutation } from "convex/react";
import { useState, FormEvent } from "react";
import { api } from "../../convex/_generated/api";

const CONDITIONS = [
  "Type 2 diabetes",
  "Type 1 diabetes",
  "Diabetes and high blood pressure",
  "Other",
];

export default function SignupForm() {
  const joinWaitlist = useMutation(api.waitlist.joinWaitlist);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      const code = await joinWaitlist({
        caregiverName: String(form.get("caregiverName") ?? ""),
        caregiverPhone: String(form.get("caregiverPhone") ?? ""),
        parentName: String(form.get("parentName") ?? ""),
        parentCondition: String(form.get("parentCondition") ?? ""),
      });
      setInviteCode(code);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  if (inviteCode) {
    const inviteLink =
      typeof window !== "undefined"
        ? `${window.location.origin}/i/${inviteCode}`
        : `/i/${inviteCode}`;
    const shareText = `Hi! I'd like you to try CareMitra. Open this link to get started: ${inviteLink}`;

    return (
      <div className="rounded-2xl border border-line bg-accent-tint p-6">
        <p className="font-display text-xl font-semibold text-ink">
          Their invite link is ready
        </p>
        <p className="mt-2 text-[17px] text-ink-muted">
          Send this to them on WhatsApp. Save it too — you&apos;ll need it if they lose the message.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-bg px-4 py-3">
          <span className="truncate text-[17px] text-ink">{inviteLink}</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(inviteLink);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="shrink-0 text-[15px] font-medium text-accent underline underline-offset-2"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex h-14 w-full items-center justify-center rounded-full bg-accent text-[17px] font-medium text-white"
        >
          Send on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="text-[15px] font-medium text-ink-muted">Your name</span>
        <input
          name="caregiverName"
          required
          className="h-14 rounded-xl border border-line bg-white px-4 text-[17px] text-ink outline-none focus:border-accent"
          placeholder="e.g. Priya"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[15px] font-medium text-ink-muted">Their name</span>
        <input
          name="parentName"
          required
          className="h-14 rounded-xl border border-line bg-white px-4 text-[17px] text-ink outline-none focus:border-accent"
          placeholder="Your parent's name"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[15px] font-medium text-ink-muted">Their condition</span>
        <select
          name="parentCondition"
          required
          defaultValue=""
          className="h-14 rounded-xl border border-line bg-white px-4 text-[17px] text-ink outline-none focus:border-accent"
        >
          <option value="" disabled>
            Choose one
          </option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[15px] font-medium text-ink-muted">Your WhatsApp number</span>
        <input
          name="caregiverPhone"
          type="tel"
          required
          className="h-14 rounded-xl border border-line bg-white px-4 text-[17px] text-ink outline-none focus:border-accent"
          placeholder="+91 98765 43210"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 flex h-14 w-full items-center justify-center rounded-full bg-accent text-[17px] font-medium text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Getting their link…" : "Get their invite link"}
      </button>

      {status === "error" && (
        <p className="text-[15px] text-[#8a2f1f]">
          That didn&apos;t go through. Try again.
        </p>
      )}
    </form>
  );
}
