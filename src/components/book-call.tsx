import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Linkedin, ArrowUpRight } from "lucide-react";
import { socials } from "@/data/profile";

const slots = ["09:00", "11:00", "14:00", "16:00", "18:00"];
const topics = ["New project", "SaaS / web app", "Consulting", "Hiring / role", "Just say hi"];

export function BookCall() {
  const days = useMemo(() => {
    const out: Date[] = [];
    const d = new Date();
    while (out.length < 7) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) out.push(new Date(d));
    }
    return out;
  }, []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(slots[1]);
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const valid = name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(email);

  const book = () => {
    if (!valid) return;
    const date = days[day].toDateString();
    const subject = encodeURIComponent(`Call request: ${topic} — ${date} ${slot} (EAT)`);
    const body = encodeURIComponent(`Hi Kiya,\n\nI'd like to book a 30-minute call.\n\nDate: ${date}\nTime: ${slot} (East Africa Time)\nTopic: ${topic}\nName: ${name}\nEmail: ${email}\n`);
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`;
  };

  const chip = (active: boolean) =>
    `border px-3 py-2 font-display text-xs uppercase transition-colors ${active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`;

  return (
    <section id="book" className="border-t border-border px-5 py-24 md:px-10">
      <p className="font-display text-xs uppercase text-muted-foreground">06 / Book a call</p>
      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.9]">30 minutes.<br />Real answers.</h2>
          <p className="mt-6 max-w-md text-muted-foreground">Pick a day and time that suits you. I'll confirm by email with a meeting link — usually within a few hours.</p>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="group mt-10 flex max-w-md items-center justify-between border border-border p-5 transition-colors hover:border-foreground">
            <span className="flex items-center gap-3"><Linkedin className="h-5 w-5" /><span><span className="block font-semibold">Connect on LinkedIn</span><span className="text-sm text-muted-foreground">Posts on building, AI and SaaS in Ethiopia</span></span></span>
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="border border-border p-6 md:p-8">
          <p className="flex items-center gap-2 font-display text-xs uppercase text-muted-foreground"><CalendarDays className="h-4 w-4" /> Choose a day</p>
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {days.map((d, i) => (
              <button key={i} type="button" onClick={() => setDay(i)} className={chip(i === day)}>
                <span className="block">{d.toLocaleDateString("en", { weekday: "short" })}</span>
                <span className="block text-base font-bold">{d.getDate()}</span>
              </button>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 font-display text-xs uppercase text-muted-foreground"><Clock className="h-4 w-4" /> Time (East Africa Time)</p>
          <div className="mt-4 flex flex-wrap gap-2">{slots.map((s) => <button key={s} type="button" onClick={() => setSlot(s)} className={chip(s === slot)}>{s}</button>)}</div>
          <p className="mt-8 font-display text-xs uppercase text-muted-foreground">Topic</p>
          <div className="mt-4 flex flex-wrap gap-2">{topics.map((t) => <button key={t} type="button" onClick={() => setTopic(t)} className={chip(t === topic)}>{t}</button>)}</div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="Your name" aria-label="Your name" className="border border-border bg-transparent px-4 py-3 outline-none focus:border-foreground" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} type="email" placeholder="you@email.com" aria-label="Your email" className="border border-border bg-transparent px-4 py-3 outline-none focus:border-foreground" />
          </div>
          <button type="button" disabled={!valid} onClick={book} className="mt-6 w-full bg-foreground py-4 font-display text-sm font-bold uppercase text-background transition-opacity disabled:opacity-40">
            Book {days[day].toLocaleDateString("en", { weekday: "short", day: "numeric", month: "short" })} · {slot}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
