import type { FaqItem } from "@/content/plataformas";
import { JsonLd } from "./JsonLd";

export function Faq({ items, title = "Preguntas frecuentes" }: { items: FaqItem[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
        <h2 id="faq-title" className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="shrink-0 text-muted transition-transform duration-150 group-open:rotate-180"
                >
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
    </section>
  );
}
