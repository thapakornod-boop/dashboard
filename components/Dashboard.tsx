"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ---------------------------------------------------------------------------
// ICONS
// ---------------------------------------------------------------------------
type IconProps = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

function IconBase({
  size = 18,
  color,
  style,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {children}
    </svg>
  );
}

const TrendingUp = (p: IconProps) => (
  <IconBase {...p}>
    <polyline points="3,17 9,11 13,15 21,7" />
    <polyline points="14,7 21,7 21,14" />
  </IconBase>
);

const TrendingDown = (p: IconProps) => (
  <IconBase {...p}>
    <polyline points="3,7 9,13 13,9 21,17" />
    <polyline points="14,17 21,17 21,10" />
  </IconBase>
);

const Wallet = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="2" y="6" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <circle cx="17" cy="15" r="1.4" />
  </IconBase>
);

const Receipt = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="5" y="3" width="14" height="18" rx="1" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="13" y2="16" />
  </IconBase>
);

const Building2 = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="4" y="3" width="9" height="18" rx="1" />
    <rect x="15" y="10" width="5" height="11" rx="1" />
    <line x1="7" y1="7" x2="10" y2="7" />
    <line x1="7" y1="11" x2="10" y2="11" />
    <line x1="7" y1="15" x2="10" y2="15" />
    <line x1="17" y1="14" x2="18" y2="14" />
    <line x1="17" y1="17" x2="18" y2="17" />
  </IconBase>
);

const Users = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M4 20c0-3 2.2-5 5-5s5 2 5 5" />
    <circle cx="17" cy="9" r="2.3" />
    <path d="M15.3 20c0-2 1-3.8 2.9-4.4" />
  </IconBase>
);

const ChevronDown = (p: IconProps) => (
  <IconBase {...p}>
    <polyline points="6,9 12,15 18,9" />
  </IconBase>
);

const LayoutGrid = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="8" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
  </IconBase>
);

const Search = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </IconBase>
);

const Calendar = (p: IconProps) => (
  <IconBase {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <line x1="16" y1="2.5" x2="16" y2="6" />
    <line x1="8" y1="2.5" x2="8" y2="6" />
    <line x1="3" y1="9" x2="21" y2="9" />
  </IconBase>
);

const Target = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1.2" />
  </IconBase>
);

// ---------------------------------------------------------------------------
// THEME
// ---------------------------------------------------------------------------
const T = {
  blue: "#2F6FE4",
  blueLight: "#6A9BF2",
  blueSoft: "#CFE0FF",
  blueDark: "#173F91",
  blueBg: "#EEF4FE",
  slate: "#94A3B8",
  slateDark: "#475569",
  slateBg: "#F1F5F9",
  ink: "#0B1730",
  sub: "#64748B",
  page: "#F4F7FC",
  card: "#FFFFFF",
  success: "#16A34A",
  successBg: "#EAF7EF",
  danger: "#DC2626",
  dangerBg: "#FDECEC",
  border: "#E6EBF4",
  orange: "#F59E0B",
  orangeBg: "#FFF7E6",
  purple: "#8B5CF6",
  purpleBg: "#F3EEFF",
};

const PIE_COLORS = [
  T.blue,
  "#5B8DEF",
  "#7CA6F4",
  "#9BBDF7",
  "#B8CEF8",
  "#D1DFFB",
  "#A78BFA",
  "#C4B5FD",
  "#6EE7B7",
  "#34D399",
  "#FCD34D",
  "#FCA5A5",
  "#93C5FD",
  "#86EFAC",
  "#FDA4AF",
  "#F9A8D4",
  "#6CDDEE",
];

const fmtBaht = (n: number) =>
  "฿" +
  new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 0,
  }).format(n);

const fmtNum = (n: number, d = 0) =>
  new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: d,
  }).format(n);

const pct = (actual: number, base: number) =>
  base === 0 ? 0 : (actual / base) * 100;

