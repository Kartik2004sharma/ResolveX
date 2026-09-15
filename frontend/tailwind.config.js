export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Positivus brand tokens (from node 25-145) ──────────────────
        brand: {
          green:     '#B9FF66',   // acid-green accent
          dark:      '#191A23',   // page dark background
          'dark-alt':'#292A32',   // secondary dark surface
          light:     '#F3F3F3',   // light card surface
          'card-green':'#B9FF66',
          'card-dark': '#191A23',
          'card-light':'#F3F3F3',
        },
        // ── Primary — indigo (app shell) ───────────────────────────────
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        // ── Surface — dark neutral (app shell) ─────────────────────────
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // ── shadcn/ui semantic tokens ───────────────────────────────────
        background:    'hsl(var(--background))',
        foreground:    'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border:  'hsl(var(--border))',
        input:   'hsl(var(--input))',
        ring:    'hsl(var(--ring))',
        // ── Status colors ──────────────────────────────────────────────
        success: { light: '#dcfce7', DEFAULT: '#16a34a', dark: '#15803d' },
        warning: { light: '#fef9c3', DEFAULT: '#ca8a04', dark: '#a16207' },
        danger:  { light: '#fee2e2', DEFAULT: '#dc2626', dark: '#b91c1c' },
        info:    { light: '#dbeafe', DEFAULT: '#2563eb', dark: '#1d4ed8' },
      },
      fontFamily: {
        // Space Grotesk – landing page display font (Positivus)
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Inter – app shell body font
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        // Positivus type scale
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h2':      ['2.5rem',  { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h3':      ['1.75rem', { lineHeight: '1.3', fontWeight: '500' }],
      },
      boxShadow: {
        'card':       '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'modal':      '0 20px 60px -10px rgb(0 0 0 / 0.3)',
        'glow':       '0 0 0 3px rgb(99 102 241 / 0.2)',
        // Positivus card shadow
        'positivus':  '0 5px 0 0 #191A23',
      },
      borderRadius: {
        // shadcn var-based
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // existing
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        // Positivus pill card radius
        'pill':  '0.875rem',    // 14px – badge/pill shape
        'brand': '2.8125rem',   // 45px – large card radius (Positivus)
      },
      animation: {
        'fade-in':    'fadeIn 0.15s ease-out',
        'slide-in':   'slideIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideIn: { from: { opacity: '0', transform: 'translateY(-4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      // Positivus section spacing
      spacing: {
        'section': '8.75rem',  // 140px section vertical padding
        'section-sm': '5rem',  // 80px
      },
    },
  },
  plugins: [],
};
