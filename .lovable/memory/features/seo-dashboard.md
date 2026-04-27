---
name: seo-dashboard
description: Aba SEO completa no /dashboard com Top Pages, Quick Wins automáticos, distribuição de posições, país/dispositivo e histórico semanal
type: feature
---
A aba SEO do dashboard inclui:
- Totais (Clicks/Impr/CTR/Posição) com delta vs período anterior comparável
- Top Pages com CTR/posição (amber se CTR baixo + bem rankeado)
- Auto Quick Wins: keywords pos 4-15, ≥50 impr, CTR <3% (sem IA)
- Distribuição de keywords (Top 3, 4-10, 11-20, 21+)
- Breakdown por país e dispositivo (GSC dimensions)
- Histórico de longo prazo via tabela `seo_snapshots` populada por cron semanal (`weekly-seo-snapshot`, segundas 03:00 UTC) que invoca a edge function `seo-snapshot`
- AI Report (Lovable AI Gateway) usando topQueries + topPages

Edge functions: `google-search-console` (estendida com previousTotals, byCountry, byDevice, distribution) e `seo-snapshot`.
