/**
 * Custom SVG illustrations for Poorvam Care.
 * Warm, organic, hand-drawn-style vectors that match the brand palette.
 * No external images needed — pure inline SVG.
 */

/** Child Development — parent & child silhouette with playful shapes */
export function ChildDevelopmentIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background organic blob */}
      <ellipse cx="200" cy="150" rx="180" ry="120" fill="#E8725A" opacity="0.07" />
      <ellipse cx="160" cy="170" rx="120" ry="90" fill="#7BA87B" opacity="0.06" />
      {/* Ground line */}
      <path d="M40 230 Q120 220 200 228 Q280 236 360 225" stroke="#E5A94E" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      {/* Parent silhouette */}
      <circle cx="150" cy="100" r="22" fill="#5C4A3A" opacity="0.7" />
      <path d="M130 125 Q150 118 170 125 L175 190 Q150 195 125 190 Z" fill="#5C4A3A" opacity="0.6" rx="8" />
      <path d="M125 190 L120 225 M175 190 L180 225" stroke="#5C4A3A" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      {/* Child silhouette */}
      <circle cx="215" cy="140" r="16" fill="#E8725A" opacity="0.7" />
      <path d="M200 158 Q215 152 230 158 L233 200 Q215 204 197 200 Z" fill="#E8725A" opacity="0.6" />
      <path d="M197 200 L194 225 M233 200 L236 225" stroke="#E8725A" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
      {/* Connecting hands */}
      <path d="M170 155 Q190 148 200 155" stroke="#E5A94E" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Playful shapes — blocks, stars */}
      <rect x="270" y="180" width="25" height="25" rx="5" fill="#E8725A" opacity="0.2" transform="rotate(12 282 192)" />
      <rect x="285" y="155" width="20" height="20" rx="4" fill="#7BA87B" opacity="0.2" transform="rotate(-8 295 165)" />
      <rect x="260" y="160" width="18" height="18" rx="4" fill="#E5A94E" opacity="0.2" transform="rotate(5 269 169)" />
      {/* Stars */}
      <path d="M80 80 L83 72 L86 80 L94 80 L88 85 L90 93 L83 88 L76 93 L78 85 L72 80 Z" fill="#E5A94E" opacity="0.3" />
      <path d="M320 90 L322 85 L324 90 L329 90 L325 93 L326 98 L322 95 L318 98 L319 93 L315 90 Z" fill="#E8725A" opacity="0.25" />
      {/* Puzzle piece */}
      <path d="M310 130 h20 v8 a6 6 0 010 12 v8 h-20 v-8 a6 6 0 000-12 z" fill="#7BA87B" opacity="0.2" />
      {/* ABC letters */}
      <text x="65" y="175" fontFamily="serif" fontSize="18" fontWeight="700" fill="#E8725A" opacity="0.15">A</text>
      <text x="82" y="185" fontFamily="serif" fontSize="18" fontWeight="700" fill="#7BA87B" opacity="0.15">B</text>
      <text x="68" y="200" fontFamily="serif" fontSize="18" fontWeight="700" fill="#E5A94E" opacity="0.15">C</text>
      {/* Heart */}
      <path d="M185 75 C185 68 195 62 200 70 C205 62 215 68 215 75 C215 85 200 95 200 95 C200 95 185 85 185 75Z" fill="#E8725A" opacity="0.15" />
    </svg>
  );
}

