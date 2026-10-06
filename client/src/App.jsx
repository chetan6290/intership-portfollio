import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Send } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const GITHUB = 'https://github.com/chetan6290';

// Shown if the API is unreachable, so the site never looks empty.
const FALLBACK = [
  { id: 1, title: 'JobVista using AI', github_url: GITHUB },
  { id: 2, title: 'Emotion Analytics', github_url: GITHUB },
  { id: 3, title: 'Online Payment Fraud Detection', github_url: GITHUB },
];
const SKILLS = ['Java', 'Spring Boot', 'Angular', 'Node.js', 'Express', 'MySQL', 'Docker'];

const Section = ({ id, title, children }) => (
  <section id={id} className="mx-auto max-w-5xl px-6 py-20">
    <h2 className="font-display text-3xl font-semibold mb-8">{title}</h2>
    {children}
  </section>
);

function Projects() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    fetch(`${API}/api/projects`).then(r => (r.ok ? r.json() : Promise.reject()))
      .then(setItems).catch(() => setItems(FALLBACK));
  }, []);
  if (!items) return <p className="text-mute">Loading projects…</p>;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(p => (
        <article key={p.id} className="py-6 grid gap-2 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-xl font-medium">{p.title}</h3>
            {p.description && <p className="text-mute mt-1 max-w-xl">{p.description}</p>}
            {p.tech && <p className="text-sm text-accent mt-2">{p.tech}</p>}
          </div>
          <div className="flex gap-4 text-mute">
            {p.github_url && <a aria-label="Source code" href={p.github_url} className="hover:text-accent"><Github /></a>}
            {p.live_url && <a aria-label="Live demo" href={p.live_url} className="hover:text-accent"><ExternalLink /></a>}
          </div>
        </article>
      ))}
    </div>
  );
}

function Contact() {
  const [f, setF] = useState({ name: '', email: '', body: '' });
  const [state, setState] = useState({ s: 'idle', msg: '' });
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const send = async () => {
    setState({ s: 'sending', msg: '' });
    try {
      const r = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setF({ name: '', email: '', body: '' });
      setState({ s: 'ok', msg: 'Message sent.' });
    } catch (e) { setState({ s: 'err', msg: e.message || 'Message not sent. Try again.' }); }
  };
  const input = 'w-full rounded-md bg-panel border border-line px-4 py-3 focus:border-accent outline-none';
  return (
    <div className="grid gap-4 max-w-xl">
      <input className={input} placeholder="Your name" value={f.name} onChange={set('name')} />
      <input className={input} placeholder="Your email" type="email" value={f.email} onChange={set('email')} />
      <textarea className={input} rows={5} placeholder="Message" value={f.body} onChange={set('body')} />
      <button onClick={send} disabled={state.s === 'sending'}
        className="inline-flex items-center gap-2 self-start rounded-md bg-accent text-bg font-semibold px-5 py-3 disabled:opacity-60">
        <Send size={18} /> {state.s === 'sending' ? 'Sending' : 'Send message'}
      </button>
      {state.msg && <p role="status" className={state.s === 'ok' ? 'text-accent' : 'text-red-400'}>{state.msg}</p>}
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="sticky top-0 z-10 backdrop-blur bg-bg/80 border-b border-line">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <a href="#top" className="font-display font-semibold">Chetan Gaikwad</a>
          <div className="flex gap-6 text-sm text-mute">
            {['skills', 'projects', 'education', 'contact'].map(s => <a key={s} href={`#${s}`} className="hover:text-ink capitalize">{s}</a>)}
          </div>
        </div>
      </nav>

      <header id="top" className="mx-auto max-w-5xl px-6 pt-28 pb-16">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-display text-5xl md:text-7xl font-bold leading-tight max-w-3xl">
          I build full stack web apps with Java, Node.js and Angular.
        </motion.h1>
        <p className="text-mute text-lg mt-6 max-w-xl">Full stack developer from Solapur, Maharashtra. B.Tech graduate, now starting an M.E. at Savitribai Phule Pune University.</p>
        <div className="flex gap-4 mt-8">
          <a href="#projects" className="rounded-md bg-accent text-bg font-semibold px-5 py-3">See projects</a>
          <a href="/Full_Stack.pdf" className="rounded-md border border-line px-5 py-3 hover:border-accent">Download resume</a>
        </div>
      </header>

      <Section id="skills" title="Skills">
        <ul className="flex flex-wrap gap-3">
          {SKILLS.map(s => <li key={s} className="rounded-full border border-line bg-panel px-4 py-2">{s}</li>)}
        </ul>
      </Section>

      <Section id="projects" title="Projects"><Projects /></Section>

      <Section id="education" title="Education">
        <ul className="space-y-4">
          <li><p className="font-medium">Master of Engineering, Savitribai Phule Pune University</p><p className="text-mute">Starting September 2026</p></li>
          <li><p className="font-medium">B.Tech, DBATU Lonere University</p><p className="text-mute">Aug 2023 – Jun 2026 · SGPA 10.00</p></li>
        </ul>
      </Section>

      <Section id="contact" title="Contact"><Contact /></Section>

      <footer className="border-t border-line py-8 text-center text-mute text-sm">
        <a href={GITHUB} className="inline-flex items-center gap-2 hover:text-accent"><Github size={16} /> chetan6290</a>
      </footer>
    </>
  );
}
