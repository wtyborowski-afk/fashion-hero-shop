# A/B Test Design — Promoted Listings Fake Door (v1, pre-Forte)

## Hipoteza
Jeśli sellerom z `organic_rank > 50` pokażemy baner "Aktywuj Promoted Listings za 50 PLN/tydzień" z aktywacją w jednym kroku, to CTR wyniesie ≥10% i completion rate ≥35%, bo sprzedawcy z niską widocznością organiczną odczuwają ból niewidoczności jako wystarczający trigger do zapłacenia za ekspozycję — a brak skomplikowanego biddingu eliminuje główną barierę techniczną.

## Metryki

**Primary:** CTR bannera (banner_viewed → banner_clicked) i completion rate flow (banner_clicked → flow_completed)

**Secondary:**
- Dropout na step 2 (wybór budżetu) — czy barierą jest kwota, nie intencja
- Czas spędzony na step 2 — proxy wahania przy wyborze kwoty
- Powracające wizyty na stronę aktywacji bez completion — sygnał zainteresowania bez decyzji

## Sample
- Kto: wszyscy aktywni sellerzy z `organic_rank > 50`, bez dodatkowych filtrów
- Grupa A (treatment): baner z CTA
- Grupa B (control): dashboard bez bannera
- Wielkość: minimum 200 per grupa (400 łącznie), istotność 95%, moc 80%

## Czas
14 dni. Brak zewnętrznego pressingu — pełne dwa tygodnie dla stabilnego sygnału.

## Feature flag
**Nazwa:** `promoted_listings_fake_door_v1`

Włącz baner dla sellerów, których pozycja organiczna jest gorsza niż 50. Losowo przypisz połowę z nich do grupy testowej (widzą baner), drugą połowę do grupy kontrolnej (nie widzą). Podział musi być stały — ten sam seller musi zawsze trafiać do tej samej grupy.

## Success criteria

| Wynik | Interpretacja |
|-------|--------------|
| CTR ≥10% i completion ≥35% | Sukces — budujesz interaktywny mock |
| CTR 3–9% | Szara strefa — zmień jedną zmienną, powtórz |
| CTR <3% | Porażka — wróć do OST, zbadaj barierę w 5 wywiadach |
| Dropout >40% na step 2 | Barierą jest cena — testuj niższy entry point (20 PLN/tydzień) |
