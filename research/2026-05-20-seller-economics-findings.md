# Wyniki analizy seller_economics — 500 sprzedawców FashionHero
**Data analizy:** 2026-05-20  
**Dane:** seller_economics.csv (500 sellerów, 15 zmiennych)  
**Pytanie przewodnie:** Który seller zarabia dla FashionHero — i dlaczego?

---

## TL;DR dla Mai

> Nasi najwięksi sprzedawcy są mniej opłacalni niż myślimy. Kategoria produktu determinuje zysk bardziej niż GMV. Mamy lukę produktową w przedziale prowizji 18–20%, którą można zamienić w nowy strumień przychodów. Negotiated sellerzy generują ukryty koszt supportu o którym nikt nie mówi.

---

## Odkrycia

### 1. Kategoria determinuje zysk — nie GMV

| Kategoria | Śr. zysk netto (PLN/mies.) | % net-negative |
|-----------|--------------------------|----------------|
| Biżuteria | 1 409 | 2.6% |
| Buty | 1 276 | 1.6% |
| Bielizna | 1 208 | 5.0% |
| Odzież wierzchnia | 1 157 | 3.4% |
| Torby | 1 145 | 0.0% |
| Sportswear | 952 | 5.9% |
| Akcesoria | 936 | 8.3% |
| Sukienki | 864 | 7.5% |

Różnica biżuteria vs sukienki: **63%**. Torby są jedyną kategorią z 0% sellerów net-negative.

### 2. Bimodalny rozkład prowizji — strefa martwa 18–20%

Model cenowy jest binarny: albo ~22% (standard) albo ~16% (negotiated). Przedział 18–20% jest **pusty**. To luka produktowa — sprzedawcy rosnący do skali wymagającej lepszych warunków nie mają opcji pośredniej. Co kwartał 10–15 sellerów przychodzi po obniżkę.

**Hipoteza nowego silnika:** Seller Tools jako płatna warstwa (500–1 500 PLN/mies.) pozwalająca zostać na stawce 20–21% zamiast schodzić do 16%. Addytywny strumień, nie kanibalizacja.

### 3. Negotiated sellerzy: ukryty koszt supportu 5× wyższy

| Tier | Sellerów | Śr. ticketów/mies. | Łączny koszt/mies.* |
|------|----------|-------------------|---------------------|
| Standard | 350 | 1.0 | 9 100 PLN |
| Negotiated | 150 | 13.7 | 51 225 PLN |

*przy założeniu 25 PLN/ticket

150 negotiated sellerów generuje koszt supportu **5× wyższy** niż 350 standard. Ten koszt **nie jest uwzględniony w kalkulacji marży prowizyjnej**. Różnica statystycznie istotna (t=-47.26, p<0.0001).

### 4. GMV a zwroty: r = +0.773 (bardzo silna korelacja)

| Kwartyl GMV | Return rate |
|-------------|-------------|
| Q1 (< 3.9k PLN) | 10.3% |
| Q2 (3.9–8.2k) | 12.2% |
| Q3 (8.2–19k) | 15.8% |
| Q4 (> 19k) | 28.7% |

Więksi sellerzy mają prawie 3× wyższy return rate. Przy negotiated stawce to podwójny cios na marżę.

### 5. Iluzja Bartka — duży GMV ≠ duży zysk

Sellerzy z profilem: GMV > 35k + prowizja < 18% + return rate > 35% (n=16):
- **4/16 (25%) jest net-negative**
- Gross prowizja: śr. 6 814 PLN → po zwrotach: 3 988 PLN → **zysk netto: 788 PLN**
- Zysk tej grupy **30% niższy niż średnia platformy** (1 121 PLN)
- Największy seller (S0444, GMV 79 524 PLN) generuje zysk netto zaledwie 1 590 PLN

### 6. TOP GMV ≠ TOP zysk

Overlap między TOP 20 sellerami wg GMV a TOP 20 wg zysku netto: ~6–9 na 20. Niski wynik — "trophy sellers" nie są najlepszymi klientami z perspektywy marży.

### 7. Źródło rejestracji vs zysk

| Źródło | Śr. zysk netto | % net-negative |
|--------|---------------|----------------|
| Partner | 1 410 PLN | 1.4% |
| Paid campaign | 1 090 PLN | 5.4% |
| Organic | 1 083 PLN | 3.4% |
| Referral | 1 008 PLN | 7.1% |

Sellerzy z kanału **partner** mają o 40% wyższy zysk netto i 5× niższy odsetek ujemnych marż niż referral.

### 8. Trzy zaskakujące korelacje

| Korelacja | r | Interpretacja |
|-----------|---|---------------|
| Prowizja vs tickety supportu | -0.846 | Niższa prowizja = dramatycznie więcej supportu. Kosztu nie widać w P&L. |
| Marketing spend vs return rate | +0.546 | Confound: negotiated tier. Nie wycinaj budżetu na tej podstawie. |
| Staż vs zysk netto | -0.075 | Brak efektu uczenia się. Zysk determinowany w momencie onboardingu, nie z czasem. |

---

## Co to znaczy strategicznie

### Naprawa modelu (szybkie wins)
- Uwzględnić koszt supportu w kalkulacji marży per seller (ukryty koszt ~51k PLN/mies.)
- Zaktualizować metrykę sukcesu sprzedawców: zysk netto po zwrotach i supportcie, nie gross GMV
- Zmienić kryteria rekrutacji: priorytet biżuteria/buty/torby, ostrożnie z sukienkami przy niskiej prowizji

### Nowy silnik przychodu (hipoteza do testu)
- Seller Tools: płatna warstwa w strefie 18–20% eliminująca binarny skok prowizji
- Wartość dla sellera: lepsza widoczność, analytics, account manager — bez obniżki stawki
- Wartość dla FashionHero: addytywny stream B2B, nie kanibalizacja istniejącej prowizji

### Czego ta analiza NIE mówi
- Czy Seller Tools rzeczywiście kupią — potrzeba wywiadów jakościowych
- Czy cięcie negotiated sellerów nie zaszkodzi akwizycji kupujących (mogą przyciągać ruch)
- Przyczynowości: korelacje widać, mechanizmy do zbadania w terenie

---

## Następne kroki

1. **Wywiady z sellerami** — plan: `research/2026-05-03-seller-interview-plan.md`  
   Rekrutacja: 3× Profil A (biżuteria/buty) + 3× Profil B (profil Bartka)  
   Termin: jak najszybciej przed board

2. **Kalkulacja kosztu supportu** — włączyć do modelu marży per seller tier  
   Owner: Ela + Konrad (dane z ticketów)

3. **Hipoteza Seller Tools** — MVP briefing dla Marka  
   Warunek: potwierdzenie w ≥ 3 wywiadach że sellerzy szukają "czegoś pośredniego"

---

*Analiza wykonana w Cowork, maj 2026. Dane: seller_economics.csv (500 sellerów, snapshot miesięczny).*
