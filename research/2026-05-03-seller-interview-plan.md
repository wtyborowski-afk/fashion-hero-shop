# Plan wywiadów: dlaczego dane wyglądają tak jak wyglądają
**Data:** 2026-05-03  
**Projekt:** FashionHero — analiza seller economics  
**Autor:** Wojciech  

---

## 1. Insight źródłowy + hipotezy

Trzy odkrycia z analizy ilościowej 500 sellerów wymagają wyjaśnienia przyczynowego.

**H1 — Kategoria determinuje zysk, nie GMV**  
Zakładam, że sellerzy z kategorii sukienki/akcesoria nie wiedzą, że ich return rate niszczy marżę, bo mierzą sukces obrotem, nie zyskiem po zwrotach. Biżuteria i buty są 63% bardziej zyskowne — prawdopodobnie dlatego, że opisy produktów są precyzyjniejsze (rozmiar = liczba, nie "pasuje na S/M").

**H2 — Negotiated sellerzy generują ukryty koszt supportu**  
Zakładam, że duzi (negotiated) sellerzy piszą do supportu 13× częściej niż standard, bo platforma nie daje im narzędzi do samodzielnego zarządzania operacjami w ich skali. Łączny koszt: 51 225 PLN/mies. vs 9 100 PLN dla grupy 2.3× liczniejszej.

**H3 — Bartek nie wie że jest nieopłacalny**  
Zakładam, że sellerzy z dużym GMV + niską prowizją + wysokimi zwrotami są szczerze przekonani, że są wartościowi dla platformy, bo nigdy nie widzieli swojego kosztu netto. 25% tej grupy jest net-negative. Gross prowizja 6 814 PLN → zysk netto 788 PLN.

---

## 2. Cele badawcze (max 3)

**C1:** Dowiedzieć się, czy i jak sellerzy mierzą rentowność — i czy zwroty wchodzą do ich definicji "dobrego miesiąca."

**C2:** Dowiedzieć się, co konkretnie powoduje kontakt z supportem u większych sellerów i co próbowali zrobić samodzielnie zanim napisali.

**C3:** Dowiedzieć się, co seller robi (lub nie robi) inaczej przy produktach o niskim vs wysokim return rate — i czy w ogóle to rozróżnia.

---

## 3. Segment + screener

### Profil A — seller wysokomarżowy
- Kategoria: biżuteria lub buty
- Tier: standard (lub brak negocjacji)
- Kwalifikator: min. 6 miesięcy na platformie, min. 30 zamówień/mies.
- Dyskwalifikator: seller który aktywnie skarżył się na zwroty w supportcie w ciągu ostatnich 3 miesięcy

### Profil B — profil Bartka
- GMV powyżej 20 000 PLN/mies.
- Tier: negotiated lub w trakcie negocjacji prowizji
- Kategoria: sukienki, akcesoria lub sportswear
- Return rate powyżej 25% (sprawdzić w danych przed kontaktem)
- Dyskwalifikator: seller który niedawno składał reklamację dot. zwrotów

**Liczba rozmów:** 5–6 łącznie (3 × Profil A + 3 × Profil B)  
**Format:** 45–60 min, video/telefon, nagrywane za zgodą  
**Saturacja oczekiwana:** ok. 5–8 rozmówców (Nielsen NN Group + ConfirmKit 2026)

---

## 4. Logistyka

| Element | Wartość |
|---------|---------|
| Długość wywiadu | 45–60 min |
| Format | Video (Teams/Zoom) lub telefon |
| Nagrywanie | Tak, za zgodą pisemną lub werbalną na początku |
| Notatki | Osobna osoba notuje lub auto-transkrypt |
| Rekrutacja | CRM / Ola (Head of Marketplace) — lista aktywnych sellerów z filtrami |
| Wynagrodzenie | Opcjonalnie: voucher 50–100 PLN lub priorytetowe wsparcie |

---

## 5. Skrypt powitalny

