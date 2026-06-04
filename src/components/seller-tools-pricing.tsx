"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

interface Tier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "99 zł",
    cadence: "/ mies.",
    tagline: "Dla sprzedawców, którzy chcą przestać zgadywać.",
    features: [
      "Pulpit kosztu i marży per produkt",
      "Alerty o niskim stocku",
      "Podstawowe rekomendacje cenowe",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "299 zł",
    cadence: "/ mies.",
    tagline: "Dla sprzedawców, którzy chcą rosnąć szybciej niż rabat na prowizji.",
    features: [
      "Wszystko ze Startera",
      "Dynamiczne rekomendacje cen na bazie 2.4M kupujących",
      "Prognoza zwrotów i wskazówki jak je obniżyć",
      "Priorytetowe wsparcie sprzedawcy",
    ],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "Wyceniane",
    cadence: "indywidualnie",
    tagline: "Dla największych niezależnych sprzedawców.",
    features: [
      "Wszystko z Growth",
      "Dostęp do API i integracje",
      "Dedykowany opiekun wzrostu",
      "Wczesny dostęp do nowych narzędzi",
    ],
  },
];

export function SellerToolsPricing() {
  const [openTier, setOpenTier] = useState<Tier | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Page view — mianownik dla CTR.
  useEffect(() => {
    track("seller_tools_page_view");
  }, []);

  function handleCtaClick(tier: Tier) {
    track("seller_tools_cta_click", { tier: tier.id, price: tier.price });
    setOpenTier(tier);
    setSubmitted(false);
    setEmail("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    track("seller_tools_waitlist_signup", { tier: openTier?.id ?? "unknown" });
    setSubmitted(true);
  }

  function closeModal() {
    setOpenTier(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={
              "flex flex-col rounded-2xl border p-8 " +
              (tier.highlighted
                ? "border-charcoal shadow-lg bg-white"
                : "border-cream-dark bg-cream-light")
            }
          >
            {tier.highlighted && (
              <span className="self-start mb-4 text-[10px] font-medium uppercase tracking-[1px] bg-charcoal text-white px-3 py-1 rounded-full">
                Najpopularniejszy
              </span>
            )}
            <h3 className="text-lg font-medium text-charcoal">{tier.name}</h3>
            <div className="mt-3 mb-1 flex items-baseline gap-1">
              <span className="text-3xl font-light text-charcoal">{tier.price}</span>
              <span className="text-sm text-warm-gray">{tier.cadence}</span>
            </div>
            <p className="text-sm text-warm-gray leading-relaxed mb-6">{tier.tagline}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-charcoal leading-relaxed">
                  <span aria-hidden className="text-charcoal/40 mt-0.5">
                    —
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCtaClick(tier)}
              className={tier.highlighted ? "btn-cta w-full" : "btn-cta-outline w-full"}
            >
              Dołącz do wczesnego dostępu
            </button>
          </div>
        ))}
      </div>

      {/* Waitlist modal — fake-door reveal */}
      {openTier && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Zamknij"
              className="absolute right-4 top-4 text-warm-gray hover:text-charcoal text-xl leading-none"
            >
              &times;
            </button>

            {!submitted ? (
              <>
                <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-3">
                  Seller Tools · {openTier.name}
                </p>
                <h3 className="text-2xl font-light text-charcoal mb-3">
                  Jesteśmy na ostatniej prostej.
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed mb-6">
                  Seller Tools są w budowie. Zostaw maila, a damy znać jako pierwszym, gdy
                  otworzymy wczesny dostęp — i zaprosimy Cię do współtworzenia narzędzi.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Twój adres e-mail"
                    className="w-full rounded-lg border border-cream-dark px-4 py-3 text-sm focus:outline-none focus:border-charcoal transition-colors"
                  />
                  <button type="submit" className="btn-cta w-full">
                    Zapisz mnie na listę
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-light text-charcoal mb-3">Dzięki! Jesteś na liście.</h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  Odezwiemy się na <span className="text-charcoal">{email}</span>, gdy tylko
                  otworzymy wczesny dostęp do planu {openTier.name}.
                </p>
                <button onClick={closeModal} className="btn-cta-outline w-full mt-6">
                  Zamknij
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
