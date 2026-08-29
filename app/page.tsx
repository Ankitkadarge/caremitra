import SignupForm from "./components/SignupForm";

function DiyaMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 20c0 5 5.4 8 12 8s12-3 12-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="16" cy="20" rx="12" ry="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 6c-2.2 2.6-3.2 4.6-3.2 6.4 0 2 1.4 3.6 3.2 3.6s3.2-1.6 3.2-3.6C19.2 10.6 18.2 8.6 16 6Z"
        fill="var(--accent)"
      />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-ink-muted">
      {children}
    </p>
  );
}

function IconVoice() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <rect x="13" y="4" width="4" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 14v1a7 7 0 0 0 14 0v-1M15 22v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconThread() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="21" cy="15" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="21" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.8 10.4 18.2 13.6M18.2 16.4 11.8 19.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconFlag() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <path d="M9 4v22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M9 5.5c3 -1.6 5.5 -1.6 8 0s5 1.6 8 0v10c-3 1.6-5.5 1.6-8 0s-5-1.6-8 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURES = [
  {
    icon: IconVoice,
    title: "Speaks their language",
    body: "Hindi, Tamil, Bengali, whatever they're comfortable in. No apps to open, no menus — just talking.",
  },
  {
    icon: IconThread,
    title: "Remembers, so they don't repeat themselves",
    body: "Yesterday's walk, this morning's meal, last week's dizzy spell — Diya keeps track, so every call picks up where the last one left off.",
  },
  {
    icon: IconFlag,
    title: "Tells you only what matters",
    body: "Not a transcript. A short, plain update — and a nudge on the days something's actually worth a call.",
  },
];

const FINDINGS = [
  {
    quote:
      "When family stays involved in a person's day-to-day diabetes care, self-management improves and blood sugar control gets better over time.",
    source: "Journal of Behavioral Medicine, 2021 — FAMS family-involvement study",
    href: "https://link.springer.com/article/10.1007/s10865-021-00250-w",
  },
  {
    quote:
      "Automated phone check-ins, backed by a nurse following up, improved blood sugar control and how satisfied patients felt with their care.",
    source: "Diabetes Care, 2001 — Piette et al., VA health system trial",
    href: "https://pubmed.ncbi.nlm.nih.gov/11213866/",
  },
  {
    quote:
      "Patients treated in their own language showed a real improvement in blood sugar control, compared to being treated in a language they weren't fluent in.",
    source: "Journal of General Internal Medicine, 2014 — language concordance & diabetes self-care",
    href: "https://link.springer.com/article/10.1007/s11606-014-3006-7",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-40 blur-[90px] motion-safe:animate-[pulse_5s_ease-in-out_infinite]"
          style={{ background: "var(--accent-glow)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 pt-14 pb-16 md:px-10 md:pt-24 md:pb-24">
          <div className="flex items-center gap-2 text-ink">
            <DiyaMark className="h-6 w-6 text-accent" />
            <span className="font-display text-xl">Diya</span>
          </div>

          <div className="mt-8 max-w-2xl">
            <Eyebrow>For families managing a parent&apos;s diabetes from another city</Eyebrow>
            <h1 className="mt-4 font-display text-[2.3rem] leading-[1.1] text-ink sm:text-[2.8rem] md:text-[3.4rem]">
              They say they&apos;re fine. Diya checks anyway.
            </h1>
            <p className="mt-5 max-w-lg text-[17px] text-ink-muted md:text-[18px]">
              Diya calls your parent every day, speaks with them in their own language, and
              sends you a short update — so you know, without having to ask.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#signup"
                className="flex h-14 w-full items-center justify-center rounded-full bg-accent px-8 text-[17px] font-medium text-bg sm:w-auto"
              >
                Set up their Diya
              </a>
              <a
                href="#how-it-helps"
                className="flex h-14 w-full items-center justify-center rounded-full border border-line px-8 text-[17px] font-medium text-ink sm:w-auto"
              >
                See how it helps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* A day with Diya */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>A day with Diya</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink md:text-[2.4rem]">
            Lit in the morning. Still glowing by evening.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-bg-elevated p-6 md:p-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-accent">
                8:30 AM
              </p>
              <p className="mt-3 text-[17px] text-ink">
                Diya calls. &ldquo;Sugar thoda high hai, par medicine le li hai,&rdquo; they might
                say — high, but the medicine&apos;s taken. Diya listens, asks a gentle
                follow-up, and remembers it for tomorrow.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-bg-elevated p-6 md:p-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-accent">
                7:00 PM
              </p>
              <p className="mt-3 text-[17px] text-ink">
                You get a short note on WhatsApp: what they said, what&apos;s changed since
                yesterday, and whether tonight&apos;s worth a call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Diya does */}
      <section id="how-it-helps" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>What Diya actually does</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink md:text-[2.4rem]">
            Small, steady, every day.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl border border-line p-6">
                  <div className="text-accent">
                    <Icon />
                  </div>
                  <p className="mt-4 text-[17px] font-medium text-ink">{f.title}</p>
                  <p className="mt-2 text-[16px] text-ink-muted">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>What research says — not us</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink md:text-[2.4rem]">
            Diya is new. This research isn&apos;t.
          </h2>
          <p className="mt-3 max-w-2xl text-[17px] text-ink-muted">
            Diya hasn&apos;t published outcomes yet — we just started. But the ideas it&apos;s
            built on have been studied for years.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {FINDINGS.map((f) => (
              <a
                key={f.source}
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border-t-2 border-accent bg-bg-elevated p-5"
              >
                <p className="text-[16px] text-ink">{f.quote}</p>
                <p className="mt-3 text-[14px] text-ink-muted underline underline-offset-2">
                  {f.source}
                </p>
              </a>
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-[15px] text-ink-muted">
            These are independent, published studies about family involvement, phone-based
            check-ins, and language-concordant care in general — not results from Diya.
          </p>
        </div>
      </section>

      {/* Signup */}
      <section id="signup" className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
          <Eyebrow>Get them set up</Eyebrow>
          <h2 className="mt-3 font-display text-[2rem] leading-tight text-ink md:text-[2.4rem]">
            Send them their invite
          </h2>
          <p className="mt-3 text-[17px] text-ink-muted">
            Fill this in, and you&apos;ll get a link to send them on WhatsApp.
          </p>

          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-10 text-ink-muted md:px-10">
          <DiyaMark className="h-4 w-4 text-accent" />
          <span className="text-[15px]">Diya — The Parent Companion</span>
        </div>
      </footer>
    </main>
  );
}