> "Cześć, nazywam się [imię], pracuję w FashionHero jako product manager. Zapraszam Cię na rozmowę, bo chcemy lepiej rozumieć jak pracuje się z platformą od strony sprzedawcy — nie żeby sprzedawać Ci cokolwiek, nie ma tu złych odpowiedzi. Interesuje mnie Twoje realne doświadczenie. Czy mogę nagrać tę rozmowę do notatek? Tylko ja i mój zespół to słyszą, nie idzie nigdzie dalej."

---

## 6. Struktura wywiadu

| Sekcja | Czas | Cel |
|--------|------|-----|
| Warm-up + zgoda | 3 min | Rozluźnienie, formalności |
| Kontekst rozmówcy | 5 min | Rola, skala, codzienność |
| Past stories — blok C1 (rentowność) | 15 min | Jak mierzą sukces, co wiedzą o zwrotach |
| Past stories — blok C3 (kategoria/opisy) | 10 min | Jak tworzą ofertę, co różni produkty |
| Past stories — blok C2 (support + workarounds) | 10 min | Kiedy i dlaczego piszą do supportu |
| Wrap-up | 5 min | Referral, czego nie zapytałem |

---

## 7. Question bank

### Warm-up

**P-0:** "Opowiedz mi jak wygląda Twój typowy poniedziałek rano w pracy ze sklepem — co robisz jako pierwsze?"

*Cel: ustalenie rytmu pracy i co jest w centrum uwagi sellera. Jeśli nie wspomni danych/raportów — to już sygnał.*

---

### Blok C1 — jak mierzą rentowność

**P-1:** "Kiedy ostatnio spojrzałeś na swoje wyniki i pomyślałeś 'to był dobry miesiąc' — co konkretnie sprawdziłeś?"

Follow-up: "I co zobaczyłeś? Czego się spodziewałeś a co Cię zaskoczyło?"

*Ujawnia metrykę sukcesu. Seller który powie tylko "obrót" nie monitoruje zwrotów. Seller który powie "marżę po zwrotach" jest świadomy. Różnica jest kluczowa dla H1 i H3.*

**P-2:** "Opowiedz mi o ostatnim produkcie który miał dużo zwrotów — jak się dowiedziałeś i co się potem wydarzyło?"

Follow-up: "Czy to był jednorazowy przypadek czy wzorzec który się powtarza?"

*Konkretna historia, nie opinia. Jeśli nie pamięta żadnego takiego produktu — albo nie monitoruje, albo ma bardzo mało zwrotów. Obydwie odpowiedzi są cenne.*

---

### Blok C3 — co różni kategorie i produkty

**P-3:** "Który produkt w Twoim sklepie działa najlepiej — i skąd wiesz, że dobrze działa?"

Follow-up: "A który działa najgorzej? Co inaczej zrobiłeś przy tym produkcie?"

*"Skąd wiesz" ujawnia ich definicję sukcesu. Jeśli powiedzą "najmniej zwrotów" — są bardziej świadomi. Kontrast dobry/zły produkt często ujawnia różnice w procesie tworzenia oferty.*

**P-4:** "Opisz jak tworzysz opis i zdjęcia dla nowego produktu — co robisz krok po kroku?"

Follow-up: "Czy robiłeś to kiedyś inaczej? Co zmieniłeś?"

*To jest hipoteza przyczynowa dla H1. Seller biżuterii powie "wpisuję wymiary w milimetrach". Seller sukienek powie "opisuję jak leży". Różnica w precyzji prawdopodobnie wyjaśnia różnicę w return rate między kategoriami.*

---

### Blok C2 — support i workaroundy

**P-5:** "Kiedy ostatnio napisałeś do supportu FashionHero — co się wtedy działo, od początku?"

Follow-up: "Co próbowałeś zrobić zanim napisałeś?"

*"Od początku" wymusza narrację. Follow-up to "ślad wysiłku" — najsilniejszy sygnał z Mom Testa. Seller który próbował 3 różnych obejść zanim napisał ma realny problem z brakiem narzędzi.*