/** Therapeutic Enrichment — music, movement, art motifs */
export function TherapeuticEnrichmentIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background blob */}
      <ellipse cx="200" cy="140" rx="170" ry="115" fill="#7BA87B" opacity="0.06" />
      <ellipse cx="240" cy="160" rx="130" ry="100" fill="#E5A94E" opacity="0.05" />
      {/* Musical notes */}
      <circle cx="100" cy="100" r="10" fill="#E8725A" opacity="0.25" />
      <line x1="110" y1="100" x2="110" y2="60" stroke="#E8725A" strokeWidth="3" opacity="0.25" />
      <path d="M110 60 Q125 55 120 70" stroke="#E8725A" strokeWidth="3" fill="none" opacity="0.25" />
      <circle cx="135" cy="120" r="8" fill="#7BA87B" opacity="0.2" />
      <line x1="143" y1="120" x2="143" y2="85" stroke="#7BA87B" strokeWidth="2.5" opacity="0.2" />
      {/* Dancing figure */}
      <circle cx="200" cy="90" r="14" fill="#E8725A" opacity="0.5" />
      <path d="M200 104 L200 155" stroke="#E8725A" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      <path d="M185 125 L200 118 L215 125" stroke="#E8725A" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      <path d="M200 155 L185 185" stroke="#E8725A" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      <path d="M200 155 L218 180" stroke="#E8725A" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
      {/* Art palette */}
      <ellipse cx="310" cy="140" rx="35" ry="28" fill="#5C4A3A" opacity="0.12" transform="rotate(-15 310 140)" />
      <circle cx="295" cy="130" r="5" fill="#E8725A" opacity="0.35" />
      <circle cx="310" cy="125" r="5" fill="#7BA87B" opacity="0.35" />
      <circle cx="325" cy="132" r="5" fill="#E5A94E" opacity="0.35" />
      <circle cx="305" cy="148" r="5" fill="#E8725A" opacity="0.2" />
      {/* Paintbrush */}
      <line x1="330" y1="150" x2="355" y2="110" stroke="#5C4A3A" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
      <path d="M355 110 L360 102 L350 105 Z" fill="#E8725A" opacity="0.3" />
      {/* Yoga pose */}
      <circle cx="80" cy="180" r="10" fill="#7BA87B" opacity="0.35" />
      <path d="M80 190 L80 220" stroke="#7BA87B" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      <path d="M65 205 L80 198 L95 205" stroke="#7BA87B" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      <path d="M68 220 L80 220 L92 220" stroke="#7BA87B" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      {/* Stars scattered */}
      <path d="M160 60 L162 54 L164 60 L170 60 L165 64 L167 70 L162 66 L157 70 L159 64 L154 60 Z" fill="#E5A94E" opacity="0.25" />
      <path d="M270 200 L271 196 L273 200 L277 200 L274 203 L275 207 L271 204 L268 207 L269 203 L266 200 Z" fill="#E8725A" opacity="0.2" />
      {/* Book */}
      <rect x="245" y="210" width="30" height="22" rx="2" fill="#5C4A3A" opacity="0.1" transform="rotate(-5 260 221)" />
      <line x1="260" y1="210" x2="260" y2="232" stroke="#E5A94E" strokeWidth="1.5" opacity="0.15" />
      {/* Ground */}
      <path d="M40 245 Q120 238 200 243 Q280 248 360 240" stroke="#7BA87B" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}

/** Hearing Center — ear, sound waves, stethoscope motifs */
export function HearingCenterIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background blob */}
      <ellipse cx="300" cy="140" rx="260" ry="120" fill="#E5A94E" opacity="0.05" />
      <ellipse cx="250" cy="150" rx="180" ry="110" fill="#E8725A" opacity="0.04" />
      {/* Large ear shape */}
      <path d="M260 60 C310 50 340 80 340 120 C340 150 325 170 310 185 C300 195 295 210 295 225"
            stroke="#5C4A3A" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.15" />
      <path d="M280 85 C300 80 315 95 315 115 C315 130 305 140 295 148"
            stroke="#5C4A3A" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.12" />
      {/* Sound waves emanating */}
      <path d="M220 100 C210 120 210 155 220 175" stroke="#E8725A" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.2" />
      <path d="M195 80 C178 115 178 165 195 200" stroke="#E8725A" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.15" />
      <path d="M170 65 C148 110 148 175 170 220" stroke="#E8725A" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.1" />
      {/* Hearing aid device */}
      <rect x="380" y="100" width="50" height="70" rx="12" fill="#7BA87B" opacity="0.15" />
      <circle cx="405" cy="125" r="12" stroke="#7BA87B" strokeWidth="2.5" fill="none" opacity="0.2" />
      <path d="M405 113 L405 137" stroke="#7BA87B" strokeWidth="2" opacity="0.15" />
      <path d="M393 125 L417 125" stroke="#7BA87B" strokeWidth="2" opacity="0.15" />
      {/* Stethoscope */}
      <path d="M470 80 C470 120 440 150 440 180 C440 200 455 210 470 210 C485 210 500 200 500 180 C500 150 470 120 470 80"
            stroke="#E5A94E" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.15" />
      <circle cx="470" cy="210" r="15" stroke="#E5A94E" strokeWidth="3" fill="none" opacity="0.12" />
      {/* Musical note — hearing music */}
      <circle cx="120" cy="130" r="8" fill="#E5A94E" opacity="0.2" />
      <line x1="128" y1="130" x2="128" y2="95" stroke="#E5A94E" strokeWidth="2.5" opacity="0.2" />
      {/* People silhouettes — all ages */}
      <circle cx="100" cy="200" r="8" fill="#5C4A3A" opacity="0.15" />
      <path d="M100 208 L100 235" stroke="#5C4A3A" strokeWidth="3" strokeLinecap="round" opacity="0.12" />
      <circle cx="130" cy="190" r="10" fill="#5C4A3A" opacity="0.15" />
      <path d="M130 200 L130 235" stroke="#5C4A3A" strokeWidth="3.5" strokeLinecap="round" opacity="0.12" />
      <circle cx="155" cy="195" r="9" fill="#5C4A3A" opacity="0.15" />
      <path d="M155 204 L155 235" stroke="#5C4A3A" strokeWidth="3" strokeLinecap="round" opacity="0.12" />
      {/* Checkmark — health */}
      <circle cx="520" cy="130" r="18" stroke="#7BA87B" strokeWidth="3" fill="none" opacity="0.15" />
      <path d="M510 130 L517 138 L532 122" stroke="#7BA87B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
    </svg>
  );
}