// ---------------------------------------------------------------------------
// DATA — ข้อมูลจริงจาก Excel (month) | quarter/year รอ Supabase
// ---------------------------------------------------------------------------
const DATA = {
  month: {
    label: "สิงหาคม 2026",
    currentTotal: 129_598_522,
    lastYearTotal: 5500000000,
    baseTotal: 418_304_979,
    lineBill: 8.4,
    bahtBill: 1482,
    target: {
      label: "Target Aug '26",
      target: 418_304_979,
      givMtd: 129_598_522,
      nivMtd: 113_671_842,
      be: 398_677_308,
    },
    trend: [
      { m: "มิ.ย.", v: 506.0 },
      { m: "ก.ค.", v: 462.7 },
      { m: "ส.ค.", v: 129.6 },
    ],
    companySales: [
      { company: "SDO", lastYear: 4_200_000, current: 70_361_019 },
      { company: "PDC", lastYear: 3_600_000, current: 34_266_213 },
      { company: "DC",  lastYear: 3_050_000, current: 24_971_290 },
    ],
    principals: [
      { name: "P&G", value: 70_361_019 },
      { name: "MDL", value: 12_087_687 },
      { name: "FNT", value: 9_491_642  },
      { name: "DUM", value: 8_614_526  },
      { name: "RB1", value: 4_684_041  },
      { name: "JDE", value: 4_116_478  },
      { name: "NIS", value: 3_889_802  },
      { name: "OSP", value: 3_550_768  },
      { name: "AST", value: 2_766_568  },
      { name: "SCJ", value: 2_067_221  },
      { name: "CAS", value: 1_855_161  },
      { name: "GLI", value: 1_523_753  },
      { name: "GON", value: 1_321_610  },
      { name: "KHA", value: 805_333    },
      { name: "SCO", value: 727_288    },
      { name: "PRA", value: 183_919    },
      { name: "NES", value: 79_288     },
    ],
    givByCompany: [
      { company: "SDO", base: 208_125_893, actual: 70_361_019 },
      { company: "PDC", base: 146_031_836, actual: 34_266_213 },
      { company: "DC",  base: 123_836_253, actual: 24_971_290 },
    ],
    nivByCompany: [
      { company: "SDO", base: 171_320_748, actual: 60_089_155 },
      { company: "PDC", base: 136_694_592, actual: 31_144_703 },
      { company: "DC",  base: 116_823_041, actual: 22_437_983 },
    ],
    givNivByCompany: [
      { company: "SDO", GIV: 70_361_019, NIV: 60_089_155 },
      { company: "PDC", GIV: 34_266_213, NIV: 31_144_703 },
      { company: "DC",  GIV: 24_971_290, NIV: 22_437_983 },
    ],
  },

  // รอข้อมูลจาก Supabase
  quarter: {
    label: "มิ.ย. - ส.ค. 2026",
    currentTotal: 1_098_354_437,
    lastYearTotal: 31_480_000,
    baseTotal: 34_500_000,
    lineBill: 8.7,
    bahtBill: 1518,
    target: {
      label: "Target Jun–Aug '26",
      target: 34_500_000,
      givMtd: 1_098_354_437,
      nivMtd: 32_450_000,
      be: 33_200_000,
    },
    trend: [
      { m: "มิ.ย.", v: 506.0 },
      { m: "ก.ค.", v: 462.7 },
      { m: "ส.ค.", v: 129.6 },
    ],
    companySales: [
      { company: "SDO", lastYear: 12_100_000, current: 14_020_000 },
      { company: "PDC", lastYear: 10_450_000, current: 12_050_000 },
      { company: "DC",  lastYear: 8_930_000,  current: 9_850_000  },
    ],
    principals: [
      { name: "P&G", value: 70_361_019 },
      { name: "MDL", value: 12_087_687 },
      { name: "FNT", value: 9_491_642  },
      { name: "DUM", value: 8_614_526  },
      { name: "RB1", value: 4_684_041  },
      { name: "JDE", value: 4_116_478  },
    ],
    givByCompany: [
      { company: "SDO", base: 13_000_000, actual: 14_020_000 },
      { company: "PDC", base: 12_000_000, actual: 12_050_000 },
      { company: "DC",  base: 9_500_000,  actual: 9_850_000  },
    ],
    nivByCompany: [
      { company: "SDO", base: 11_400_000, actual: 12_200_000 },
      { company: "PDC", base: 10_100_000, actual: 10_450_000 },
      { company: "DC",  base: 8_000_000,  actual: 7_850_000  },
    ],
    givNivByCompany: [
      { company: "SDO", GIV: 14_020_000, NIV: 12_200_000 },
      { company: "PDC", GIV: 12_050_000, NIV: 10_450_000 },
      { company: "DC",  GIV: 9_850_000,  NIV: 7_850_000  },
    ],
  },

  // รอข้อมูลจาก Supabase
  year: {
    label: "ม.ค. - ส.ค. 2026",
    currentTotal: 98_650_000,
    lastYearTotal: 88_200_000,
    baseTotal: 94_000_000,
    lineBill: 8.9,
    bahtBill: 1536,
    target: {
      label: "Target Jan–Aug '26",
      target: 94_000_000,
      givMtd: 98_650_000,
      nivMtd: 84_550_000,
      be: 91_200_000,
    },
    trend: [
      { m: "ม.ค.", v: 10.4 },
      { m: "ก.พ.", v: 11.1 },
      { m: "มี.ค.", v: 11.6 },
      { m: "เม.ย.", v: 11.9 },
      { m: "พ.ค.", v: 12.2 },
      { m: "มิ.ย.", v: 506.0 },
      { m: "ก.ค.", v: 462.7 },
      { m: "ส.ค.", v: 129.6 },
    ],
    companySales: [
      { company: "SDO", lastYear: 34_800_000, current: 39_200_000 },
      { company: "PDC", lastYear: 29_100_000, current: 34_650_000 },
      { company: "DC",  lastYear: 24_300_000, current: 24_800_000 },
    ],
    principals: [
      { name: "P&G", value: 70_361_019 },
      { name: "MDL", value: 12_087_687 },
      { name: "FNT", value: 9_491_642  },
      { name: "DUM", value: 8_614_526  },
      { name: "RB1", value: 4_684_041  },
      { name: "JDE", value: 4_116_478  },
    ],
    givByCompany: [
      { company: "SDO", base: 37_000_000, actual: 39_200_000 },
      { company: "PDC", base: 33_000_000, actual: 34_650_000 },
      { company: "DC",  base: 24_000_000, actual: 24_800_000 },
    ],
    nivByCompany: [
      { company: "SDO", base: 32_000_000, actual: 34_100_000 },
      { company: "PDC", base: 28_000_000, actual: 29_600_000 },
      { company: "DC",  base: 21_000_000, actual: 20_850_000 },
    ],
    givNivByCompany: [
      { company: "SDO", GIV: 39_200_000, NIV: 34_100_000 },
      { company: "PDC", GIV: 34_650_000, NIV: 29_600_000 },
      { company: "DC",  GIV: 24_800_000, NIV: 20_850_000 },
    ],
  },
} as const;

