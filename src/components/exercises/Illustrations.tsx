import type { ComponentType } from 'react';
import { CurvedArrow, Figure, Floor, FrontFigure, WallVertical } from './shapes';

const VIEWBOX = '0 0 300 200';

function Svg({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox={VIEWBOX} className="exercise-illustration" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** 1. Protahování ramen s tyčí (shoulder dislocates) — arm sweeps from front-low to overhead-back. */
function ShoulderDislocates() {
  return (
    <Svg label="Stoj, paže s tyčí se obloukem zvedá zepředu přes hlavu za záda">
      <Floor x1={40} x2={260} y={178} />
      <CurvedArrow d="M172,116 Q150,10 78,88" tip={[78, 88]} angleDeg={133} />
      <Figure
        ghost
        showLegs={false}
        head={[150, 40]}
        neck={[150, 58]}
        hip={[150, 118]}
        knee={[150, 148]}
        foot={[150, 178]}
        shoulder={[150, 58]}
        elbow={[161, 87]}
        hand={[172, 116]}
      />
      <Figure
        head={[150, 40]}
        neck={[150, 58]}
        hip={[150, 118]}
        knee={[150, 148]}
        foot={[150, 178]}
        shoulder={[150, 58]}
        elbow={[115, 75]}
        hand={[78, 88]}
      />
    </Svg>
  );
}

/** 2. Hrudní extenze přes židli (thoracic extensions) — upper back arches over a chair, hips fixed. */
function ThoracicExtension() {
  return (
    <Svg label="Sed na zemi, horní záda přes opěradlo židle se prohýbá dozadu, boky zůstávají na místě">
      <Floor x1={40} x2={260} y={178} />
      <rect x={64} y={133} width={22} height={32} rx={6} className="exercise-illustration__prop" />
      <CurvedArrow d="M104,90 Q72,74 42,136" tip={[42, 136]} angleDeg={119} />
      <Figure
        ghost
        showLegs={false}
        head={[100, 92]}
        neck={[100, 110]}
        hip={[100, 158]}
        knee={[138, 172]}
        foot={[168, 178]}
        shoulder={[100, 113]}
        elbow={[100, 113]}
        hand={[100, 113]}
      />
      <Figure
        head={[38, 148]}
        neck={[58, 138]}
        hip={[100, 158]}
        knee={[138, 172]}
        foot={[168, 178]}
        shoulder={[62, 136]}
        elbow={[42, 115]}
        hand={[35, 92]}
      />
    </Svg>
  );
}

/** 3. Zvedání paží vleže na břiše (prone arm raises) — bird's-eye view, arms in a Y lift off the floor. */
function ProneArmRaises() {
  return (
    <Svg label="Pohled shora, leh na břiše, paže v tvaru Y se zvedají nad podlahu">
      <g className="exercise-illustration__figure exercise-illustration__figure--ghost">
        <circle cx={150} cy={32} r={9} />
        <line x1={150} y1={46} x2={150} y2={166} />
        <line x1={150} y1={166} x2={138} y2={190} />
        <line x1={150} y1={166} x2={162} y2={190} />
        <polyline points="136,55 108,50 74,36" />
        <polyline points="164,55 192,50 226,36" />
      </g>
      <g className="exercise-illustration__figure">
        <circle cx={150} cy={32} r={9} />
        <line x1={150} y1={46} x2={150} y2={166} />
        <line x1={150} y1={166} x2={138} y2={190} />
        <line x1={150} y1={166} x2={162} y2={190} />
        <polyline points="136,52 108,44 74,27" />
        <polyline points="164,52 192,44 226,27" />
      </g>
      <CurvedArrow d="M74,36 L74,29" tip={[74, 27]} angleDeg={270} size={7} />
      <CurvedArrow d="M226,36 L226,29" tip={[226, 27]} angleDeg={270} size={7} />
    </Svg>
  );
}

/** 4. Zápěstí: houpání + zvedání dlaní (wrist rocks & palm lifts) — close-up, wrist lifts off the table. */
function WristRocks() {
  return (
    <Svg label="Detail předloktí a dlaně na podložce, zápěstí se zvedá, prsty zůstávají dole">
      <Floor x1={55} x2={245} y={142} />
      <CurvedArrow d="M182,136 L182,119" tip={[182, 117]} angleDeg={270} size={8} />
      <g className="exercise-illustration__figure exercise-illustration__figure--ghost">
        <line x1={242} y1={100} x2={182} y2={138} />
        <circle cx={182} cy={138} r={4} fill="none" />
        <line x1={182} y1={138} x2={108} y2={142} />
      </g>
      <g className="exercise-illustration__figure">
        <line x1={242} y1={100} x2={182} y2={115} />
        <circle cx={182} cy={115} r={4} fill="none" />
        <line x1={182} y1={115} x2={108} y2={140} />
      </g>
    </Svg>
  );
}

/** 5. Stoj u zdi břichem (belly-to-wall hold) — walking the feet up a wall into an inverted hold. */
function WallHoldBelly() {
  return (
    <Svg label="Ze stoje u zdi se nohy vyšlapávají po zdi vzhůru do stoje na rukou zády u zdi">
      <Floor x1={30} x2={270} y={178} />
      <WallVertical x={235} y1={18} y2={178} side="right" />
      <CurvedArrow d="M118,168 Q182,60 224,32" tip={[224, 32]} angleDeg={328} />
      <Figure
        ghost
        head={[110, 50]}
        neck={[110, 62]}
        hip={[110, 112]}
        knee={[110, 146]}
        foot={[110, 178]}
        shoulder={[110, 66]}
        elbow={[112, 90]}
        hand={[114, 113]}
      />
      <Figure
        head={[203, 155]}
        neck={[203, 142]}
        hip={[212, 90]}
        knee={[220, 50]}
        foot={[228, 24]}
        shoulder={[203, 142]}
        elbow={[199, 160]}
        hand={[195, 178]}
      />
    </Svg>
  );
}

/** 6. Most z leže (glute bridge) — hips lift off the floor, shoulders and feet stay planted. */
function GluteBridge() {
  return (
    <Svg label="Leh na zádech, boky se zvedají od země, ramena a chodidla zůstávají na podložce">
      <Floor x1={25} x2={275} y={172} />
      <CurvedArrow d="M140,161 L140,148" tip={[140, 146]} angleDeg={270} size={8} />
      <Figure
        ghost
        head={[50, 158]}
        neck={[75, 163]}
        hip={[140, 163]}
        knee={[190, 150]}
        foot={[220, 172]}
        shoulder={[75, 163]}
        elbow={[58, 166]}
        hand={[42, 168]}
      />
      <Figure
        head={[50, 158]}
        neck={[75, 163]}
        hip={[140, 143]}
        knee={[190, 150]}
        foot={[220, 172]}
        shoulder={[75, 163]}
        elbow={[58, 166]}
        hand={[42, 168]}
      />
    </Svg>
  );
}

/** 7. Hollow hold — shoulders and legs lift into a shallow banana curve, low back glued to the floor. */
function HollowHold() {
  return (
    <Svg label="Leh na zádech, bedra na zemi, ramena a nohy nízko nad zemí v mírném prohnutí">
      <Floor x1={20} x2={280} y={160} />
      <line x1={144} y1={160} x2={156} y2={160} className="exercise-illustration__prop" strokeDasharray="3 3" />
      <CurvedArrow d="M42,148 L40,136" tip={[38, 134]} angleDeg={280} size={7} />
      <CurvedArrow d="M230,156 L230,144" tip={[230, 142]} angleDeg={270} size={7} />
      <Figure
        ghost
        head={[60, 150]}
        neck={[80, 155]}
        hip={[150, 158]}
        knee={[190, 158]}
        foot={[230, 158]}
        shoulder={[80, 155]}
        elbow={[60, 152]}
        hand={[35, 150]}
      />
      <Figure
        head={[60, 138]}
        neck={[80, 144]}
        hip={[150, 158]}
        knee={[190, 148]}
        foot={[230, 140]}
        shoulder={[80, 144]}
        elbow={[58, 138]}
        hand={[33, 133]}
      />
    </Svg>
  );
}

/** 8. Zasouvání brady (chin tucks) — one head, only the chin's protrusion changes: forward (ghost) vs tucked back. */
function ChinTucks() {
  return (
    <Svg label="Detail hlavy a krku, brada se zasouvá vodorovně dozadu, hlava se nezaklání">
      <g className="exercise-illustration__figure exercise-illustration__figure--ghost">
        <line x1={149} y1={118} x2={186} y2={134} strokeDasharray="5 4" />
      </g>
      <CurvedArrow d="M182,122 Q174,116 162,113" tip={[159, 113]} angleDeg={200} size={8} />
      <g className="exercise-illustration__figure">
        <line x1={85} y1={188} x2={115} y2={118} />
        <circle cx={130} cy={100} r={20} />
        <line x1={148} y1={112} x2={156} y2={115} />
      </g>
    </Svg>
  );
}

/** 9. Andělé u zdi (wall angels) — arms slide from a W up to a Y, back kept against the wall. */
function WallAngels() {
  return (
    <Svg label="Stoj zády u zdi, paže se z tvaru W posouvají do tvaru Y podél zdi">
      <Floor x1={60} x2={240} y={178} />
      <rect x={100} y={16} width={100} height={162} rx={4} className="exercise-illustration__surface" />
      <CurvedArrow d="M120,73 Q97,50 87,24" tip={[87, 22]} angleDeg={250} size={8} />
      <CurvedArrow d="M180,73 Q203,50 213,24" tip={[213, 22]} angleDeg={290} size={8} />
      <FrontFigure
        ghost
        showLegs={false}
        head={[150, 40]}
        neck={[150, 58]}
        hip={[150, 120]}
        leftFoot={[135, 178]}
        rightFoot={[165, 178]}
        leftShoulder={[135, 65]}
        leftElbow={[110, 95]}
        leftHand={[120, 75]}
        rightShoulder={[165, 65]}
        rightElbow={[190, 95]}
        rightHand={[180, 75]}
      />
      <FrontFigure
        head={[150, 40]}
        neck={[150, 58]}
        hip={[150, 120]}
        leftFoot={[135, 178]}
        rightFoot={[165, 178]}
        leftShoulder={[135, 65]}
        leftElbow={[110, 45]}
        leftHand={[86, 22]}
        rightShoulder={[165, 65]}
        rightElbow={[190, 45]}
        rightHand={[214, 22]}
      />
    </Svg>
  );
}

/** 10. Protažení prsních svalů ve dveřích (doorway pec stretch) — step through, forearm stays on the frame. */
function DoorwayPecStretch() {
  return (
    <Svg label="Předloktí opřené o zárubeň dveří, krok vpřed skrz dveře otevírá hrudník">
      <Floor x1={30} x2={270} y={178} />
      <line x1={130} y1={20} x2={250} y2={20} className="exercise-illustration__surface" />
      <line x1={130} y1={20} x2={130} y2={178} className="exercise-illustration__surface" />
      <line x1={250} y1={20} x2={250} y2={178} className="exercise-illustration__surface" />
      <CurvedArrow d="M100,113 Q120,106 144,113" tip={[146, 114]} angleDeg={10} size={8} />
      <Figure
        ghost
        showLegs={false}
        head={[90, 45]}
        neck={[90, 60]}
        hip={[90, 120]}
        knee={[90, 150]}
        foot={[90, 178]}
        shoulder={[90, 63]}
        elbow={[130, 63]}
        hand={[130, 30]}
      />
      <Figure
        head={[140, 50]}
        neck={[140, 66]}
        hip={[150, 120]}
        knee={[155, 150]}
        foot={[160, 178]}
        shoulder={[140, 69]}
        elbow={[130, 63]}
        hand={[130, 30]}
      />
    </Svg>
  );
}

export const ILLUSTRATIONS: Record<string, ComponentType> = {
  'shoulder-dislocates': ShoulderDislocates,
  'thoracic-extension': ThoracicExtension,
  'prone-arm-raises': ProneArmRaises,
  'wrist-rocks': WristRocks,
  'wall-hold-belly': WallHoldBelly,
  'glute-bridge': GluteBridge,
  'hollow-hold': HollowHold,
  'chin-tucks': ChinTucks,
  'wall-angels': WallAngels,
  'doorway-pec-stretch': DoorwayPecStretch,
};
