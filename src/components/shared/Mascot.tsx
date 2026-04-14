'use client'

interface MascotProps {
  className?: string
  size?: number
}

export function Mascot({ className = '', size = 200 }: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 1.1}
      className={className}
    >
      {/* Glow behind body */}
      <ellipse cx="100" cy="180" rx="50" ry="10" fill="#FF6B52" opacity="0.1" />

      {/* Left antenna */}
      <path d="M72 68 C68 40, 55 30, 50 20" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="49" cy="18" r="7" fill="#7C3AED" opacity="0.9" />
      <circle cx="49" cy="18" r="4" fill="#A78BFA" />
      <circle cx="47" cy="16" r="1.5" fill="#fff" opacity="0.7" />

      {/* Right antenna */}
      <path d="M128 68 C132 40, 145 30, 150 20" stroke="#FF6B52" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="151" cy="18" r="7" fill="#FF6B52" opacity="0.9" />
      <circle cx="151" cy="18" r="4" fill="#FF8570" />
      <circle cx="149" cy="16" r="1.5" fill="#fff" opacity="0.7" />

      {/* Body */}
      <ellipse cx="100" cy="130" rx="58" ry="62" fill="#4DD4AC" />
      <ellipse cx="100" cy="130" rx="58" ry="62" fill="url(#bodyGrad)" />

      {/* Belly highlight */}
      <ellipse cx="100" cy="140" rx="38" ry="36" fill="#6EEDC4" opacity="0.5" />

      {/* Head */}
      <ellipse cx="100" cy="95" rx="52" ry="48" fill="#4DD4AC" />
      <ellipse cx="100" cy="95" rx="52" ry="48" fill="url(#headGrad)" />

      {/* Cheeks */}
      <ellipse cx="62" cy="108" rx="10" ry="7" fill="#FF8570" opacity="0.35" />
      <ellipse cx="138" cy="108" rx="10" ry="7" fill="#FF8570" opacity="0.35" />

      {/* Left eye */}
      <ellipse cx="78" cy="92" rx="16" ry="17" fill="#fff" />
      <ellipse cx="80" cy="93" rx="10" ry="11" fill="#1A1A18" />
      <ellipse cx="83" cy="89" rx="4" ry="4.5" fill="#fff" />
      <ellipse cx="76" cy="95" rx="2" ry="2" fill="#fff" opacity="0.5" />

      {/* Right eye */}
      <ellipse cx="122" cy="92" rx="16" ry="17" fill="#fff" />
      <ellipse cx="120" cy="93" rx="10" ry="11" fill="#1A1A18" />
      <ellipse cx="123" cy="89" rx="4" ry="4.5" fill="#fff" />
      <ellipse cx="116" cy="95" rx="2" ry="2" fill="#fff" opacity="0.5" />

      {/* Smile */}
      <path d="M85 112 Q100 126 115 112" stroke="#1A1A18" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Left arm waving */}
      <path d="M46 125 C30 115, 22 105, 18 90" stroke="#4DD4AC" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M46 125 C30 115, 22 105, 18 90" stroke="url(#armGradL)" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Left hand */}
      <circle cx="17" cy="87" r="7" fill="#3CC99E" />

      {/* Right arm holding planet */}
      <path d="M154 125 C168 112, 175 100, 178 92" stroke="#4DD4AC" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M154 125 C168 112, 175 100, 178 92" stroke="url(#armGradR)" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* Right hand */}
      <circle cx="179" cy="89" r="7" fill="#3CC99E" />

      {/* Small planet in right hand */}
      <circle cx="179" cy="76" r="10" fill="#60A5FA" />
      <ellipse cx="179" cy="76" rx="14" ry="3" fill="none" stroke="#93C5FD" strokeWidth="1.5" transform="rotate(-20 179 76)" />
      <circle cx="175" cy="73" r="2" fill="#93C5FD" opacity="0.6" />

      {/* Left foot */}
      <ellipse cx="78" cy="188" rx="16" ry="8" fill="#3CC99E" />
      {/* Right foot */}
      <ellipse cx="122" cy="188" rx="16" ry="8" fill="#3CC99E" />

      {/* Sparkles around */}
      <g opacity="0.7">
        {/* Star top-left */}
        <path d="M30 55 L32 50 L34 55 L39 53 L34 55 L36 60 L34 55 L29 57 Z" fill="#FFD166" />
        {/* Star top-right */}
        <path d="M168 45 L170 40 L172 45 L177 43 L172 45 L174 50 L172 45 L167 47 Z" fill="#FF6B52" />
        {/* Star bottom-left */}
        <path d="M25 160 L27 155 L29 160 L34 158 L29 160 L31 165 L29 160 L24 162 Z" fill="#7C3AED" />
        {/* Small dots */}
        <circle cx="40" cy="38" r="2" fill="#FFD166" />
        <circle cx="162" cy="60" r="2" fill="#FF8570" />
        <circle cx="175" cy="130" r="1.5" fill="#A78BFA" />
      </g>

      {/* Heart on belly */}
      <path d="M95 145 C95 140, 88 138, 88 143 C88 148, 95 154, 100 158 C105 154, 112 148, 112 143 C112 138, 105 140, 105 145 L100 152 Z" fill="#FF6B52" opacity="0.6" />

      <defs>
        <linearGradient id="bodyGrad" x1="100" y1="68" x2="100" y2="192" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#2DD4A0" />
        </linearGradient>
        <linearGradient id="headGrad" x1="100" y1="47" x2="100" y2="143" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6EEDC4" />
          <stop offset="1" stopColor="#4DD4AC" />
        </linearGradient>
        <linearGradient id="armGradL" x1="46" y1="125" x2="18" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4DD4AC" />
          <stop offset="1" stopColor="#3CC99E" />
        </linearGradient>
        <linearGradient id="armGradR" x1="154" y1="125" x2="178" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4DD4AC" />
          <stop offset="1" stopColor="#3CC99E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