type PeriodId = keyof typeof DATA;

// ---------------------------------------------------------------------------
// SMALL COMPONENTS
// ---------------------------------------------------------------------------
function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div
      className="logo-mark"
      style={{ width: size, height: size, borderRadius: 999 }}
    >
      <span style={{ fontSize: size * 0.39 }}>R8M</span>
    </div>
  );
}

function TrendChip({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <div
      className="trend-chip"
      style={{
        color: up ? T.success : T.danger,
        background: up ? T.successBg : T.dangerBg,
      }}
    >
      {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
      {Math.abs(value).toFixed(1)}%
    </div>
  );
}

function SectionTitle({
  children,
  sub,
  icon,
}: {
  children: ReactNode;
  sub?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="section-title">
      {icon && <div className="section-icon">{icon}</div>}
      <div>
        <div className="section-heading">{children}</div>
        {sub && <div className="section-sub">{sub}</div>}
      </div>
    </div>
  );
}

function Panel({
  children,
  style,
  className = "",
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div className={`panel ${className}`} style={style}>
      {children}
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="tooltip-row">
          <span>{p.name}</span>
          <strong>{fmtBaht(Number(p.value))}</strong>
        </div>
      ))}
    </div>
  );
}

function ExecutiveTargetCard({
  title,
  value,
  target,
  icon,
  accent = T.blue,
  suffix,
}: {
  title: string;
  value: number;
  target?: number;
  icon: ReactNode;
  accent?: string;
  suffix?: string;
}) {
  const ratio = target ? pct(value, target) : 0;
  const positive = ratio >= 100;

  return (
    <div className="exec-card">
      <div className="exec-card-top">
        <div
          className="exec-icon"
          style={{ color: accent, background: `${accent}14` }}
        >
          {icon}
        </div>
        {target !== undefined && <TrendChip value={ratio - 100} />}
      </div>
      <div className="exec-label">{title}</div>
      <div className="exec-value">{suffix || fmtBaht(value)}</div>
      {target !== undefined && (
        <>
          <div className="exec-target-line">
            <span>Target</span>
            <strong>{fmtBaht(target)}</strong>
          </div>
          <div className="exec-progress">
            <div
              className="exec-progress-fill"
              style={{
                width: `${Math.min(ratio, 100)}%`,
                background: positive
                  ? `linear-gradient(90deg, ${accent}, #22C55E)`
                  : `linear-gradient(90deg, ${accent}, ${T.blueLight})`,
              }}
            />
            <div className="exec-target-marker" style={{ left: "100%" }} />
          </div>
        </>
      )}
    </div>
  );
}

