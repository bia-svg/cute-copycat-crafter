interface AcademicSealProps {
  size?: "sm" | "md" | "lg";
}

export default function AcademicSeal({ size = "md" }: AcademicSealProps) {
  const dims = size === "sm" ? "w-10 h-10 md:w-12 md:h-12" : size === "lg" ? "w-16 h-16 md:w-20 md:h-20" : "w-12 h-12 md:w-16 md:h-16";

  return (
    <div className={`${dims} relative mx-auto`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        {/* Outer ring */}
        <circle cx="50" cy="50" r="47" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.35" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.25" />
        {/* Fill */}
        <circle cx="50" cy="50" r="39" fill="hsl(var(--primary))" opacity="0.06" />

        {/* Laurel left */}
        <g opacity="0.3" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.8">
          <path d="M22,70 Q18,60 22,50" />
          <ellipse cx="19" cy="62" rx="3" ry="5" transform="rotate(-20,19,62)" />
          <ellipse cx="18" cy="54" rx="2.5" ry="4.5" transform="rotate(-10,18,54)" />
          <ellipse cx="20" cy="46" rx="2.5" ry="4" transform="rotate(5,20,46)" />
        </g>
        {/* Laurel right */}
        <g opacity="0.3" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.8">
          <path d="M78,70 Q82,60 78,50" />
          <ellipse cx="81" cy="62" rx="3" ry="5" transform="rotate(20,81,62)" />
          <ellipse cx="82" cy="54" rx="2.5" ry="4.5" transform="rotate(10,82,54)" />
          <ellipse cx="80" cy="46" rx="2.5" ry="4" transform="rotate(-5,80,46)" />
        </g>

        {/* Decorative dots on outer ring */}
        <circle cx="50" cy="3" r="1.5" fill="hsl(var(--primary))" opacity="0.3" />
        <circle cx="50" cy="97" r="1.5" fill="hsl(var(--primary))" opacity="0.3" />

        {/* Text */}
        <text x="50" y="44" textAnchor="middle" fill="hsl(var(--primary))" fontSize="16" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="1">
          Lic.
        </text>
        <text x="50" y="62" textAnchor="middle" fill="hsl(var(--primary))" fontSize="16" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="1">
          Psych.
        </text>

        {/* Small separator line */}
        <line x1="38" y1="47" x2="62" y2="47" stroke="hsl(var(--primary))" strokeWidth="0.6" opacity="0.25" />

        {/* Top arc text area – subtle "UNIVERSITAS" feel */}
        <path id="topArc" d="M20,50 A30,30 0 0,1 80,50" fill="none" />
        <text fontSize="5" fill="hsl(var(--primary))" opacity="0.3" fontFamily="Georgia, serif" letterSpacing="2">
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">PSYCHOLOGIA</textPath>
        </text>

        {/* Bottom arc */}
        <path id="bottomArc" d="M22,58 A32,32 0 0,0 78,58" fill="none" />
        <text fontSize="5" fill="hsl(var(--primary))" opacity="0.3" fontFamily="Georgia, serif" letterSpacing="2">
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">LICENCIATUS</textPath>
        </text>
      </svg>
    </div>
  );
}