/** Hero collage — abstract therapy-themed composition */
export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Large organic background shapes */}
      <path d="M60 80 Q200 20 350 80 Q400 200 350 350 Q250 450 120 400 Q20 340 60 80Z" fill="#E8725A" opacity="0.06" />
      <path d="M100 120 Q250 60 340 150 Q380 280 280 380 Q150 420 80 300 Q40 200 100 120Z" fill="#7BA87B" opacity="0.05" />

      {/* Main card: parent-child scene */}
      <rect x="50" y="60" width="240" height="300" rx="24" fill="white" opacity="0.9" />
      <rect x="50" y="60" width="240" height="300" rx="24" stroke="#D4CABC" strokeWidth="1.5" fill="none" opacity="0.4" />
      {/* Inside main card — therapy scene */}
      <circle cx="140" cy="170" r="30" fill="#E8725A" opacity="0.12" />
      <circle cx="140" cy="145" r="16" fill="#5C4A3A" opacity="0.5" />
      <path d="M125 165 Q140 158 155 165 L158 215 Q140 220 122 215 Z" fill="#5C4A3A" opacity="0.35" />
      <circle cx="200" cy="180" r="12" fill="#E8725A" opacity="0.5" />
      <path d="M190 194 Q200 189 210 194 L212 230 Q200 234 188 230 Z" fill="#E8725A" opacity="0.35" />
      {/* Connecting — hand reaching */}
      <path d="M155 195 Q175 185 190 192" stroke="#E5A94E" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Blocks on table */}
      <rect x="100" y="260" width="120" height="8" rx="4" fill="#D4CABC" opacity="0.3" />
      <rect x="115" y="240" width="22" height="22" rx="5" fill="#E8725A" opacity="0.2" transform="rotate(8 126 251)" />
      <rect x="145" y="242" width="18" height="18" rx="4" fill="#7BA87B" opacity="0.2" transform="rotate(-5 154 251)" />
      <rect x="170" y="238" width="20" height="24" rx="4" fill="#E5A94E" opacity="0.2" />

      {/* Floating card top-right: speech bubble */}
      <rect x="230" y="40" width="140" height="110" rx="18" fill="white" opacity="0.9" />
      <rect x="230" y="40" width="140" height="110" rx="18" stroke="#D4CABC" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M270 75 h60 M270 90 h45 M270 105 h55" stroke="#E8725A" strokeWidth="3" strokeLinecap="round" opacity="0.15" />
      <circle cx="255" cy="85" r="12" fill="#7BA87B" opacity="0.2" />
      <path d="M252 82 L255 88 L260 80" stroke="#7BA87B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <text x="268" y="125" fontFamily="sans-serif" fontSize="9" fill="#5C4A3A" opacity="0.35" fontWeight="600">Play-Based</text>

      {/* Floating card bottom-left: heart + care */}
      <rect x="20" y="380" width="160" height="90" rx="18" fill="white" opacity="0.9" />
      <rect x="20" y="380" width="160" height="90" rx="18" stroke="#D4CABC" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M55 415 C55 405 68 400 72 410 C76 400 89 405 89 415 C89 428 72 440 72 440 C72 440 55 428 55 415Z" fill="#E8725A" opacity="0.25" />
      <text x="100" y="418" fontFamily="sans-serif" fontSize="10" fill="#5C4A3A" opacity="0.4" fontWeight="700">Evidence-Based</text>
      <text x="100" y="433" fontFamily="sans-serif" fontSize="9" fill="#8B7355" opacity="0.35">Therapy</text>

      {/* Scattered decorative shapes */}
      <circle cx="350" cy="200" r="6" fill="#E5A94E" opacity="0.2" />
      <circle cx="370" cy="280" r="4" fill="#E8725A" opacity="0.15" />
      <circle cx="30" cy="300" r="5" fill="#7BA87B" opacity="0.2" />
      <path d="M340 340 L343 333 L346 340 L353 340 L348 344 L350 351 L343 347 L336 351 L338 344 L333 340 Z" fill="#E5A94E" opacity="0.2" />
      <path d="M380 160 L382 155 L384 160 L389 160 L385 163 L387 168 L382 165 L377 168 L379 163 L375 160 Z" fill="#E8725A" opacity="0.15" />
    </svg>
  );
}