function ExecutiveTargetSection({
  target,
}: {
  target: {
    label: string;
    target: number;
    givMtd: number;
    nivMtd: number;
    be: number;
  };
}) {
  const beVsTarget = pct(target.be, target.target);

  return (
    <div className="executive-section">
      <div className="executive-heading">
        <div>
          <div className="executive-title">Target & MTD Performance</div>
          <div className="executive-sub">
            มุมมองสำหรับผู้บริหาร — เปรียบเทียบเป้าหมายกับผลการดำเนินงานจริง
          </div>
        </div>
        <div className="executive-period">{target.label}</div>
      </div>

      <div className="executive-grid">
        <ExecutiveTargetCard
          title="Target"
          value={target.target}
          icon={<Target size={18} />}
          accent={T.orange}
        />
        <ExecutiveTargetCard
          title="ยอดขาย GIV MTD"
          value={target.givMtd}
          target={target.target}
          icon={<TrendingUp size={18} />}
          accent={T.blue}
        />
        <ExecutiveTargetCard
          title="ยอดขาย NIV MTD"
          value={target.nivMtd}
          target={target.target}
          icon={<Wallet size={18} />}
          accent={T.purple}
        />
        <ExecutiveTargetCard
          title="BE"
          value={target.be}
          target={target.target}
          icon={<Target size={18} />}
          accent={T.success}
        />
        <div className="exec-card be-card">
          <div className="exec-card-top">
            <div
              className="exec-icon"
              style={{ color: T.success, background: T.successBg }}
            >
              <TrendingUp size={18} />
            </div>
            <div
              className="be-status"
              style={{
                color: beVsTarget >= 100 ? T.success : T.danger,
                background: beVsTarget >= 100 ? T.successBg : T.dangerBg,
              }}
            >
              {beVsTarget >= 100 ? "ผ่าน Target" : "ต่ำกว่า Target"}
            </div>
          </div>
          <div className="exec-label">% BE vs Target</div>
          <div className="exec-value">{beVsTarget.toFixed(1)}%</div>
          <div className="exec-target-line">
            <span>BE</span>
            <strong>{fmtBaht(target.be)}</strong>
          </div>
          <div className="exec-progress">
            <div
              className="exec-progress-fill"
              style={{
                width: `${Math.min(beVsTarget, 100)}%`,
                background:
                  beVsTarget >= 100
                    ? `linear-gradient(90deg, ${T.success}, #22C55E)`
                    : `linear-gradient(90deg, ${T.orange}, #FBBF24)`,
              }}
            />
            <div className="exec-target-marker" style={{ left: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BaseVsActualCard({
  title,
  data,
  accent,
  subtitle,
}: {
  title: string;
  data: readonly { company: string; base: number; actual: number }[];
  accent: string;
  subtitle: string;
}) {
  const totalBase = data.reduce((s, d) => s + d.base, 0);
  const totalActual = data.reduce((s, d) => s + d.actual, 0);
  const overallPct = pct(totalActual, totalBase);

  return (
    <Panel>
      <div className="base-card-head">
        <div>
          <div className="base-title">{title}</div>
          <div className="base-subtitle">{subtitle}</div>
        </div>
        <div className="mini-ring-wrap">
          <div
            className="mini-ring"
            style={{
              background: `conic-gradient(${accent} ${Math.min(overallPct, 100)}%, ${T.slateBg} 0)`,
            }}
          >
            <div className="mini-ring-inner">{overallPct.toFixed(0)}%</div>
          </div>
        </div>
      </div>

      <div className="base-total">
        <strong>{fmtBaht(totalActual)}</strong>
        <span>/ {fmtBaht(totalBase)} Base</span>
      </div>

      <div className="base-list">
        {data.map((d) => {
          const progress = pct(d.actual, d.base);
          const over = progress >= 100;
          return (
            <div key={d.company} className="base-item">
              <div className="base-item-top">
                <span>{d.company}</span>
                <strong style={{ color: over ? T.success : T.ink }}>
                  {progress.toFixed(0)}%
                </strong>
              </div>
              <div className="base-progress">
                <div
                  className="base-progress-fill"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: `linear-gradient(90deg, ${accent}, ${T.blueLight})`,
                  }}
                />
                <div className="base-target-marker" title="Base 100%" />
              </div>
              <div className="base-item-bottom">
                <span>{fmtBaht(d.actual)}</span>
                <span>Base {fmtBaht(d.base)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------------------
// MAIN DASHBOARD
// ---------------------------------------------------------------------------
export default function Dashboard() {
  const [period, setPeriod] = useState<PeriodId>("month");
  const data = DATA[period];

  const growthPct = useMemo(
    () => pct(data.currentTotal - data.lastYearTotal, data.lastYearTotal),
    [data]
  );

  const basePct = useMemo(
    () => pct(data.currentTotal, data.baseTotal),
    [data]
  );

  const principalTotal = useMemo(
    () => data.principals.reduce((sum, item) => sum + item.value, 0),
    [data]
  );

  const periodButtons: { id: PeriodId; label: string }[] = [
    { id: "month", label: "รายเดือน" },
    { id: "quarter", label: "3 เดือนย้อนหลัง" },
    { id: "year", label: "รายปี" },
  ];

  return (
    <div className="shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <LogoMark size={50} />
        <nav className="side-nav">
          <button className="side-btn active" title="ภาพรวมการขาย">
            <LayoutGrid size={20} />
          </button>
          <button
            className="side-btn"
            title="ยอดขายรายคน"
            onClick={() => (window.location.href = "/sales")}
          >
            <Users size={20} />
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">
        <header className="header">
          <div>
            <div className="crumb">Dashboard / ภาพรวมการขาย</div>
            <h1 className="title">ภาพรวมยอดขาย</h1>
            <div className="header-period">{data.label}</div>
          </div>
          <div className="header-actions">
            <div className="search">
              <Search size={15} color={T.sub} />
              <input placeholder="ค้นหาบริษัท, Principal..." />
            </div>
            <div className="user-box">
              <div className="avatar">RSM</div>
              <div className="user-text">
                <strong>R8M Group</strong>
                <span>Sales Dashboard</span>
              </div>
            </div>
          </div>
        </header>

        <main className="content">
          {/* PERIOD FILTER */}
          <div className="toolbar">
            <div>
              <div className="toolbar-title">ช่วงเวลาข้อมูล</div>
              <div className="toolbar-sub">เลือกมุมมองที่ต้องการดู</div>
            </div>
            <div className="toolbar-right">
              <div className="pill-group">
                {periodButtons.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPeriod(item.id)}
                    className={`pill ${period === item.id ? "pill-active" : ""}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button className="date-btn">
                <Calendar size={15} />
                {data.label}
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          {/* EXECUTIVE TARGET */}
          <ExecutiveTargetSection target={data.target} />

          {/* KPI GRID */}
          <div className="kpi-grid">
            <div className="panel hero">
              <div className="hero-glow hero-glow-one" />
              <div className="hero-glow hero-glow-two" />
              <div className="hero-top">
                <div className="hero-icon">
                  <Wallet size={20} />
                </div>
                <TrendChip value={growthPct} />
              </div>
              <div className="hero-label">ยอดขายปัจจุบัน (GIV)</div>
              <div className="hero-value">{fmtBaht(data.currentTotal)}</div>
              <div className="hero-sub">
                เทียบปีก่อน {fmtBaht(data.lastYearTotal)}
              </div>
              <div className="hero-spark">
                <ResponsiveContainer width="100%" height={58}>
                  <LineChart data={[...data.trend]}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#fff"
                      strokeWidth={2.6}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="panel kpi">
              <div className="kpi-icon" style={{ color: T.slateDark, background: T.slateBg }}>
                <TrendingUp size={18} />
              </div>
              <div className="kpi-label">ยอดขายปีก่อน</div>
              <div className="kpi-value">{fmtBaht(data.lastYearTotal)}</div>
              <div className="kpi-sub">ช่วงเวลาเดียวกันของปีก่อน</div>
            </div>

            <div className="panel kpi">
              <div className="kpi-icon" style={{ color: T.blue, background: T.blueBg }}>
                <Receipt size={18} />
              </div>
              <div className="kpi-label">Line / Bill</div>
              <div className="kpi-value">{fmtNum(data.lineBill, 1)}</div>
              <div className="kpi-sub">รายการเฉลี่ยต่อบิล</div>
            </div>

            <div className="panel kpi">
              <div className="kpi-icon" style={{ color: T.blueDark, background: T.blueBg }}>
                <Wallet size={18} />
              </div>
              <div className="kpi-label">Baht / Bill</div>
              <div className="kpi-value">{fmtBaht(data.bahtBill)}</div>
              <div className="kpi-sub">มูลค่าเฉลี่ยต่อบิล</div>
            </div>

            <div className="panel kpi">
              <div className="kpi-icon" style={{ color: T.orange, background: T.orangeBg }}>
                <Target size={18} />
              </div>
              <div className="kpi-label">ยอดขายปัจจุบัน vs Base</div>
              <div className="kpi-value">{basePct.toFixed(1)}%</div>
              <div className="kpi-sub">
                {fmtBaht(data.currentTotal)} / {fmtBaht(data.baseTotal)}
              </div>
            </div>

            <div className="panel kpi">
              <div className="kpi-icon" style={{ color: T.purple, background: T.purpleBg }}>
                <Users size={18} />
              </div>
              <div className="kpi-label">ยอดขายรวมราย Principal</div>
              <div className="kpi-value">{fmtBaht(principalTotal)}</div>
              <div className="kpi-sub">{data.principals.length} Principal</div>
            </div>
          </div>

          {/* TREND + COMPANY SALES */}
          <div className="two-col">
            <Panel>
              <SectionTitle
                icon={<TrendingUp size={16} />}
                sub="แนวโน้มยอดขายตามช่วงเวลาที่เลือก (ล้านบาท)"
              >
                แนวโน้มยอดขาย
              </SectionTitle>
              <div className="chart-wrap">
                <ResponsiveContainer width="100%" height={265}>
                  <LineChart
                    data={[...data.trend]}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                    <XAxis
                      dataKey="m"
                      tick={{ fontSize: 12, fill: T.sub }}
                      axisLine={{ stroke: T.border }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: T.sub }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `${v}M`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        return (
                          <div className="custom-tooltip">
                            <div className="tooltip-label">{label}</div>
                            <div className="tooltip-row">
                              <span>ยอดขาย</span>
                              <strong>{payload[0].value} M</strong>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="v"
                      name="ยอดขาย"
                      stroke={T.blue}
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel>
              <SectionTitle
                icon={<Building2 size={16} />}
                sub="SDO / PDC / DC — ปัจจุบันเทียบกับปีก่อน"
              >
                ยอดขายรายบริษัท
              </SectionTitle>
              <ResponsiveContainer width="100%" height={265}>
                <BarChart data={[...data.companySales]} barGap={7}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                  <XAxis
                    dataKey="company"
                    tick={{ fontSize: 12, fill: T.sub }}
                    axisLine={{ stroke: T.border }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: T.sub }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v / 1e6}M`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: T.blueBg }} />
                  <Bar dataKey="lastYear" name="ปีก่อน" fill={T.slate} radius={[7, 7, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="current" name="ปัจจุบัน" fill={T.blue} radius={[7, 7, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
              <div className="legend">
                <span><i style={{ background: T.slate }} />ปีก่อน</span>
                <span><i style={{ background: T.blue }} />ปัจจุบัน</span>
              </div>
            </Panel>
          </div>

          {/* PRINCIPAL PIE + COMPANY DETAIL */}
          <div className="two-col">
            <Panel>
              <SectionTitle
                icon={<Users size={16} />}
                sub="สัดส่วนยอดขายของแต่ละ Principal"
              >
                ยอดขายราย Principal
              </SectionTitle>
              <div className="pie-layout">
                <ResponsiveContainer width="55%" height={285}>
                  <PieChart>
                    <Pie
                      data={[...data.principals]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={105}
                      paddingAngle={2}
                      stroke="#fff"
                      strokeWidth={3}
                    >
                      {data.principals.map((item, index) => (
                        <Cell key={item.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-center-list">
                  {data.principals.map((item, index) => {
                    const share = pct(item.value, principalTotal);
                    return (
                      <div className="principal-row" key={item.name}>
                        <div className="principal-name">
                          <i style={{ background: PIE_COLORS[index % PIE_COLORS.length] }} />
                          <span>{item.name}</span>
                        </div>
                        <strong>{share.toFixed(1)}%</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>

            <Panel>
              <SectionTitle
                icon={<Building2 size={16} />}
                sub="ยอดขายปัจจุบันแยกตาม SDO / PDC / DC"
              >
                รายละเอียดบริษัท
              </SectionTitle>
              <div className="company-list">
                {data.companySales.map((company) => {
                  const growth = pct(company.current - company.lastYear, company.lastYear);
                  return (
                    <div className="company-row" key={company.company}>
                      <div className="company-avatar">{company.company.slice(0, 1)}</div>
                      <div className="company-main">
                        <div className="company-row-top">
                          <strong>{company.company}</strong>
                          <TrendChip value={growth} />
                        </div>
                        <div className="company-values">
                          <span>ปัจจุบัน <b>{fmtBaht(company.current)}</b></span>
                          <span>ปีก่อน {fmtBaht(company.lastYear)}</span>
                        </div>
                        <div className="progress-track company-progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${Math.min(pct(company.current, company.lastYear), 140) / 1.4}%`,
                              background: T.blue,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </div>

          {/* GIV / NIV VS BASE */}
          <div>
            <SectionTitle
              icon={<Target size={16} />}
              sub="เปรียบเทียบยอดขายปัจจุบันกับ Base แยกตามบริษัท"
            >
              ยอดขายปัจจุบัน vs Base
            </SectionTitle>
            <div className="two-col base-grid">
              <BaseVsActualCard
                title="GIV"
                subtitle="Gross Invoice Value"
                data={[...data.givByCompany]}
                accent={T.blue}
              />
              <BaseVsActualCard
                title="NIV"
                subtitle="Net Invoice Value"
                data={[...data.nivByCompany]}
                accent={T.purple}
              />
            </div>
          </div>

          {/* GIV / NIV BY COMPANY BAR */}
          <Panel>
            <SectionTitle
              icon={<Building2 size={16} />}
              sub="เปรียบเทียบ GIV และ NIV ของแต่ละบริษัท"
            >
              ยอดขายแต่ละบริษัท — GIV / NIV
            </SectionTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[...data.givNivByCompany]} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                <XAxis
                  dataKey="company"
                  tick={{ fontSize: 12, fill: T.sub }}
                  axisLine={{ stroke: T.border }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: T.sub }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1e6}M`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: T.blueBg }} />
                <Bar dataKey="GIV" name="GIV" fill={T.blue} radius={[8, 8, 0, 0]} maxBarSize={38} />
                <Bar dataKey="NIV" name="NIV" fill={T.purple} radius={[8, 8, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
            <div className="legend">
              <span><i style={{ background: T.blue }} />GIV</span>
              <span><i style={{ background: T.purple }} />NIV</span>
            </div>
          </Panel>

          {/* SUMMARY */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-label">ยอดขาย GIV</div>
              <div className="summary-value">{fmtBaht(data.currentTotal)}</div>
              <TrendChip value={growthPct} />
            </div>
            <div className="summary-card">
              <div className="summary-label">Target</div>
              <div className="summary-value">{fmtBaht(data.baseTotal)}</div>
              <span className="summary-note">เป้าหมายช่วงเวลา</span>
            </div>
            <div className="summary-card">
              <div className="summary-label">GIV รวม</div>
              <div className="summary-value">
                {fmtBaht(data.givNivByCompany.reduce((s, d) => s + d.GIV, 0))}
              </div>
              <span className="summary-note">Gross Invoice Value</span>
            </div>
            <div className="summary-card">
              <div className="summary-label">NIV รวม</div>
              <div className="summary-value">
                {fmtBaht(data.givNivByCompany.reduce((s, d) => s + d.NIV, 0))}
              </div>
              <span className="summary-note">Net Invoice Value</span>
            </div>
          </div>

          <div className="foot-note">
            ข้อมูลจริง: สิงหาคม 2026 | quarter / year รอเชื่อม Supabase
          </div>
        </main>
      </div>
    </div>
  );
}