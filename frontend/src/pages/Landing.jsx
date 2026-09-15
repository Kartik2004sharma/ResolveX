import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight,
  Zap,
  ClipboardList,
  GitBranch,
  CheckCircle2,
  Bell,
  BarChart3,
  Shield,
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Features',    href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
];

const STATS = [
  { value: '< 2 min',  label: 'Avg. assignment time' },
  { value: '11',       label: 'Complaint categories' },
  { value: '98%',      label: 'SLA compliance rate' },
  { value: '24 / 7',   label: 'Monitoring & escalation' },
];

const FEATURES = [
  {
    step: '01',
    title: 'Submit a Complaint',
    desc: 'Students report issues through a clean web form — attach photos, specify the exact location, and describe the problem. No email chains, no confusion.',
    color: 'light',
    icon: <ClipboardList className="w-8 h-8" />,
  },
  {
    step: '02',
    title: 'AI Auto-Classifies',
    desc: 'Our NLP engine reads the title and description, detects urgency and category automatically (electrical, plumbing, IT, security…) and suggests priority.',
    color: 'green',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    step: '03',
    title: 'Smart Assignment',
    desc: 'The system matches the complaint to the right department and the least-loaded staff member — no manual dispatching, no bottlenecks.',
    color: 'dark',
    icon: <GitBranch className="w-8 h-8" />,
  },
  {
    step: '04',
    title: 'Resolved & Notified',
    desc: 'Staff update the status. Students get instant email and push notifications. Admins see real-time analytics. Everyone knows what happened and when.',
    color: 'light',
    icon: <CheckCircle2 className="w-8 h-8" />,
  },
];

const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Register & Log In',
    desc: 'Students and staff sign up with their campus email. Roles (student, staff, admin) are assigned automatically — no approval queues.',
  },
  {
    num: '02',
    title: 'Submit, Track & Escalate',
    desc: 'Students submit issues in under 60 seconds. If a ticket stays unresolved past its SLA deadline, the system auto-escalates and alerts admins.',
  },
  {
    num: '03',
    title: 'Analyse & Improve',
    desc: "Admins access live dashboards — category trends, peak submission hours, department performance. Catch recurring issues before they become crises.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Before CampusConnect, we'd get 40 emails a day about the same broken lights. Now it's one ticket, auto-assigned, resolved in hours.",
    author: 'Maintenance Head',
    dept: 'Electrical Dept.',
  },
  {
    quote: "I submitted a complaint at 9 AM and got a notification at 11 AM that it was fixed. That's never happened before on campus.",
    author: 'Priya S.',
    dept: 'B.Tech, 3rd Year',
  },
  {
    quote: 'The analytics dashboard showed us that 60% of IT complaints come in on Monday mornings. We now staff up proactively.',
    author: 'IT Manager',
    dept: 'IT Support Dept.',
  },
];

const FOOTER_LINKS = {
  Product: ['Features', 'How it Works', 'Analytics', 'Security'],
  Support: ['Documentation', 'Admin Guide', 'API Reference', 'Status'],
  Company: ['About', 'Contact', 'Privacy Policy', 'Terms'],
};

