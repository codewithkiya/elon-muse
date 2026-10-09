import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Briefcase, ArrowUpRight } from "lucide-react";
import { socials } from "@/data/profile";

declare global {
  interface Window {
    Cal?: (action: string, options?: Record<string, unknown>) => void;
  }
}

const CAL_LINK = "endegena-abebe-caigil";
const CAL_PAGE = `https://cal.com/${CAL_LINK}`;

export function BookCall() {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "cal-embed-script";
    const init = () => {
      window.Cal?.("inline", {
        elementOrSelector: embedRef.current,
        calLink: CAL_LINK,
        layout: "month_view",
      });
      window.Cal?.("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };
    if (document.getElementById(scriptId)) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, []);

  return (
    <section id="book" className="px-5 py-16 md:px-10"><div className="mx-auto max-w-6xl">
      <p className="font-display text-xs uppercase text-muted-foreground">06 / Book a call</p>
      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.95]">30 minutes.<br />Real answers.</h2>
          <p className="mt-6 max-w-md text-muted-foreground">Pick any available time that suits you — the calendar shows my live availability. You'll get an instant confirmation email with a meeting link.</p>
          <a href={CAL_PAGE} target="_blank" rel="noreferrer" className="group mt-10 brutal-card brutal-lift flex max-w-md items-center justify-between p-5">
            <span className="flex items-center gap-3"><CalendarDays className="h-5 w-5" /><span><span className="block font-semibold">Open full calendar</span><span className="text-sm text-muted-foreground">cal.com/{CAL_LINK}</span></span></span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="group mt-4 brutal-card brutal-lift flex max-w-md items-center justify-between p-5">
            <span className="flex items-center gap-3"><Briefcase className="h-5 w-5" /><span><span className="block font-semibold">Connect on LinkedIn</span><span className="text-sm text-muted-foreground">Posts on building, AI and SaaS in Ethiopia</span></span></span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="brutal-card overflow-hidden p-2 md:p-4">
          <div ref={embedRef} style={{ width: "100%", height: "100%", minHeight: 560, overflow: "auto" }} aria-label="Booking calendar" />
        </motion.div>
      </div>
    </div></section>
  );
}
