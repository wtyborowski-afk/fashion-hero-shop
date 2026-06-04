# A/B Test Design — Promoted Listings Fake Door (v2, post-Forte ADJUST)

## Kontekst
Forte Fashion ogłosił 0% prowizji dla sellerów fashion do końca roku. Połowa sellerów dostała maila. Bartek (trophy seller): "Dajcie mi powód, żebym został."

Stress test wykazał: ADJUST — framing zmieniony z kosztowego na przychodowy, próba zawężona do sellerów aktywnie rozważających zostanie.

Odpowiedzi na stress test:
- A (wartość odporna na Forte): Tak — Promoted Listings daje dostęp do bazy kupujących FashionHero, nie obniżkę prowizji. Forte 0% nie zastępuje reach do kupujących którzy są na FashionHero.
- B (metryka odporna na drenaż): Nie w v1 — migracja sellerów korumpuje próbę. V2 filtruje do sellerów aktywnych w ostatnich 7 dniach.
- C (hipoteza trzyma): Rdzeń tak, ale warunek "seller zamierza zostać" był założony, nie zweryfikowany. V2 go wbudowuje w filtr próby.

## Hipoteza
Jeśli sellerom z `organic_rank > 50` którzy byli aktywni w ciągu ostatnich 7 dni pokażemy baner z framingiem przychodowym ("Dotrzyj do kupujących FashionHero, których nie znajdziesz na Forte"), to CTR wyniesie ≥10% i completion rate ≥35%, bo dla sellera który rozważa pozostanie na platformie dostęp do ekskluzywnej bazy kupujących jest silniejszym argumentem niż oszczędność na prowizji oferowana przez Forte.

## Metryki

**Primary:** CTR bannera (banner_viewed → banner_clicked) i completion rate flow (banner_clicked → flow_completed)

**Secondary:**
- Dropout na step 2 (wybór budżetu)
- Login frequency sellera w ciągu 7 dni po ekspozycji — proxy retencji
- % sellerów z grupy kontrolnej którzy odeszli do Forte — baseline churn do porównania

## Sample
- Kto: `organic_rank > 50` AND logowanie w ciągu 7 dni AND brak otwarcia maila od Forte (jeśli sygnał dostępny)
- Grupa A (treatment): baner z framingiem przychodowym
- Grupa B (control): dashboard bez bannera
- Wielkość: minimum 200 per grupa (400 łącznie)

## Czas
7 dni — twarde ograniczenie. Okno decyzji sellerów rozważających Forte zamknie się w 1-2 tygodnie. Test dłuższy = mierzysz już tych co zostali z braku wyboru.

## Feature flag
**Nazwa:** `promoted_listings_fake_door_v2`

Włącz baner dla sellerów, których pozycja organiczna jest gorsza niż 50 i którzy logowali się w ciągu ostatnich 7 dni (i nie otworzyli maila od Forte, jeśli ten sygnał jest dostępny). Losowo przypisz połowę do grupy testowej. Podział stały — ten sam seller zawsze w tej samej grupie. Wyłącznik awaryjny: jeśli dzienny churn w kohortcie przekroczy 5% — pauzuj test.

## Success criteria

| Wynik | Interpretacja |
|-------|--------------|
| CTR ≥10% i completion ≥35% | Sukces — Promoted Listings jako argument retencji działa |
| CTR 3–9% | Szara strefa — zmień copy lub kwotę, powtórz |
| CTR <3% | Porażka — framing przychodowy nie działa, wróć do OST (Opp-2 lub Opp-4) |
| Dropout >40% na step 2 | Barierą jest kwota — testuj niższy entry point (20 PLN/tydzień) |
| Churn treatment > churn control | Alarm — baner przyspiesza odejście, natychmiastowy kill |
