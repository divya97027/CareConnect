function Logo({ size = 36, text = true, light = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <defs>
          <linearGradient id="cc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0F766E" />
            <stop offset="1" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#cc-grad)" />
        <g transform="translate(8 8)">
          <path d="M12 21s-8-5.5-8-11.5C4 6.5 6.5 4 9.5 4c1.4 0 2.5.7 2.5.7S13.1 4 14.5 4C17.5 4 20 6.5 20 9.5 20 15.5 12 21 12 21Z" fill="#fff" />
          <path d="M6 12h3l1.5-3 2.5 6 1.5-3H18" fill="none" stroke="#0F766E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      {text && (
        <span style={{ fontWeight: 700, fontSize: size * 0.55, color: light ? '#fff' : '#134E4A' }}>
          CareConnect
        </span>
      )}
    </span>
  )
}

export default Logo