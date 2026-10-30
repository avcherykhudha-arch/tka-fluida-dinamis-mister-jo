import React from 'react';

interface ScientificDiagramProps {
  type: string;
  caption?: string;
  className?: string;
}

export const ScientificDiagram: React.FC<ScientificDiagramProps> = ({ type, caption, className = '' }) => {
  const renderSvg = () => {
    switch (type) {
      case 'laminar_pipe_flow':
        return (
          <svg viewBox="0 0 600 220" className="w-full h-auto max-h-56">
            <defs>
              <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#881337" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#be123c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#881337" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="fluidFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.25" />
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#881337" />
              </marker>
              <marker id="arrowGold" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#d97706" />
              </marker>
            </defs>
            {/* Background grid */}
            <rect width="600" height="220" fill="#fff" rx="12" />
            <line x1="30" y1="110" x2="570" y2="110" stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth="1" />

            {/* Pipe walls */}
            <rect x="50" y="40" width="500" height="140" fill="url(#fluidFlow)" rx="4" />
            <line x1="50" y1="40" x2="550" y2="40" stroke="#881337" strokeWidth="6" />
            <line x1="50" y1="180" x2="550" y2="180" stroke="#881337" strokeWidth="6" />

            {/* Hatching for pipe wall */}
            {[...Array(20)].map((_, i) => (
              <line key={`top-${i}`} x1={55 + i * 25} y1="32" x2={70 + i * 25} y2="40" stroke="#881337" strokeWidth="2" />
            ))}
            {[...Array(20)].map((_, i) => (
              <line key={`bot-${i}`} x1={55 + i * 25} y1="180" x2={70 + i * 25} y2="188" stroke="#881337" strokeWidth="2" />
            ))}

            {/* Parabolic Velocity Profile */}
            <path
              d="M 220 40 Q 380 110 220 180"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="2.5"
              strokeDasharray="2 2"
            />
            {/* Velocity vectors inside parabola */}
            <line x1="220" y1="55" x2="270" y2="55" stroke="#b91c1c" strokeWidth="1.8" markerEnd="url(#arrow)" />
            <line x1="220" y1="75" x2="330" y2="75" stroke="#b91c1c" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="220" y1="110" x2="375" y2="110" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrowGold)" />
            <line x1="220" y1="145" x2="330" y2="145" stroke="#b91c1c" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="220" y1="165" x2="270" y2="165" stroke="#b91c1c" strokeWidth="1.8" markerEnd="url(#arrow)" />

            {/* Labels */}
            <text x="390" y="115" fill="#881337" fontSize="13" fontWeight="bold">v_maks (Sumbu)</text>
            <text x="220" y="30" fill="#475569" fontSize="12">v = 0 (Dinding)</text>
            <text x="220" y="202" fill="#475569" fontSize="12">v = 0 (Dinding)</text>
            <line x1="480" y1="40" x2="480" y2="180" stroke="#0284c7" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
            <text x="495" y="115" fill="#0284c7" fontSize="13" fontWeight="bold">Diameter D = 4 cm</text>
            <text x="60" y="65" fill="#64748b" fontSize="11" fontStyle="italic">Aliran Laminer Tunak (Re ≤ 2000)</text>
          </svg>
        );

      case 'venturi_u_manometer':
      case 'geothermal_venturi_manometer':
      case 'refinery_fuel_venturi_manometer':
        return (
          <svg viewBox="0 0 600 240" className="w-full h-auto max-h-60">
            <defs>
              <marker id="arrV" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#881337" />
              </marker>
              <linearGradient id="mercury" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>
            <rect width="600" height="240" fill="#fff" rx="12" />

            {/* Venturi Tube Outline */}
            <path
              d="M 40 40 L 190 40 L 260 70 L 340 70 L 410 40 L 560 40 L 560 110 L 410 110 L 340 85 L 260 85 L 190 110 L 40 110 Z"
              fill="#ffe4e6"
              stroke="#881337"
              strokeWidth="3"
            />

            {/* Flow Streamlines */}
            <line x1="60" y1="75" x2="160" y2="75" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrV)" />
            <line x1="270" y1="77" x2="330" y2="77" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrV)" />
            <line x1="430" y1="75" x2="530" y2="75" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrV)" />

            {/* Manometer U-Tube */}
            <path
              d="M 140 110 L 140 180 Q 140 220 180 220 L 260 220 Q 300 220 300 180 L 300 85"
              fill="none"
              stroke="#475569"
              strokeWidth="14"
              strokeLinejoin="round"
            />
            {/* Inner fluid cavity of U-tube */}
            <path
              d="M 140 110 L 140 180 Q 140 220 180 220 L 260 220 Q 300 220 300 180 L 300 85"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="10"
              strokeLinejoin="round"
            />

            {/* Mercury in U-Tube showing height difference */}
            {/* Left side column at y = 175, Right side column at y = 135 (higher on throat side due to lower pressure) */}
            <path
              d="M 140 170 L 140 180 Q 140 220 180 220 L 260 220 Q 300 220 300 180 L 300 130"
              fill="none"
              stroke="url(#mercury)"
              strokeWidth="10"
              strokeLinejoin="round"
            />

            {/* Height difference indicator h */}
            <line x1="220" y1="130" x2="315" y2="130" stroke="#b91c1c" strokeDasharray="3 3" />
            <line x1="125" y1="170" x2="220" y2="170" stroke="#b91c1c" strokeDasharray="3 3" />
            <line x1="220" y1="130" x2="220" y2="170" stroke="#b91c1c" strokeWidth="2" markerStart="url(#arrV)" markerEnd="url(#arrV)" />
            <text x="230" y="154" fill="#b91c1c" fontSize="13" fontWeight="bold">h (Beda Tinggi)</text>

            {/* Labels */}
            <text x="90" y="30" fill="#881337" fontSize="13" fontWeight="bold">Pipa Utama (A₁, P₁, v₁)</text>
            <text x="270" y="30" fill="#881337" fontSize="13" fontWeight="bold">Leher Sempit (A₂, P₂, v₂)</text>
            <text x="330" y="215" fill="#334155" fontSize="12" fontWeight="bold">Manometer Fluida (ρ')</text>
            <text x="45" y="130" fill="#64748b" fontSize="11">P₁ &gt; P₂</text>
            <text x="315" y="105" fill="#64748b" fontSize="11">v₂ &gt; v₁</text>
          </svg>
        );

      case 'venturi_closed_gauge':
      case 'venturi_crude_oil':
      case 'nuclear_coolant_venturi':
        return (
          <svg viewBox="0 0 600 220" className="w-full h-auto max-h-56">
            <rect width="600" height="220" fill="#fff" rx="12" />
            {/* Venturi Tube */}
            <path
              d="M 50 50 L 200 50 L 270 80 L 330 80 L 400 50 L 550 50 L 550 150 L 400 150 L 330 120 L 270 120 L 200 150 L 50 150 Z"
              fill="#fff1f2"
              stroke="#881337"
              strokeWidth="3.5"
            />
            {/* Pressure Taps */}
            <line x1="130" y1="50" x2="130" y2="20" stroke="#0284c7" strokeWidth="4" />
            <line x1="300" y1="80" x2="300" y2="20" stroke="#0284c7" strokeWidth="4" />
            <path d="M 130 20 L 200 20 L 200 20 L 230 20" stroke="#0284c7" strokeWidth="3" fill="none" />
            <path d="M 300 20 L 270 20" stroke="#0284c7" strokeWidth="3" fill="none" />

            {/* Differential Pressure Transducer */}
            <rect x="220" y="5" width="60" height="30" fill="#0f172a" rx="6" />
            <text x="228" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">ΔP = P₁-P₂</text>

            {/* Flow arrows */}
            <line x1="70" y1="100" x2="160" y2="100" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrV)" />
            <line x1="280" y1="100" x2="320" y2="100" stroke="#e11d48" strokeWidth="3" markerEnd="url(#arrV)" />
            <line x1="430" y1="100" x2="520" y2="100" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrV)" />

            <text x="90" y="175" fill="#881337" fontSize="13" fontWeight="bold">Penampang Luas (A₁)</text>
            <text x="260" y="145" fill="#881337" fontSize="13" fontWeight="bold">Leher (A₂)</text>
            <text x="240" y="195" fill="#475569" fontSize="12" fontStyle="italic">Sensor Tekanan Diferensial Tertutup</text>
          </svg>
        );

      case 'venturi_piezometer_tubes':
        return (
          <svg viewBox="0 0 600 240" className="w-full h-auto max-h-60">
            <rect width="600" height="240" fill="#fff" rx="12" />
            {/* Piezometer open vertical tubes */}
            <rect x="130" y="20" width="30" height="90" fill="#e0f2fe" stroke="#334155" strokeWidth="2.5" />
            <rect x="285" y="60" width="30" height="50" fill="#e0f2fe" stroke="#334155" strokeWidth="2.5" />

            {/* Venturi pipe */}
            <path
              d="M 40 100 L 190 100 L 260 120 L 340 120 L 410 100 L 560 100 L 560 180 L 410 180 L 340 150 L 260 150 L 190 180 L 40 180 Z"
              fill="#bae6fd"
              stroke="#0369a1"
              strokeWidth="3"
            />

            {/* Water levels in tubes */}
            <line x1="130" y1="40" x2="160" y2="40" stroke="#0284c7" strokeWidth="4" />
            <line x1="285" y1="85" x2="315" y2="85" stroke="#0284c7" strokeWidth="4" />

            {/* Height diff line */}
            <line x1="160" y1="40" x2="285" y2="40" stroke="#b91c1c" strokeDasharray="3 3" />
            <line x1="220" y1="40" x2="220" y2="85" stroke="#b91c1c" strokeWidth="2" markerStart="url(#arrV)" markerEnd="url(#arrV)" />
            <text x="228" y="68" fill="#b91c1c" fontSize="12" fontWeight="bold">Δh</text>

            <text x="110" y="15" fill="#475569" fontSize="12" fontWeight="bold">Tabung 1 (h₁)</text>
            <text x="270" y="55" fill="#475569" fontSize="12" fontWeight="bold">Tabung 2 (h₂)</text>
            <text x="60" y="210" fill="#0369a1" fontSize="13" fontWeight="bold">A₁ (P₁ lebih tinggi)</text>
            <text x="270" y="180" fill="#0369a1" fontSize="13" fontWeight="bold">A₂ (P₂ lebih rendah)</text>
          </svg>
        );

      case 'pitot_tube_probe':
      case 'wind_tunnel_pitot':
      case 'supersonic_pitot_altitude':
        return (
          <svg viewBox="0 0 600 220" className="w-full h-auto max-h-56">
            <rect width="600" height="220" fill="#fff" rx="12" />
            {/* Pitot Static Tube Geometry */}
            <path
              d="M 120 70 L 420 70 L 420 160"
              fill="none"
              stroke="#334155"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 140 90 L 390 90 L 390 160"
              fill="none"
              stroke="#64748b"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Stagnation hole at front tip */}
            <circle cx="120" cy="80" r="12" fill="#0f172a" stroke="#d97706" strokeWidth="2" />
            <text x="50" y="85" fill="#d97706" fontSize="12" fontWeight="bold">Titik Stagnasi (v=0)</text>

            {/* Static pressure taps on outer tube */}
            <circle cx="240" cy="65" r="3" fill="#0284c7" />
            <circle cx="280" cy="65" r="3" fill="#0284c7" />
            <text x="210" y="50" fill="#0284c7" fontSize="12">Lubang Tekanan Statis</text>

            {/* Manometer legs */}
            <rect x="370" y="150" width="70" height="60" fill="#f8fafc" stroke="#94a3b8" rx="4" />
            <line x1="390" y1="160" x2="390" y2="195" stroke="#b91c1c" strokeWidth="6" />
            <line x1="420" y1="160" x2="420" y2="180" stroke="#b91c1c" strokeWidth="6" />
            <text x="350" y="215" fill="#475569" fontSize="11">Indikator Manometer / Sensor ΔP</text>

            {/* Air flow arrows */}
            {[...Array(5)].map((_, i) => (
              <line key={`flow-${i}`} x1="30" y1={40 + i * 25} x2="100" y2={40 + i * 25} stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrV)" />
            ))}
            <text x="30" y="25" fill="#0284c7" fontSize="12" fontWeight="bold">Aliran Udara Bebas (v)</text>
          </svg>
        );

      case 'airfoil_lift':
      case 'airfoil_camber_flaps':
      case 'airplane_takeoff_runway':
        return (
          <svg viewBox="0 0 600 220" className="w-full h-auto max-h-56">
            <rect width="600" height="220" fill="#fff" rx="12" />
            {/* Airfoil shape */}
            <path
              d="M 150 115 C 200 65, 340 75, 450 115 C 360 135, 220 135, 150 115 Z"
              fill="#f1f5f9"
              stroke="#1e293b"
              strokeWidth="3.5"
            />
            {/* Camber chord line */}
            <line x1="150" y1="115" x2="450" y2="115" stroke="#94a3b8" strokeDasharray="3 3" />

            {/* Streamlines upper surface (crowded & fast) */}
            <path d="M 80 85 C 180 50, 320 45, 520 85" fill="none" stroke="#2563eb" strokeWidth="2" />
            <path d="M 80 70 C 180 35, 320 30, 520 70" fill="none" stroke="#2563eb" strokeWidth="1.8" />
            <path d="M 80 55 C 180 20, 320 18, 520 55" fill="none" stroke="#2563eb" strokeWidth="1.5" />

            {/* Streamlines lower surface (flatter & slower) */}
            <path d="M 80 135 C 200 145, 340 145, 520 135" fill="none" stroke="#64748b" strokeWidth="1.8" />
            <path d="M 80 155 C 200 165, 340 165, 520 155" fill="none" stroke="#64748b" strokeWidth="1.5" />

            {/* Lift Force Vector */}
            <line x1="280" y1="100" x2="280" y2="25" stroke="#d97706" strokeWidth="4" markerEnd="url(#arrV)" />
            <text x="290" y="35" fill="#d97706" fontSize="14" fontWeight="bold">F_angkat = (P_b - P_a) · A</text>

            {/* Pressure & Velocity labels */}
            <text x="240" y="65" fill="#1e3a8a" fontSize="12" fontWeight="bold">v_a tinggi, P_a rendah</text>
            <text x="240" y="160" fill="#334155" fontSize="12" fontWeight="bold">v_b rendah, P_b tinggi</text>
            <text x="110" y="195" fill="#64748b" fontSize="12">Garis arus di atas melengkung rapat ⇒ Kecepatan naik ⇒ Tekanan turun</text>
          </svg>
        );

      case 'elevated_pipeline':
      case 'water_tower_pump_system':
      case 'penstock_hydro_cavitation':
        return (
          <svg viewBox="0 0 600 230" className="w-full h-auto max-h-58">
            <rect width="600" height="230" fill="#fff" rx="12" />
            {/* Datum line */}
            <line x1="40" y1="190" x2="560" y2="190" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="50" y="208" fill="#64748b" fontSize="11">Garis Acuan Elevasi (h = 0)</text>

            {/* Pipe sloping upwards with narrowing */}
            <path
              d="M 60 150 L 180 150 L 360 80 L 520 80 L 520 110 L 370 110 L 200 180 L 60 180 Z"
              fill="#fee2e2"
              stroke="#881337"
              strokeWidth="3.5"
            />

            {/* Flow arrows */}
            <line x1="90" y1="165" x2="150" y2="165" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrV)" />
            <line x1="250" y1="140" x2="310" y2="115" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrV)" />
            <line x1="400" y1="95" x2="490" y2="95" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrV)" />

            {/* Height dimension h2 */}
            <line x1="535" y1="190" x2="535" y2="95" stroke="#0284c7" strokeWidth="2" markerStart="url(#arrV)" markerEnd="url(#arrV)" />
            <text x="545" y="145" fill="#0284c7" fontSize="13" fontWeight="bold">h₂ - h₁</text>

            {/* Node labels */}
            <text x="60" y="140" fill="#881337" fontSize="13" fontWeight="bold">Titik 1 (D₁, P₁, v₁)</text>
            <text x="400" y="65" fill="#881337" fontSize="13" fontWeight="bold">Titik 2 (D₂, P₂, v₂)</text>
            <text x="180" y="215" fill="#475569" fontSize="12" fontStyle="italic">P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂</text>
          </svg>
        );

      case 'torricelli_tank':
      case 'tank_drainage_orifice':
        return (
          <svg viewBox="0 0 600 230" className="w-full h-auto max-h-58">
            <rect width="600" height="230" fill="#fff" rx="12" />
            {/* Ground */}
            <line x1="40" y1="200" x2="560" y2="200" stroke="#334155" strokeWidth="3" />

            {/* Tank */}
            <rect x="70" y="30" width="160" height="170" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" />
            {/* Water body */}
            <rect x="73" y="50" width="154" height="147" fill="#bae6fd" opacity="0.6" />
            <line x1="73" y1="50" x2="227" y2="50" stroke="#0284c7" strokeWidth="2.5" />

            {/* Orifice hole */}
            <rect x="230" y="130" width="10" height="16" fill="#fff" stroke="#1e293b" strokeWidth="2" />

            {/* Water Jet parabolic trajectory */}
            <path
              d="M 235 138 Q 360 140 450 200"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Dimension h (depth from water surface) */}
            <line x1="50" y1="50" x2="50" y2="138" stroke="#b91c1c" strokeWidth="1.8" markerStart="url(#arrV)" markerEnd="url(#arrV)" />
            <text x="25" y="100" fill="#b91c1c" fontSize="13" fontWeight="bold">h</text>

            {/* Dimension h2 (height above ground) */}
            <line x1="50" y1="138" x2="50" y2="200" stroke="#0284c7" strokeWidth="1.8" markerStart="url(#arrV)" markerEnd="url(#arrV)" />
            <text x="25" y="175" fill="#0284c7" fontSize="13" fontWeight="bold">h₂</text>

            {/* Range x */}
            <line x1="230" y1="215" x2="450" y2="215" stroke="#d97706" strokeWidth="2" markerStart="url(#arrV)" markerEnd="url(#arrV)" />
            <text x="320" y="228" fill="#d97706" fontSize="13" fontWeight="bold">Jarak x</text>

            <text x="245" y="125" fill="#0369a1" fontSize="12" fontWeight="bold">v = √(2gh)</text>
          </svg>
        );

      case 'pipe_branch_manifold':
      case 'capillary_branching_vessel':
        return (
          <svg viewBox="0 0 600 220" className="w-full h-auto max-h-56">
            <rect width="600" height="220" fill="#fff" rx="12" />
            {/* Main Pipe branching to 4 small pipes */}
            <path
              d="M 40 80 L 180 80 L 250 30 L 520 30 L 520 50 L 270 50 L 240 80 L 520 80 L 520 100 L 260 100 L 260 120 L 520 120 L 520 140 L 240 140 L 270 170 L 520 170 L 520 190 L 250 190 L 180 140 L 40 140 Z"
              fill="#ffe4e6"
              stroke="#881337"
              strokeWidth="2.5"
            />
            {/* Flow arrows */}
            <line x1="60" y1="110" x2="140" y2="110" stroke="#e11d48" strokeWidth="3" markerEnd="url(#arrV)" />
            <line x1="320" y1="40" x2="440" y2="40" stroke="#e11d48" strokeWidth="1.8" markerEnd="url(#arrV)" />
            <line x1="320" y1="90" x2="440" y2="90" stroke="#e11d48" strokeWidth="1.8" markerEnd="url(#arrV)" />
            <line x1="320" y1="130" x2="440" y2="130" stroke="#e11d48" strokeWidth="1.8" markerEnd="url(#arrV)" />
            <line x1="320" y1="180" x2="440" y2="180" stroke="#e11d48" strokeWidth="1.8" markerEnd="url(#arrV)" />

            <text x="50" y="65" fill="#881337" fontSize="13" fontWeight="bold">Pipa Utama (Q₁ = A₁ v₁)</text>
            <text x="360" y="15" fill="#881337" fontSize="12" fontWeight="bold">Cabang Paralel Distribusi</text>
            <text x="60" y="170" fill="#475569" fontSize="12" fontStyle="italic">ΣQ_masuk = ΣQ_keluar</text>
          </svg>
        );

      case 'fire_hose_nozzle':
      case 'falling_water_stream_taper':
        return (
          <svg viewBox="0 0 600 200" className="w-full h-auto max-h-52">
            <rect width="600" height="200" fill="#fff" rx="12" />
            {/* Large hose transitioning to narrow nozzle */}
            <path
              d="M 50 40 L 220 40 L 360 85 L 430 85 L 430 115 L 360 115 L 220 160 L 50 160 Z"
              fill="#ffe4e6"
              stroke="#881337"
              strokeWidth="3.5"
            />
            {/* Water jet shooting out */}
            <path
              d="M 430 85 L 560 70 L 560 130 L 430 115 Z"
              fill="#bae6fd"
              opacity="0.8"
            />
            {/* Velocity vectors */}
            <line x1="90" y1="100" x2="160" y2="100" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrV)" />
            <line x1="435" y1="100" x2="530" y2="100" stroke="#0284c7" strokeWidth="4" markerEnd="url(#arrV)" />

            <text x="90" y="75" fill="#881337" fontSize="13" fontWeight="bold">D₁, v₁ (lambat)</text>
            <text x="440" y="65" fill="#0284c7" fontSize="14" fontWeight="bold">D₂, v₂ (sangat cepat)</text>
            <text x="180" y="185" fill="#475569" fontSize="12" fontStyle="italic">A₁ v₁ = A₂ v₂ ⇒ v₂ = (D₁/D₂)² · v₁</text>
          </svg>
        );

      default:
        // Generic elegant scientific pipe diagram
        return (
          <svg viewBox="0 0 600 200" className="w-full h-auto max-h-52">
            <rect width="600" height="200" fill="#fff" rx="12" />
            <rect x="60" y="60" width="480" height="80" fill="#fff1f2" stroke="#881337" strokeWidth="3" rx="6" />
            <line x1="100" y1="100" x2="480" y2="100" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="6 4" />
            {[...Array(4)].map((_, i) => (
              <line key={`flow-${i}`} x1={120 + i * 100} y1="100" x2={160 + i * 100} y2="100" stroke="#881337" strokeWidth="2.5" markerEnd="url(#arrV)" />
            ))}
            <text x="220" y="45" fill="#881337" fontSize="13" fontWeight="bold">Sistem Aliran Fluida Dinamis Tunak</text>
            <text x="235" y="165" fill="#64748b" fontSize="12">Garis Arus (Streamline) Fluida Ideal</text>
          </svg>
        );
    }
  };

  return (
    <div className={`my-3 p-3 bg-white rounded-2xl border border-rose-100 shadow-sm ${className}`}>
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-2">
        {renderSvg()}
      </div>
      {caption && (
        <p className="mt-2 text-xs md:text-sm text-slate-600 text-center font-medium italic">
          {caption}
        </p>
      )}
    </div>
  );
};
