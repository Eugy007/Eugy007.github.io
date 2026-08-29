/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08090c',
        surface: '#10131a',
        surface2: '#161b24',
        line: '#242b38',
        ink: '#edeef2',
        muted: '#8b93a3',
        mutedDim: '#565d70',
        signal: {
          DEFAULT: '#7fd8c4',
          dim: '#3f6f66',
          soft: 'rgba(127,216,196,0.1)',
        },
        amber: {
          DEFAULT: '#caa15a',
          dim: '#6e5a34',
          soft: 'rgba(202,161,90,0.1)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hero: ['var(--font-hero)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        shell: '1180px',
      },
      backgroundImage: {
        'grid-fine':
            'linear-gradient(to right, rgba(237,238,242,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,238,242,0.035) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-cell': '44px 44px',
      },
      boxShadow: {
        card: '0 24px 60px -24px rgba(0,0,0,0.65)',
        glow: '0 0 0 1px rgba(127,216,196,0.18), 0 0 40px -8px rgba(127,216,196,0.25)',
      },
      keyframes: {
        blink: { '50%': { opacity: 0 } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        marquee: 'marquee 32s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
