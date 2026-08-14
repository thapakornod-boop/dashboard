"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

// ---- ICONS ----
type IconProps = { size?: number; color?: string };
function IconBase({ size = 18, color, children }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color || "currentColor"} strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}
const Users = (p: IconProps) => (
  <IconBase {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M4 20c0-3 2.2-5 5-5s5 2 5 5" />
    <circle cx="17" cy="9" r="2.3" />
    <path d="M15.3 20c0-2 1-3.8 2.9-4.4" />
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

// ---- THEME ----
const T = {
  blue: "#2F6FE4", blueLight: "#6A9BF2", blueDark: "#173F91",
  blueBg: "#EEF4FE", ink: "#0B1730", sub: "#64748B",
  page: "#F4F7FC", card: "#FFFFFF", border: "#E6EBF4",
  success: "#16A34A", successBg: "#EAF7EF",
  danger: "#DC2626", dangerBg: "#FDECEC",
  slateBg: "#F1F5F9",
};

const fmtBaht = (n: number) =>
  "฿" + new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(n);

// ---- MOCK DATA พนักงานขาย ----
const SALESPEOPLE = [
  {
    id: 1, name: "สมชาย ใจดี", company: "SDO", avatar: "ส",
    target: 2_000_000, actual: 2_350_000, lastYear: 1_980_000,
    deals: 48, topPrincipal: "Principal A",
    monthly: [
      { m: "มี.ค.", v: 380_000 }, { m: "เม.ย.", v: 410_000 },
      { m: "พ.ค.", v: 390_000 }, { m: "มิ.ย.", v: 420_000 },
      { m: "ก.ค.", v: 400_000 }, { m: "ส.ค.", v: 350_000 },
    ],
  },
  {
    id: 2, name: "วิภา รักงาน", company: "PDC", avatar: "ว",
    target: 1_800_000, actual: 1_650_000, lastYear: 1_700_000,
    deals: 35, topPrincipal: "Principal B",
    monthly: [
      { m: "มี.ค.", v: 290_000 }, { m: "เม.ย.", v: 310_000 },
      { m: "พ.ค.", v: 270_000 }, { m: "มิ.ย.", v: 300_000 },
      { m: "ก.ค.", v: 280_000 }, { m: "ส.ค.", v: 200_000 },
    ],
  },
  {
    id: 3, name: "ประเสริฐ มานะ", company: "DC", avatar: "ป",
    target: 1_500_000, actual: 1_580_000, lastYear: 1_420_000,
    deals: 41, topPrincipal: "Principal A",
    monthly: [
      { m: "มี.ค.", v: 240_000 }, { m: "เม.ย.", v: 260_000 },
      { m: "พ.ค.", v: 280_000 }, { m: "มิ.ย.", v: 270_000 },
      { m: "ก.ค.", v: 260_000 }, { m: "ส.ค.", v: 270_000 },
    ],
  },
  {
    id: 4, name: "นารี สดใส", company: "SDO", avatar: "น",
    target: 1_600_000, actual: 1_720_000, lastYear: 1_550_000,
    deals: 39, topPrincipal: "Principal C",
    monthly: [
      { m: "มี.ค.", v: 270_000 }, { m: "เม.ย.", v: 290_000 },
      { m: "พ.ค.", v: 300_000 }, { m: "มิ.ย.", v: 280_000 },
      { m: "ก.ค.", v: 290_000 }, { m: "ส.ค.", v: 290_000 },
    ],
  },
  {
    id: 5, name: "กิตติ เก่งกาจ", company: "PDC", avatar: "ก",
    target: 1_400_000, actual: 1_100_000, lastYear: 1_300_000,
    deals: 28, topPrincipal: "Principal D",
    monthly: [
      { m: "มี.ค.", v: 200_000 }, { m: "เม.ย.", v: 190_000 },
      { m: "พ.ค.", v: 180_000 }, { m: "มิ.ย.", v: 200_000 },
      { m: "ก.ค.", v: 170_000 }, { m: "ส.ค.", v: 160_000 },
    ],
  },
];

const COMPANY_COLORS: Record<string, string> = {
  SDO: T.blue, PDC: "#8B5CF6", DC: "#F59E0B",
};

function pct(a: number, b: number) { return b === 0 ? 0 : (a / b) * 100; }

function TrendChip({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      fontSize: 10.5, fontWeight: 800, padding: "3px 8px",
      borderRadius: 999,
      color: up ? T.success : T.danger,
      background: up ? T.successBg : T.dangerBg,
    }}>
      {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export default function SalesPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const person = selected !== null
    ? SALESPEOPLE.find(s => s.id === selected)
    : null;

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: T.page, color: T.ink,
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans Thai", sans-serif`,
    }}>

      {/* SIDEBAR */}
      <aside style={{
        width: 82, flexShrink: 0,
        background: "rgba(255,255,255,0.96)",
        borderRight: `1px solid ${T.border}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 32,
        padding: "22px 0",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{
          width: 50, height: 50, borderRadius: 999,
          background: `linear-gradient(155deg, ${T.blueLight}, ${T.blue} 60%, ${T.blueDark})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 22px rgba(47,111,228,0.3)",
        }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 14, letterSpacing: -1 }}>R8M</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* ไปหน้า Dashboard */}
          <button
            onClick={() => window.location.href = "/"}
            title="ภาพรวมการขาย"
            style={{
              width: 46, height: 46, borderRadius: 15, border: "none",
              background: T.slateBg, color: T.sub,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
            <LayoutGrid size={20} />
          </button>

          {/* หน้านี้ */}
          <button
            title="ยอดขายรายคน"
            style={{
              width: 46, height: 46, borderRadius: 15, border: "none",
              background: `linear-gradient(145deg, ${T.blue}, ${T.blueDark})`,
              color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(47,111,228,0.3)",
            }}>
            <Users size={20} />
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* HEADER */}
        <header style={{
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${T.border}`,
          padding: "20px 32px",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ fontSize: 11.5, color: T.sub, fontWeight: 700, marginBottom: 4 }}>
            Dashboard / ยอดขายรายคน
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 850, letterSpacing: -0.5 }}>
            ยอดขายรายพนักงาน
          </h1>
          <div style={{ fontSize: 12, color: T.blue, fontWeight: 700, marginTop: 4 }}>
            สิงหาคม 2026
          </div>
        </header>

        <main style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* SUMMARY TOP */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { label: "พนักงานทั้งหมด", value: `${SALESPEOPLE.length} คน`, sub: "ทุกบริษัท" },
              {
                label: "ยอดรวมทั้งหมด",
                value: fmtBaht(SALESPEOPLE.reduce((s, p) => s + p.actual, 0)),
                sub: "MTD สิงหาคม",
              },
              {
                label: "ผ่าน Target",
                value: `${SALESPEOPLE.filter(p => p.actual >= p.target).length} / ${SALESPEOPLE.length} คน`,
                sub: "บรรลุเป้าหมาย",
              },
            ].map(card => (
              <div key={card.label} style={{
                background: T.card, borderRadius: 18, padding: 20,
                border: `1px solid ${T.border}`,
                boxShadow: "0 3px 16px rgba(11,23,48,0.04)",
              }}>
                <div style={{ fontSize: 11, color: T.sub, fontWeight: 700, marginBottom: 8 }}>{card.label}</div>
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{card.value}</div>
                <div style={{ fontSize: 10.5, color: T.sub, marginTop: 4 }}>{card.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1.3fr" : "1fr", gap: 16 }}>

            {/* LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {SALESPEOPLE.map(person => {
                const ratio = pct(person.actual, person.target);
                const growth = pct(person.actual - person.lastYear, person.lastYear);
                const isSelected = selected === person.id;

                return (
                  <div
                    key={person.id}
                    onClick={() => setSelected(isSelected ? null : person.id)}
                    style={{
                      background: isSelected ? T.blueBg : T.card,
                      border: `1.5px solid ${isSelected ? T.blue : T.border}`,
                      borderRadius: 16, padding: "16px 18px",
                      cursor: "pointer",
                      boxShadow: isSelected
                        ? "0 4px 20px rgba(47,111,228,0.12)"
                        : "0 2px 10px rgba(11,23,48,0.04)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      {/* Avatar */}
                      <div style={{
                        width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                        background: COMPANY_COLORS[person.company] || T.blue,
                        color: "#fff", fontWeight: 900, fontSize: 16,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {person.avatar}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                          <strong style={{ fontSize: 13.5 }}>{person.name}</strong>
                          <TrendChip value={growth} />
                        </div>
                        <div style={{ fontSize: 10.5, color: T.sub, marginTop: 2 }}>
                          {person.company} · {person.deals} บิล · {person.topPrincipal}
                        </div>

                        {/* Progress */}
                        <div style={{ marginTop: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, marginBottom: 5 }}>
                            <span style={{ color: T.sub }}>
                              {fmtBaht(person.actual)} / {fmtBaht(person.target)}
                            </span>
                            <strong style={{ color: ratio >= 100 ? T.success : T.ink }}>
                              {ratio.toFixed(0)}%
                            </strong>
                          </div>
                          <div style={{
                            height: 7, background: "#EDF2F8", borderRadius: 999, overflow: "hidden",
                          }}>
                            <div style={{
                              height: "100%",
                              width: `${Math.min(ratio, 100)}%`,
                              borderRadius: 999,
                              background: ratio >= 100
                                ? `linear-gradient(90deg, ${T.success}, #22C55E)`
                                : `linear-gradient(90deg, ${COMPANY_COLORS[person.company]}, ${T.blueLight})`,
                              transition: "width 0.5s ease",
                            }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DETAIL PANEL */}
            {person && (
              <div style={{
                background: T.card, borderRadius: 18, padding: 24,
                border: `1px solid ${T.border}`,
                boxShadow: "0 3px 16px rgba(11,23,48,0.05)",
                alignSelf: "start",
                position: "sticky", top: 100,
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 17,
                    background: COMPANY_COLORS[person.company] || T.blue,
                    color: "#fff", fontWeight: 900, fontSize: 22,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {person.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 900 }}>{person.name}</div>
                    <div style={{ fontSize: 11, color: T.sub, marginTop: 3 }}>
                      {person.company} · Top: {person.topPrincipal}
                    </div>
                  </div>
                </div>

                {/* KPI Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                  {[
                    { label: "ยอดขาย MTD", value: fmtBaht(person.actual) },
                    { label: "Target", value: fmtBaht(person.target) },
                    { label: "ปีก่อน", value: fmtBaht(person.lastYear) },
                    { label: "จำนวนบิล", value: `${person.deals} บิล` },
                  ].map(kpi => (
                    <div key={kpi.label} style={{
                      background: T.slateBg, borderRadius: 12, padding: "12px 14px",
                    }}>
                      <div style={{ fontSize: 10, color: T.sub, fontWeight: 700, marginBottom: 5 }}>{kpi.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 900 }}>{kpi.value}</div>
                    </div>
                  ))}
                </div>

                {/* Monthly Trend */}
                <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12 }}>แนวโน้มยอดขายรายเดือน</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
                  {person.monthly.map(m => {
                    const max = Math.max(...person.monthly.map(x => x.v));
                    const h = (m.v / max) * 100;
                    return (
                      <div key={m.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{
                          width: "100%", height: `${h}%`,
                          background: `linear-gradient(180deg, ${COMPANY_COLORS[person.company]}, ${T.blueLight})`,
                          borderRadius: "4px 4px 0 0",
                          minHeight: 4,
                        }} />
                        <div style={{ fontSize: 9, color: T.sub }}>{m.m}</div>
                      </div>
                    );
                  })}
                </div>

                {/* % vs Target */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
                    <span style={{ color: T.sub }}>% vs Target</span>
                    <strong>{pct(person.actual, person.target).toFixed(1)}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#EDF2F8", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${Math.min(pct(person.actual, person.target), 100)}%`,
                      background: pct(person.actual, person.target) >= 100
                        ? `linear-gradient(90deg, ${T.success}, #22C55E)`
                        : `linear-gradient(90deg, ${COMPANY_COLORS[person.company]}, ${T.blueLight})`,
                      borderRadius: 999,
                    }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}