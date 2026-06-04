import { useState, useEffect, useRef, type ReactNode } from "react";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [attend, setAttend] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = () => {
    if (!name.trim() || !attend) return;
    setSubmitted(true);
  };

  return (
    <div className="relative w-full font-serif bg-background">
      {/* GRAIN OVERLAY */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-9999 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* HERO */}
      <header className="relative min-h-dvh">
        <div className="absolute inset-6 border border-line/15 flex flex-col items-center justify-center gap-8 sm:gap-10 px-6">
          <Reveal delay={100}>
            <span className="uppercase font-sans text-[0.72rem] font-medium tracking-[0.25rem] text-clay text-center">
              Better together
            </span>
          </Reveal>

          <Reveal delay={300}>
            <main className="text-[clamp(3rem,13vw,8rem)] font-light leading-[0.9] text-center tracking-[-0.01em]">
              <h5>Rica</h5>
              <h5 className="italic text-clay text-[clamp(2rem,7vw,4.5rem)]">
                &
              </h5>
              <h5>Eric</h5>
            </main>
          </Reveal>

          <Reveal delay={500}>
            <div className="font-sans text-ink-soft flex flex-wrap justify-center items-center gap-3 sm:gap-6 tracking-[0.12rem] sm:tracking-[0.22rem] text-[0.78rem] sm:text-[0.85rem] uppercase font-light text-center">
              <span>10 . 10 . 2026</span>
              <div className="size-1.25 rounded-full bg-clay" />
              <span>SG Farm</span>
            </div>
          </Reveal>
        </div>
      </header>

      {/* OUR STORY */}
      <section className="min-h-dvh grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-[clamp(40px,7vw,90px)] items-center max-w-280 mx-auto px-6 sm:px-10 md:px-8 py-20 md:py-0">
        <Reveal>
          <div className="aspect-4/5 bg-bg-card bg-linear-to-br from-clay/12 to-ink/5 border border-line/15 flex items-center justify-center">
            <p className="uppercase font-sans text-xs tracking-widest text-ink-soft">
              Our Photo Here
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="text-[0.72rem] tracking-[0.32rem] font-medium text-clay uppercase font-sans">
            Our Story
          </span>
          <h2 className="font-serif font-light text-[clamp(2.2rem,5.5vw,3.8rem)] mt-4.5 leading-[1.05] tracking-[-0.01em]">
            Applicant meets interviewer. The rest is paperwork.
          </h2>
          <p className="mt-5.5 text-ink-soft text-[clamp(1rem,2.5vw,1.05rem)] max-w-[44ch] font-light font-sans">
            Passed the initial screening and never left, and somehow that became
            the final outcome.
          </p>
          <p className="mt-5.5 text-ink-soft text-[clamp(1rem,2.5vw,1.05rem)] max-w-[44ch] font-light font-sans">
            We would be honoured to have you with us as we say "I do" —
            surrounded by the people who shaped the story along the way.
          </p>
          <div className="mt-7.5 italic text-[1.5rem] text-ink">
            — Rica & Eric
          </div>
        </Reveal>
      </section>

      {/* RSVP CTA */}
      <section className="min-h-dvh bg-ink text-background flex flex-col items-center justify-center text-center px-6">
        <Reveal delay={100}>
          <span className="uppercase font-sans text-[0.72rem] font-medium tracking-[0.32rem] text-clay-soft">
            Will you join us?
          </span>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="font-serif font-light text-[clamp(2.2rem,8vw,3.8rem)] mt-4.5 tracking-[-0.01em]">
            RSVP
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-4.5 font-sans font-light text-background/60 max-w-[46ch] text-[clamp(0.95rem,2.5vw,1.05rem)]">
            Kindly respond by the 1st of September, 2026 so we can save you a
            seat.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <button
            onClick={() => setOpen(true)}
            className="mt-11 bg-clay hover:bg-clay-soft hover:-translate-y-0.5 transition text-white font-sans text-[0.78rem] tracking-[0.22rem] uppercase font-medium px-10 py-4 cursor-pointer"
          >
            Reply to our invitation
          </button>
        </Reveal>
      </section>

      {/* RSVP MODAL */}
      <div
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-ink/55 backdrop-blur-sm transition-[opacity,visibility] duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`relative w-full max-w-140 max-h-[90vh] overflow-y-auto bg-ink text-background border border-background/15 p-[clamp(34px,5vw,56px)] transition-transform duration-300 ${
            open ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 text-2xl leading-none text-background/60 hover:text-clay-soft transition cursor-pointer"
          >
            &times;
          </button>

          <span className="uppercase font-sans text-[0.72rem] font-medium tracking-[0.32rem] text-clay-soft">
            Will you join us?
          </span>
          <h3 className="font-serif font-light text-[clamp(1.8rem,5vw,2.6rem)] mt-3.5 leading-[1.05]">
            RSVP
          </h3>

          {!submitted ? (
            <div className="mt-8 font-sans">
              <div className="mb-6">
                <label className="block text-[0.7rem] tracking-[0.2rem] uppercase text-background/55 mb-2.5">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-background/25 focus:border-clay-soft outline-none py-2.5 text-[1.05rem] placeholder:text-background/30 transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[0.7rem] tracking-[0.2rem] uppercase text-background/55 mb-2.5">
                  Will you attend?
                </label>
                <select
                  value={attend}
                  onChange={(e) => setAttend(e.target.value)}
                  className="w-full bg-transparent border-b border-background/25 focus:border-clay-soft outline-none py-2.5 text-[1.05rem] cursor-pointer transition-colors"
                >
                  <option value="" className="bg-ink">
                    Choose…
                  </option>
                  <option className="bg-ink">Joyfully accepts</option>
                  <option className="bg-ink">Regretfully declines</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-3.5 bg-clay hover:bg-clay-soft hover:-translate-y-0.5 transition text-white text-[0.78rem] tracking-[0.22rem] uppercase font-medium px-10 py-4 cursor-pointer"
              >
                Send Response
              </button>
            </div>
          ) : (
            <div className="mt-10 border border-background/25 p-8 text-center">
              <div className="font-serif italic text-[1.8rem] text-clay-soft">
                Thank you!
              </div>
              <p className="mt-2.5 font-sans text-background/70">
                Your response has been noted. We can't wait to celebrate with
                you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
