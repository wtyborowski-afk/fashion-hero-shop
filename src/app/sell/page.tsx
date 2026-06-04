import type { Metadata } from "next";
import Image from "next/image";
import { SellerToolsPricing } from "@/components/seller-tools-pricing";

export const metadata: Metadata = {
  title: "Seller Tools - Sprzedawaj na FashionHero",
  description:
    "Narzędzia, które pomagają niezależnym sprzedawcom rosnąć na FashionHero — ceny, marża i zwroty pod kontrolą. Dołącz do wczesnego dostępu.",
};

const valueProps = [
  {
    title: "Zobacz swoją prawdziwą marżę",
    description:
      "Koszt, prowizja, zwroty i wsparcie — wszystko w jednym miejscu, per produkt. Koniec zgadywania, na czym faktycznie zarabiasz.",
  },
  {
    title: "Wyceniaj na danych, nie na przeczuciu",
    description:
      "Rekomendacje cen oparte na zachowaniu 2.4 mln kupujących. Sprzedawaj więcej bez ścigania się na rabaty.",
  },
  {
    title: "Obniż zwroty, zanim się zdarzą",
    description:
      "Prognozujemy, które zamówienia wrócą, i podpowiadamy co zmienić w opisie, rozmiarówce czy zdjęciach.",
  },
];

export default function SellPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[440px] overflow-hidden">
        <Image
          src="/images/hero/hero-2.jpg"
          alt="Niezależny sprzedawca na FashionHero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-[11px] font-medium uppercase tracking-[1px] mb-4 text-white/70">
            FASHIONHERO SELLER TOOLS
          </p>
          <h1 className="text-4xl md:text-5xl font-light leading-tight max-w-3xl mb-6">
            Rośnij jak partner,
            <br />
            nie tylko sprzedawaj jak na kanale.
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-xl">
            Zestaw narzędzi, które pomagają niezależnym sprzedawcom panować nad
            marżą, ceną i zwrotami — i zarabiać więcej na każdym zamówieniu.
          </p>
        </div>
      </section>

      {/* Problem / dlaczego to ma sens */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-6">
          DLACZEGO TO ROBIMY
        </p>
        <p className="text-xl md:text-2xl leading-relaxed text-charcoal">
          Większość sprzedawców negocjuje niższą prowizję, żeby utrzymać marżę —
          a potem traci ją na zwrotach i chaosie cenowym. Seller Tools dają lepszą
          alternatywę: zamiast walczyć o rabat, zarabiaj mądrzej na tym, co już
          sprzedajesz.
        </p>
      </section>

      {/* Value props */}
      <section className="bg-cream-light py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-10 text-center">
            CO DOSTAJESZ
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {valueProps.map((vp) => (
              <div key={vp.title}>
                <h3 className="text-lg font-medium mb-3 text-charcoal">{vp.title}</h3>
                <p className="text-sm leading-relaxed text-warm-gray">{vp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing (klient, z trackingiem) */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-4">
            PLANY
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mb-3">
            Prosty cennik. Realny wzrost.
          </h2>
          <p className="text-sm text-warm-gray max-w-xl mx-auto leading-relaxed">
            Wczesny dostęp rusza wkrótce. Zostaw maila przy wybranym planie, a
            zaprosimy Cię jako jednego z pierwszych.
          </p>
        </div>
        <SellerToolsPricing />
      </section>

      {/* Final CTA */}
      <section className="bg-charcoal text-white py-20 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[1px] text-white/50 mb-4">
          NIEZALEŻNY SPRZEDAWCO
        </p>
        <h2 className="text-3xl md:text-4xl font-light mb-4">
          Zbudujmy Seller Tools razem z Tobą.
        </h2>
        <p className="text-sm text-white/60 max-w-lg mx-auto">
          Przewiń wyżej i dołącz do wczesnego dostępu — Twój feedback ukształtuje
          to, co zbudujemy.
        </p>
      </section>
    </div>
  );
}