// ──────────────────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────────────────
function FeatureCard({ step, title, desc, color, icon }) {
  const styles = {
    light: { card: 'brand-card-light', text: 'text-brand-dark', sub: 'text-brand-dark/70', step: 'text-brand-dark/30', icon: 'text-brand-dark' },
    green: { card: 'brand-card-green', text: 'text-brand-dark', sub: 'text-brand-dark/70', step: 'text-brand-dark/30', icon: 'text-brand-dark' },
    dark:  { card: 'brand-card-dark',  text: 'text-white',      sub: 'text-white/70',      step: 'text-white/20',      icon: 'text-brand-green' },
  }[color];

  return (
    <div className={`${styles.card} p-8 flex flex-col gap-5 relative overflow-hidden`}>
      <div className={`${styles.step} font-display font-bold text-6xl absolute top-4 right-6 leading-none select-none`}>
        {step}
      </div>
      <div className={styles.icon}>{icon}</div>
      <h3 className={`font-display font-semibold text-xl ${styles.text}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${styles.sub}`}>{desc}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, dept }) {
  return (
    <div className="brand-card-light p-7 flex flex-col gap-5">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-brand-green fill-brand-green" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
      <p className="text-brand-dark/80 text-sm leading-relaxed italic">"{quote}"</p>
      <div className="mt-auto">
        <p className="font-semibold text-brand-dark text-sm">{author}</p>
        <p className="text-brand-dark/50 text-xs mt-0.5">{dept}</p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────────────────────
export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white font-display">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-brand-dark/10">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-dark flex items-center justify-center">
              <Shield className="w-4 h-4 text-brand-green" />
            </div>
            <span className="font-bold text-brand-dark text-lg">ResolveX</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-brand-dark/60 hover:text-brand-dark transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {user ? (
              <Link to={user.role === 'student' ? '/dashboard' : user.role === 'staff' ? '/staff' : '/admin'}
                className="brand-btn-dark text-xs px-4 py-2">
                Open Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm text-brand-dark/60 hover:text-brand-dark transition-colors">
                  Sign in
                </Link>
                <Link to="/register" className="brand-btn-dark text-xs">
                  Get started →
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-5 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Label */}
            <span className="brand-label mb-6 inline-flex">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Campus Management
            </span>

            {/* Headline */}
            <h1 className="font-display font-bold text-5xl lg:text-6xl text-brand-dark leading-tight mb-6">
              Campus issues,{' '}
              <span className="brand-highlight">resolved</span>{' '}
              before they escalate.
            </h1>

            <p className="text-brand-dark/60 text-lg leading-relaxed mb-8">
              ResolveX digitises your campus complaint pipeline — from submission to resolution.
              NLP classification, smart staff assignment, SLA enforcement, and real-time analytics, out of the box.
            </p>

            {!user && (
              <div className="flex items-center gap-4 flex-wrap">
                <Link to="/register" className="brand-btn-dark">
                  Start for free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="brand-btn-outline">
                  Sign in
                </Link>
              </div>
            )}
          </div>

          {/* Hero visual — complaint card mockup */}
          <div className="hidden lg:block">
            <div className="brand-card-light p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-brand-dark/40">#RX-A3F2-9K1M</span>
                <span className="brand-label text-xs py-0.5">IN PROGRESS</span>
              </div>
              <h4 className="font-semibold text-brand-dark">Lights not working — Block A, 2nd Floor</h4>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-white border border-brand-dark/10 text-brand-dark/60 px-2 py-1 rounded-full">ELECTRICAL</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full border border-red-200">HIGH</span>
              </div>
              <div className="h-px bg-brand-dark/10"/>
              <div className="flex items-center gap-2 text-xs text-brand-dark/50">
                <div className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center text-brand-dark font-bold text-xs">K</div>
                Assigned to Kritika · SLA: 4h remaining
              </div>
              <div className="space-y-2">
                {['PENDING', 'IN_PROGRESS'].map((s, i) => (
                  <div key={s} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-yellow-400' : 'bg-brand-green'}`} />
                    <span className="text-brand-dark/60">{s.replace('_', ' ')}</span>
                    <span className="ml-auto text-brand-dark/30">{i === 0 ? '9:00 AM' : '9:12 AM'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border border-brand-dark rounded-brand overflow-hidden">
          {STATS.map((s, i) => (
            <div key={s.label} className={`px-6 py-5 ${i < STATS.length - 1 ? 'border-r border-brand-dark' : ''}`}>
              <p className="font-display font-bold text-2xl text-brand-dark">{s.value}</p>
              <p className="text-sm text-brand-dark/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES (Submit → Classify → Assign → Resolve) ── */}
      <section id="features" className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="brand-label mb-3 inline-flex">Features</span>
            <h2 className="font-display font-bold text-4xl text-brand-dark leading-tight">
              Four steps.<br />Zero missed tickets.
            </h2>
          </div>
          <p className="text-brand-dark/50 text-sm max-w-xs leading-relaxed sm:text-right">
            Every complaint moves through a structured pipeline — automated at every stage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.step} {...f} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-brand-dark py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="brand-label mb-3 inline-flex">How It Works</span>
              <h2 className="font-display font-bold text-4xl text-white leading-tight">
                Up and running<br />in 3 steps.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-brand-green/30 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-brand bg-brand-green flex items-center justify-center font-display font-bold text-lg text-brand-dark mb-5">
                    {step.num}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise features row */}
          <div className="mt-16 grid sm:grid-cols-3 gap-5">
            {[
              { icon: <Bell className="w-5 h-5" />, title: 'Real-time Notifications', desc: 'Firebase Firestore push + email via Nodemailer — students always know their status.' },
              { icon: <BarChart3 className="w-5 h-5" />, title: 'Admin Analytics', desc: 'Trend charts, peak-hour graphs, department performance tables. All built-in.' },
              { icon: <Shield className="w-5 h-5" />, title: 'Enterprise Security', desc: 'Helmet.js headers, rate limiting, bcrypt hashing, JWT expiry, input sanitization.' },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 p-5 rounded-brand border border-white/10 bg-white/5">
                <div className="text-brand-green flex-shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{f.title}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="max-w-6xl mx-auto px-5 py-20">
        <div className="mb-10">
          <span className="brand-label mb-3 inline-flex">Testimonials</span>
          <h2 className="font-display font-bold text-4xl text-brand-dark">
            What the campus says.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.author} {...t} />)}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="brand-card-dark px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-bold text-3xl text-white mb-2">
              Ready to fix campus maintenance?
            </h2>
            <p className="text-white/50 text-sm">No setup fee. No per-user cost. Just working software.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            {user ? (
              <Link to={user.role === 'student' ? '/dashboard' : user.role === 'staff' ? '/staff' : '/admin'} className="brand-btn-green">
                Open Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/register" className="brand-btn-green">Get started free →</Link>
                <Link to="/login" className="brand-btn-outline !border-white/30 !text-white hover:!bg-white/10">Sign in</Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-brand-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-brand-green flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-brand-dark" />
                </div>
                <span className="font-bold text-white">ResolveX</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-5">
                Campus complaint management — automated, transparent, and fast.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
              <div key={cat}>
                <p className="text-white font-semibold text-sm mb-4">{cat}</p>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-white/40 text-xs hover:text-white transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">© {new Date().getFullYear()} ResolveX. All rights reserved.</p>
            <p className="text-white/20 text-xs">Built with Node.js · MongoDB · React · Firebase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
