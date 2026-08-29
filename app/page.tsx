"use client";

import { useMutation } from "convex/react";
import { useEffect, useRef, useState, FormEvent } from "react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const navWrapRef = useRef<HTMLDivElement>(null);
  const callTimeRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const joinEarlyAccess = useMutation(api.earlyAccess.join);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Sticky nav treatment
  useEffect(() => {
    const el = navWrapRef.current;
    if (!el) return;
    const setNav = () => el.classList.toggle("scrolled", window.scrollY > 8);
    setNav();
    window.addEventListener("scroll", setNav, { passive: true });
    return () => window.removeEventListener("scroll", setNav);
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Fake call timer — purely visual
  useEffect(() => {
    let seconds = 134;
    const id = setInterval(() => {
      seconds += 1;
      const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      if (callTimeRef.current) callTimeRef.current.textContent = `${mins}:${secs}`;
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    try {
      await joinEarlyAccess({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <header className="nav-wrap" id="navWrap" ref={navWrapRef}>
        <div className="container nav">
          <a className="brand" href="#top" aria-label="Diya home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3c2.8 3.2 4.7 5.8 4.7 8.5A4.7 4.7 0 0 1 12 16.2a4.7 4.7 0 0 1-4.7-4.7C7.3 8.8 9.2 6.2 12 3Z"
                  fill="#fff"
                />
                <path
                  d="M7 18.2c1.5 1.4 3.2 2.1 5 2.1s3.5-.7 5-2.1"
                  stroke="#fff"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>Diya — The Parent Companion</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#how">How it works</a>
            <a href="#families">For families</a>
            <a href="#demo">Demo</a>
            <a href="#safety">Safety</a>
          </nav>
          <a href="#early-access" className="nav-cta">
            Join early access
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow">
                <span className="dot"></span> Voice-first diabetes support for Indian families
              </span>
              <h1>
                Get Your Parents&apos;
                <br />
                <em className="diabetes">Diabetes</em>
                <br />
                Under Control
              </h1>
              <p>
                Diya is a warm voice companion for parents living with diabetes or
                prediabetes — helping them stay consistent with daily routines while keeping
                their son, daughter, or caregiver meaningfully in the loop.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#early-access">
                  Get early access
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="m9 18 6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a className="btn btn-ghost" href="#demo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m10 8 6 4-6 4V8Z" fill="currentColor" />
                  </svg>
                  Watch how Diya works
                </a>
              </div>
              <div className="micro">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="m8.5 12 2.2 2.2 4.8-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                No app to learn. No WhatsApp flow. Just a familiar phone call.
              </div>
            </div>

            <div className="hero-visual" aria-label="Parent and daughter using Diya">
              <div className="photo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/diya-hero.jpg" alt="Diya, wearing a name tag, smiling at the camera" />
              </div>

              <div className="distance-card">
                <strong>Built for families living apart</strong>
                <span>Because care should not depend on being in the same city.</span>
              </div>

              <div className="call-card">
                <div className="call-top">
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div className="avatar">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 3c2.8 3.2 4.7 5.8 4.7 8.5A4.7 4.7 0 0 1 12 16.2a4.7 4.7 0 0 1-4.7-4.7C7.3 8.8 9.2 6.2 12 3Z"
                          fill="#2f7d59"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="call-name">Diya calling</div>
                      <div className="call-status">
                        <span className="live-dot"></span> Voice check-in
                      </div>
                    </div>
                  </div>
                  <div className="call-time" ref={callTimeRef}>
                    02:14
                  </div>
                </div>
                <div className="wave" aria-hidden="true">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <span key={i}></span>
                  ))}
                </div>
                <p className="call-quote">&ldquo;Uncle, did you manage your evening walk today?&rdquo;</p>
                <div className="call-controls">
                  <button className="round" aria-label="Mute">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v3M9 22h6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button className="round end" aria-label="End call">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5.3 15.4c3.6-3.2 9.8-3.2 13.4 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7.4 14.4 6 18M16.6 14.4 18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button className="round" aria-label="Speaker">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 10v4h4l5 4V6l-5 4H5Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 9.3a4 4 0 0 1 0 5.4M19.5 7a7 7 0 0 1 0 10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container stats reveal" ref={addReveal}>
            <div className="stats-grid">
              <div className="stat">
                <strong>Voice-first</strong>
                <span>Designed around the phone habits parents already have.</span>
              </div>
              <div className="stat">
                <strong>Family-aware</strong>
                <span>Helps caregivers stay connected without constant calling or nagging.</span>
              </div>
              <div className="stat">
                <strong>India-focused</strong>
                <span>Built specifically for diabetes and prediabetes care journeys in India.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="families">
          <div className="container split">
            <div className="sticky-copy reveal" ref={addReveal}>
              <span className="eyebrow">
                <span className="dot"></span> The real problem
              </span>
              <h2 className="section-title">
                Care gets harder when life puts kilometres in between.
              </h2>
              <p className="section-copy">
                A parent may be in Jaipur. Their daughter may be working in Bengaluru. The
                condition still needs daily attention — but neither side wants every
                conversation to become &ldquo;Did you check your sugar?&rdquo;
              </p>
            </div>
            <div className="story-stack">
              <article className="story-card reveal" ref={addReveal}>
                <div className="story-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Daily consistency is the difficult part</h3>
                <p>
                  Meals, activity, medicines, glucose checks, sleep and follow-ups become
                  dozens of tiny decisions repeated every day.
                </p>
              </article>
              <article className="story-card reveal" ref={addReveal}>
                <div className="story-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4.5A2.5 2.5 0 0 1 4 13.5v-8Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Children want to help — without policing</h3>
                <p>
                  Caregivers often carry guilt from afar. Diya creates a gentler layer of
                  everyday support between the parent and family.
                </p>
              </article>
              <article className="story-card reveal" ref={addReveal}>
                <div className="story-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 4h8M9 2h6v4H9V2Z" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="5" y="5" width="14" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Care information is fragmented</h3>
                <p>
                  What happened today is usually buried in memory, missed calls, notebooks or
                  short messages. Diya can make routine check-ins more structured.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section how" id="how">
          <div className="container">
            <span
              className="eyebrow"
              style={{ background: "rgba(255,255,255,.07)", borderColor: "rgba(255,255,255,.14)", color: "#c9ead5" }}
            >
              <span className="dot"></span> How Diya works
            </span>
            <h2 className="section-title reveal" ref={addReveal}>
              A simple voice loop between parent, Diya and caregiver.
            </h2>
            <p className="section-copy reveal" ref={addReveal}>
              The product is deliberately boring in the best way: the parent answers the
              phone, talks naturally, and gets practical support without learning another
              app.
            </p>
            <div className="steps">
              <article className="step reveal" ref={addReveal}>
                <div className="step-num">01 — CALL</div>
                <h3>Diya checks in by voice</h3>
                <p>
                  Short, scheduled conversations can ask about routines like meals, walks,
                  medicine adherence or glucose checks.
                </p>
              </article>
              <article className="step reveal" ref={addReveal}>
                <div className="step-num">02 — UNDERSTAND</div>
                <h3>The conversation becomes useful context</h3>
                <p>
                  Instead of form-filling, Diya listens to the parent&apos;s natural response
                  and structures the important bits.
                </p>
              </article>
              <article className="step reveal" ref={addReveal}>
                <div className="step-num">03 — SUPPORT</div>
                <h3>Family stays meaningfully informed</h3>
                <p>
                  Caregivers can understand what needs attention without making every family
                  call about diabetes.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <span className="eyebrow">
              <span className="dot"></span> Designed for conversation
            </span>
            <h2 className="section-title reveal" ref={addReveal}>
              Built for parents, not tech experts
            </h2>
            <p className="section-copy reveal" ref={addReveal}>
              Diya is built around the most universal interface: talking.
            </p>

            <div className="feature-grid">
              <article className="feature-large reveal" ref={addReveal}>
                <h3>Feels more like a familiar check-in than a health form.</h3>
                <p>
                  Diya can use everyday conversational language and keep the interaction
                  focused on one small thing at a time.
                </p>
                <div className="dialogue">
                  <div className="bubble diya">Namaste Uncle. Aaj lunch ke baad aap walk par gaye the?</div>
                  <div className="bubble parent">Haan, around 20 minutes. Thoda late ho gaya tha.</div>
                  <div className="bubble diya">
                    That still counts. Kal bhi same time ke aas-paas rakhne ki koshish karenge?
                  </div>
                  <div className="bubble parent">Haan, theek hai.</div>
                </div>
              </article>

              <div className="feature-side">
                <article className="feature-small reveal" ref={addReveal}>
                  <h3>Built around family context</h3>
                  <p>
                    The caregiver may live elsewhere, but they should still be able to
                    understand how things are going.
                  </p>
                  <div className="mini-row">
                    <div className="mini-icon">
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16.5 12a3.5 3.5 0 1 0 0-7M2 21v-3a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v3M15 14h1a5 5 0 0 1 5 5v2"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <strong>Parent + caregiver</strong>
                      <span>One care journey, even across different cities.</span>
                    </div>
                  </div>
                  <div className="mini-row">
                    <div className="mini-icon">
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22s8-4.5 8-12V5l-8-3-8 3v5c0 7.5 8 12 8 12Z" stroke="currentColor" strokeWidth="1.8" />
                        <path
                          d="m9 12 2 2 4-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <strong>Support, not surveillance</strong>
                      <span>Designed to preserve dignity and autonomy.</span>
                    </div>
                  </div>
                </article>

                <article className="feature-small reveal" ref={addReveal} style={{ background: "#eef5f9" }}>
                  <h3>Made for diabetes &amp; prediabetes first</h3>
                  <p>
                    A focused product can become more useful than a generic &ldquo;AI health
                    assistant&rdquo; because the routines, language and caregiver concerns are
                    clearer.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container family-panel reveal" ref={addReveal}>
            <div className="family-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/family-care.jpg"
                alt="A daughter and her father smiling together while looking at a phone"
              />
            </div>
            <div className="family-copy">
              <span className="eyebrow" style={{ width: "max-content" }}>
                <span className="dot"></span> For sons &amp; daughters
              </span>
              <h2>Be present without needing to be physically present.</h2>
              <p>
                Diya is for the family member who cares deeply but cannot always be there
                because of work, studies, marriage, travel or simply living in another city.
              </p>
              <div className="check-list">
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Reduce repetitive &ldquo;Did you do this?&rdquo; conversations.</span>
                </div>
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Spot patterns that may deserve a real family conversation.</span>
                </div>
                <div className="check">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Let family calls feel like family calls again.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="demo">
          <div className="container demo-grid">
            <div className="reveal" ref={addReveal}>
              <span className="eyebrow">
                <span className="dot"></span> Product reference
              </span>
              <h2 className="section-title">See how the product helps manage diabetes</h2>
              <p className="section-copy">
                A short look at how Diya sounds and feels in an actual conversation.
              </p>
            </div>
            <div className="reveal" ref={addReveal}>
              <div className="demo-video">
                <video controls preload="metadata" playsInline>
                  <source src="/diya-reference.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="demo-note">Reference video provided for the current prototype landing page.</div>
            </div>
          </div>
        </section>

        <section className="section" id="safety">
          <div className="container">
            <span className="eyebrow">
              <span className="dot"></span> Trust has to be designed in
            </span>
            <h2 className="section-title reveal" ref={addReveal}>
              Supporting your parents between doctor visits
            </h2>
            <p className="section-copy reveal" ref={addReveal}>
              For a health product, the landing page should be explicit about boundaries.
              Diya can support routines and conversations; it should not pretend to
              diagnose, prescribe or replace qualified medical care.
            </p>
            <div className="safety-grid">
              <article className="safety-card reveal" ref={addReveal}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4.5 8-12V5l-8-3-8 3v5c0 7.5 8 12 8 12Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <h3>Clear medical boundaries</h3>
                <p>
                  No diagnosis, prescription changes or emergency decision-making presented
                  as professional medical advice.
                </p>
              </article>
              <article className="safety-card reveal" ref={addReveal}>
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <h3>Privacy by design</h3>
                <p>
                  Health conversations are sensitive. Consent, access and data retention
                  should be understandable to both parent and caregiver.
                </p>
              </article>
              <article className="safety-card reveal" ref={addReveal}>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <h3>Escalate when appropriate</h3>
                <p>
                  Potentially concerning responses should direct people toward their
                  caregiver, clinician or emergency services rather than overconfident AI
                  guidance.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="early-access">
          <div className="container">
            <div className="cta-panel reveal" ref={addReveal}>
              <h2>Help us build Diya for your family.</h2>
              <p>
                We&apos;re shaping the first version for Indian families supporting a parent
                with diabetes or prediabetes. Join the early-access list to hear when pilot
                conversations open.
              </p>
              {status === "success" ? (
                <div className="success-state">
                  <div className="success-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path
                        d="m5 12.5 4.5 4.5L19 7.5"
                        stroke="#fff"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="success-title">You&apos;re on the list!</p>
                  <p className="success-sub">
                    We&apos;ll reach out on WhatsApp or email when pilot conversations open.
                  </p>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      aria-label="Your name"
                      disabled={status === "submitting"}
                    />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Mobile number"
                      required
                      aria-label="Mobile number"
                      disabled={status === "submitting"}
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    autoComplete="email"
                    required
                    aria-label="Email address"
                    disabled={status === "submitting"}
                  />
                  <button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Joining…" : "Join early access"}
                  </button>
                  {status === "error" && (
                    <div className="error-msg" style={{ display: "block" }}>
                      That didn&apos;t go through. Try again.
                    </div>
                  )}
                  <div className="legal">Early-access signups are stored in Diya&apos;s waitlist.</div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-row">
          <div>
            <strong style={{ color: "var(--ink)" }}>Diya — The Parent Companion</strong>
            <br />
            Voice-first support for families managing diabetes &amp; prediabetes in India.
          </div>
          <div className="footer-links">
            <a href="#safety">Safety</a>
            <a href="#demo">Demo</a>
            <a href="#early-access">Early access</a>
          </div>
          <div>© {new Date().getFullYear()} Diya</div>
        </div>
      </footer>
    </>
  );
}
