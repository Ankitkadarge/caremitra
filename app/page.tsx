import Image from "next/image";
import SignupForm from "./components/SignupForm";

function Waveform() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <rect x="0" y="5" width="2" height="4" rx="1" fill="currentColor" />
      <rect x="4" y="2" width="2" height="10" rx="1" fill="currentColor" />
      <rect x="8" y="0" width="2" height="14" rx="1" fill="currentColor" />
      <rect x="12" y="3" width="2" height="8" rx="1" fill="currentColor" />
      <rect x="16" y="5" width="2" height="4" rx="1" fill="currentColor" />
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

const STEPS = [
  {
    number: "01",
    title: "You send one link",
    yourSide: "Share their invite link on WhatsApp. Takes a minute, only once.",
    theirSide: "They get a message asking them to just talk — like a call from a person.",
  },
  {
    number: "02",
    title: "They talk, you don't have to be there",
    yourSide: "Nothing to schedule. Nothing to remind them about.",
    theirSide:
      "Once a day, by voice, in whatever language they're comfortable in — about their sugar, their meals, how they're really doing.",
  },
  {
    number: "03",
    title: "You get the short version",
    yourSide: "A short update reaches you the same day — what they said, what's changed, what's worth a call.",
    theirSide: "That's it, until tomorrow's check-in.",
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
    <main className="mx-auto max-w-[560px] px-6">
      {/* Hero */}
      <section className="flex flex-col items-start gap-5 pt-10 pb-14">
        <div className="w-full bg-bg">
          <Image
            src="/hero.png"
            alt="A daughter and her father smiling together while looking at a phone"
            width={1200}
            height={800}
            priority
            className="h-[120px] w-auto object-contain sm:h-[150px]"
          />
        </div>
        <Eyebrow>For families managing a parent&apos;s diabetes from another city</Eyebrow>
        <h1 className="font-display text-[2.1rem] font-semibold leading-[1.15] text-ink sm:text-[2.5rem]">
          They tell you they&apos;re fine. You already know that&apos;s not the whole story.
        </h1>
        <p className="text-[17px] text-ink-muted">
          Your parent talks to CareMitra every day, by voice, in their own language — and you
          get a short update, without having to call and ask.
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
          <a
            href="#signup"
            className="flex h-14 w-full items-center justify-center rounded-full bg-accent px-6 text-[17px] font-medium text-white sm:w-auto"
          >
            Get them set up
          </a>
          <a
            href="#how-it-works"
            className="flex h-14 w-full items-center justify-center rounded-full border border-line px-6 text-[17px] font-medium text-ink sm:w-auto"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* Chat stack */}
      <section className="border-t border-line py-14">
        <Eyebrow>What it sounds like</Eyebrow>
        <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-tight text-ink">
          They don&apos;t type. They just talk.
        </h2>
        <div className="mt-3 flex items-center gap-2 text-[15px] text-ink-muted">
          <Waveform />
          <span>Spoken in their own language — this is the English of it.</span>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-bubble px-4 py-3 text-[17px] text-ink">
            My sugar is high even though I take medicines
          </div>
          <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-bubble px-4 py-3 text-[17px] text-ink">
            I walk every day, why is my HbA1c still high?
          </div>
          <div className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-4 py-3 text-[17px] text-white">
            Let&apos;s figure out what&apos;s keeping your sugar high
          </div>
        </div>

        <p className="mt-5 text-[15px] text-ink-muted">
          This is the kind of conversation CareMitra has with them — patient, in the language
          they&apos;re comfortable in, every day.
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-line py-14">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-tight text-ink">
          Two sides, one call a day
        </h2>

        <div className="mt-6 flex flex-col gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="flex gap-4">
              <span className="font-display text-2xl font-semibold text-accent">
                {step.number}
              </span>
              <div className="flex flex-1 flex-col gap-3">
                <p className="text-[17px] font-medium text-ink">{step.title}</p>
                <div className="flex flex-col gap-2 rounded-xl border border-line bg-white/50 p-4">
                  <p className="text-[15px] font-medium text-ink-muted">Their side</p>
                  <p className="text-[17px] text-ink">{step.theirSide}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl border border-line bg-accent-tint p-4">
                  <p className="text-[15px] font-medium text-ink-muted">Your side</p>
                  <p className="text-[17px] text-ink">{step.yourSide}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="border-t border-line py-14">
        <Eyebrow>What research says — not us</Eyebrow>
        <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-tight text-ink">
          We&apos;re new. This research isn&apos;t.
        </h2>
        <p className="mt-3 text-[17px] text-ink-muted">
          CareMitra hasn&apos;t published outcomes yet — we just started. But the ideas it&apos;s
          built on have been studied for years.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {FINDINGS.map((f) => (
            <a
              key={f.source}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-line p-4"
            >
              <p className="text-[17px] text-ink">{f.quote}</p>
              <p className="mt-2 text-[15px] text-ink-muted underline underline-offset-2">
                {f.source}
              </p>
            </a>
          ))}
        </div>

        <p className="mt-5 text-[15px] text-ink-muted">
          These are independent, published studies about family involvement, phone-based
          check-ins, and language-concordant care in general — not results from CareMitra.
        </p>
      </section>

      {/* Signup */}
      <section id="signup" className="border-t border-line py-14">
        <Eyebrow>Get them set up</Eyebrow>
        <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-tight text-ink">
          Send them their invite
        </h2>
        <p className="mt-3 text-[17px] text-ink-muted">
          Fill this in, and you&apos;ll get a link to send them on WhatsApp.
        </p>

        <div className="mt-6">
          <SignupForm />
        </div>
      </section>

      <footer className="border-t border-line py-10 text-[15px] text-ink-muted">
        CareMitra
      </footer>
    </main>
  );
}