**P-6:** "Czy zdarzyło Ci się robić coś 'na boku' żeby zarządzać zwrotami albo zamówieniami — arkusz w Excelu, notatki, własny system?"

Follow-up: "Ile czasu to Ci zajmuje tygodniowo?"

*Workaround = dowód na lukę produktową. Jeśli seller zbudował własny tracker zwrotów — platforma nie daje mu tej funkcji. Jeśli 3 z 5 sellerów ma arkusz — to jest feature do zbudowania (lub sprzedania jako Seller Tools).*

---

### Wrap-up

**P-7:** "Gdybyś miał pokazać nowemu sprzedawcy jedną rzecz na FashionHero, na którą nie zwracają uwagi, a Ty uważasz za kluczową — co byś pokazał?"

*Ujawnia co sami uważają za wartościowe. Często pojawia się tu coś czego w danych nie ma: algorytm widoczności, sezonowość, warunki negocjacji.*

**Zamknięcie:** "Kogo jeszcze powinienem zapytać — znasz kogoś kto sprzedaje inaczej niż Ty i mógłby mi powiedzieć coś innego?"

*Referral do kolejnych rozmówców. Klasyczny Mom Test lock-down.*

---

## 8. Czego NIE robić w tym wywiadzie

1. **Nie pokazuj liczb z analizy.** "Widzę że masz 42% zwrotów" natychmiast przestawia rozmowę w tryb defensywny. Seller będzie tłumaczyć, nie opowiadać.
2. **Nie pytaj o prowizję przed P-6.** Seller wejdzie w tryb negocjacyjny i przestanie być szczery w pozostałych odpowiedziach.
3. **Nie pytaj "czy chciałbyś funkcję X".** Każda odpowiedź będzie "tak" — to nie jest sygnał, to uprzejmość.
4. **Nie używaj pytań zamkniętych (tak/nie).** Każde zamknięte pytanie to zmarnowana minuta wywiadu.
5. **Nie przerywaj ciszy po P-3 i P-4.** Daj 4–5 sekund. Seller często dopiero wtedy mówi coś prawdziwego, gdy czuje że naprawdę słuchasz.

---

## 9. Rubryka — podsumowanie ocen

| Pytanie | MT#1 | MT#2 | MT#3 | Wzorzec 1 | Wzorzec 2 | Wzorzec 4 | Wzorzec 5 | Wzorzec 6 | Status |
|---------|------|------|------|-----------|-----------|-----------|-----------|-----------|--------|
| P-0 | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | — | ✅ |
| P-1 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ |
| P-2 | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| P-3 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ |
| P-4 | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| P-5 | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ |
| P-6 | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ |
| P-7 | ✅ | — | ✅ | — | ✅ | ✅ | — | — | ✅ |

Wzorzec 3 (echo ostatniego słowa) i Wzorzec 4 (emocja/"spodziewałem się") są technikami improwizacji w trakcie wywiadu, nie strukturalnymi elementami pytań — stosuj je jako follow-upy ad hoc.

---

## 10. Plan syntezy po wywiadach

Po każdym wywiadzie (max 24h po):
1. Zapisz 3 rzeczy które zaskoczyły
2. Zanotuj dosłowne cytaty (nie parafrazę) — szczególnie przy P-1 i P-3
3. Zaznacz czy seller wspomniał zwroty samodzielnie (przed P-2) — tak/nie
4. Zaznacz czy seller ma własny system/arkusz — tak/nie/częściowo

Po 5 wywiadach: szukaj wzorców w odpowiedziach na P-1 (co mierzą) i P-4 (jak tworzą opisy). Jeśli 3+ sellerów mówi to samo — to jest znajdź.

---

*Źródła: Rob Fitzpatrick, The Mom Test (2013) · Steve Portigal, Interviewing Users (2023) · Nielsen NN Group — discovery sample size*
