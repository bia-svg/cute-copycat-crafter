import jsPDF from "jspdf";
import "jspdf-autotable";

// Extend jsPDF with autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

const COLORS = {
  primary: [37, 99, 235] as [number, number, number],
  dark: [17, 24, 39] as [number, number, number],
  gray: [107, 114, 128] as [number, number, number],
  lightGray: [243, 244, 246] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  amber: [245, 158, 11] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
};

function addHeader(doc: jsPDF, title: string, subtitle: string) {
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, 16);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(subtitle, 14, 24);
  doc.setTextColor(...COLORS.dark);
}

function addSectionTitle(doc: jsPDF, y: number, title: string): number {
  if (y > 260) {
    doc.addPage();
    y = 20;
  }
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text(title, 14, y);
  doc.setTextColor(...COLORS.dark);
  return y + 8;
}

function addFooter(doc: jsPDF) {
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.gray);
    doc.text(`david-j-woods.com · Page ${i}/${pages}`, 14, 290);
    doc.text(new Date().toLocaleDateString("de-DE"), 196, 290, { align: "right" });
  }
}

export function exportSEOReport(report: any, gscTotals: any) {
  const doc = new jsPDF();
  addHeader(doc, "SEO Strategy Report", "david-j-woods.com · AI-Powered Analysis");

  let y = 42;

  // Summary
  if (report.summary) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(report.summary, 182);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 6;
  }

  // GSC Totals
  if (gscTotals) {
    y = addSectionTitle(doc, y, "Search Console Overview");
    doc.autoTable({
      startY: y,
      head: [["Metric", "Value"]],
      body: [
        ["Search Clicks", gscTotals.clicks?.toLocaleString() || "—"],
        ["Impressions", gscTotals.impressions?.toLocaleString() || "—"],
        ["Avg CTR", gscTotals.ctr ? `${(gscTotals.ctr * 100).toFixed(1)}%` : "—"],
        ["Avg Position", gscTotals.position?.toFixed(1) || "—"],
      ],
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Quick Wins
  if (report.quickWins?.length > 0) {
    y = addSectionTitle(doc, y, "Quick Wins");
    doc.autoTable({
      startY: y,
      head: [["Keyword", "Position", "Impressions", "CTR", "Action"]],
      body: report.quickWins.map((qw: any) => [
        qw.keyword, `#${qw.currentPosition}`, qw.impressions?.toLocaleString(),
        `${(qw.ctr * 100).toFixed(1)}%`, qw.action,
      ]),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      columnStyles: { 4: { cellWidth: 60 } },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Recommendations
  if (report.recommendations?.length > 0) {
    y = addSectionTitle(doc, y, "Recommendations");
    doc.autoTable({
      startY: y,
      head: [["Priority", "Action", "Expected Result", "Effort"]],
      body: report.recommendations.map((r: any) => [
        `#${r.priority}`, r.action, r.expectedResult, r.effort,
      ]),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      columnStyles: { 1: { cellWidth: 55 }, 2: { cellWidth: 55 } },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Content Gaps
  if (report.contentGaps?.length > 0) {
    y = addSectionTitle(doc, y, "Content Gaps");
    doc.autoTable({
      startY: y,
      head: [["Topic", "Reasoning", "Suggested Approach"]],
      body: report.contentGaps.map((cg: any) => [cg.topic, cg.reasoning, cg.suggestedApproach]),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // New Pages
  if (report.newPages?.length > 0) {
    y = addSectionTitle(doc, y, "Suggested New Pages");
    doc.autoTable({
      startY: y,
      head: [["URL", "Title", "Target Keywords", "Est. Traffic"]],
      body: report.newPages.map((p: any) => [
        p.suggestedUrl, p.title, p.targetKeywords?.join(", "), p.estimatedTraffic,
      ]),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
    });
  }

  addFooter(doc);
  doc.save(`SEO-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportCompetitionReport(analysis: any) {
  const doc = new jsPDF();
  addHeader(doc, "Competitor Analysis Report", "david-j-woods.com · AI-Powered Market Intelligence");

  let y = 42;

  // Summary
  if (analysis.summary) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(analysis.summary, 182);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 6;
  }

  // Competitors
  if (analysis.competitors?.length > 0) {
    y = addSectionTitle(doc, y, `Competitors (${analysis.competitors.length})`);
    doc.autoTable({
      startY: y,
      head: [["Name", "Website", "Location", "Threat", "Session Price", "Seminar Price"]],
      body: analysis.competitors.map((c: any) => [
        c.name, c.website, `${c.city}, ${c.country}`,
        c.threatLevel?.toUpperCase(),
        c.pricing?.sessionPrice || "—",
        c.pricing?.seminarPrice || "—",
      ]),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
      didParseCell: (data: any) => {
        if (data.column.index === 3 && data.section === "body") {
          const val = data.cell.raw?.toLowerCase();
          if (val === "high") data.cell.styles.textColor = COLORS.red;
          else if (val === "medium") data.cell.styles.textColor = COLORS.amber;
          else if (val === "low") data.cell.styles.textColor = COLORS.green;
        }
      },
    });
    y = doc.lastAutoTable.finalY + 8;

    // Strengths/Weaknesses per competitor
    for (const comp of analysis.competitors) {
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(comp.name, 14, y);
      y += 5;

      if (comp.sharedKeywords?.length > 0) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...COLORS.gray);
        const kwLine = `Keywords: ${comp.sharedKeywords.join(", ")}`;
        const kwLines = doc.splitTextToSize(kwLine, 182);
        doc.text(kwLines, 14, y);
        y += kwLines.length * 4 + 2;
        doc.setTextColor(...COLORS.dark);
      }

      const details: string[][] = [];
      comp.strengths?.forEach((s: string) => details.push(["✓ Strength", s]));
      comp.weaknesses?.forEach((w: string) => details.push(["✗ Weakness", w]));

      if (details.length > 0) {
        doc.autoTable({
          startY: y,
          body: details,
          theme: "plain",
          bodyStyles: { fontSize: 8 },
          columnStyles: { 0: { cellWidth: 28, fontStyle: "bold" } },
          margin: { left: 14, right: 14 },
          didParseCell: (data: any) => {
            if (data.column.index === 0 && data.section === "body") {
              if (data.cell.raw?.startsWith("✓")) data.cell.styles.textColor = COLORS.green;
              else data.cell.styles.textColor = COLORS.red;
            }
          },
        });
        y = doc.lastAutoTable.finalY + 6;
      }
    }
  }

  // Pricing Benchmarks
  if (analysis.pricingBenchmarks) {
    y = addSectionTitle(doc, y, "Market Pricing Benchmarks");
    const pb = analysis.pricingBenchmarks;
    doc.autoTable({
      startY: y,
      head: [["Service", "Min", "Average", "Max"]],
      body: [
        ["Session", pb.sessionRange?.min, pb.sessionRange?.average, pb.sessionRange?.max],
        ["Seminar", pb.seminarRange?.min, pb.seminarRange?.average, pb.seminarRange?.max],
        ["Training/Ausbildung", pb.trainingRange?.min, pb.trainingRange?.average, pb.trainingRange?.max],
      ].map(row => row.map(v => v || "—")),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Market Gaps
  if (analysis.marketGaps?.length > 0) {
    y = addSectionTitle(doc, y, "Market Gaps & Opportunities");
    doc.autoTable({
      startY: y,
      head: [["Gap", "Opportunity", "Difficulty"]],
      body: analysis.marketGaps.map((g: any) => [g.gap, g.opportunity, g.difficulty]),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
    });
    y = doc.lastAutoTable.finalY + 10;
  }

  // Content Strategies
  if (analysis.contentStrategies?.length > 0) {
    y = addSectionTitle(doc, y, "Competitor Content Strategies");
    doc.autoTable({
      startY: y,
      head: [["Strategy", "Used By", "Effectiveness"]],
      body: analysis.contentStrategies.map((cs: any) => [
        cs.strategy, cs.usedBy?.join(", "), cs.effectiveness,
      ]),
      theme: "grid",
      headStyles: { fillColor: COLORS.primary, fontSize: 8 },
      bodyStyles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
    });
  }

  addFooter(doc);
  doc.save(`Competition-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportWeeklyReport(
  weeklyData: { weekLabel: string; sessions: number; spend: number; leads: number; cpl: number; avgPosition: number }[],
  totals: { sessions: number; spend: number; leads: number; cpl: number; avgPosition: number },
  aiAnalysis: string | null,
  dateRange: { startDate: string; endDate: string }
) {
  const doc = new jsPDF();
  addHeader(doc, "Weekly Performance Report", `david-j-woods.com · ${dateRange.startDate} → ${dateRange.endDate}`);

  let y = 42;

  // Weekly table
  y = addSectionTitle(doc, y, "Weekly Metrics");
  doc.autoTable({
    startY: y,
    head: [["Week", "Sessions", "Investment (CHF)", "Leads", "CPL (CHF)", "Avg Position"]],
    body: [
      ...weeklyData.map(w => [
        w.weekLabel,
        String(w.sessions),
        w.spend > 0 ? `CHF ${w.spend.toLocaleString()}` : "—",
        String(w.leads),
        w.cpl > 0 ? `CHF ${w.cpl.toLocaleString()}` : "—",
        w.avgPosition > 0 ? String(w.avgPosition) : "—",
      ]),
      [
        "TOTAL / AVG",
        String(totals.sessions),
        totals.spend > 0 ? `CHF ${totals.spend.toLocaleString()}` : "—",
        String(totals.leads),
        totals.cpl > 0 ? `CHF ${totals.cpl.toLocaleString()}` : "—",
        totals.avgPosition > 0 ? String(totals.avgPosition) : "—",
      ],
    ],
    theme: "grid",
    headStyles: { fillColor: COLORS.primary, fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 14, right: 14 },
    didParseCell: (data: any) => {
      // Bold the totals row
      if (data.section === "body" && data.row.index === weeklyData.length) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = COLORS.lightGray;
      }
    },
  });
  y = doc.lastAutoTable.finalY + 10;

  // AI Analysis
  if (aiAnalysis) {
    y = addSectionTitle(doc, y, "AI Performance Analysis");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(aiAnalysis, 182);
    if (y + lines.length * 4 > 275) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines, 14, y);
  }

  addFooter(doc);
  doc.save(`Weekly-Report-${dateRange.startDate}-to-${dateRange.endDate}.pdf`);
}
