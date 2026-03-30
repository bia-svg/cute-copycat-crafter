
-- Delete all test leads from david (hypnoseworld@hotmail.de), biabeatriz (biabeatrizmendes@gmail.com), and test@example.com
DELETE FROM leads WHERE email IN ('hypnoseworld@hotmail.de', 'biabeatrizmendes@gmail.com', 'test@example.com');

-- Add a pre-registered entry for the next CH seminar (Mo-Sa, 15.-20. Juni 2026)
INSERT INTO leads (name, email, form_type, city, country, notes, created_at)
VALUES (
  'Pre-registered',
  'pre-registered@example.com',
  'seminar',
  'Schweiz',
  'CH',
  'Reg#12155 | Seminar: Mo-Sa, 15.-20. Juni 2026 | "Fit+Gsund" Churzhaslen 3, 8733 Eschenbach | Beruf: Therapeut | Geb: 10.05.1980 | Adresse: Bahnhofstr. 12, 8001 Zürich, Schweiz',
  '2026-03-28 10:00:00+00'
);
