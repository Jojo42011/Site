type ClientLogo = {
  name: string;
  tagline: string;
  initials: string;
  segment: "AI Agency" | "SaaS Platform";
  result: string;
};

const aiAgencies: ClientLogo[] = [
  {
    name: "NovaForge Labs",
    tagline: "Embedded private copilots for Fortune 500 retainers",
    initials: "NF",
    segment: "AI Agency",
    result: "Cut infra bills 82%",
  },
  {
    name: "SignalCraft AI",
    tagline: "Automated RAG stacks for regulated industries",
    initials: "SC",
    segment: "AI Agency",
    result: "5 new six-figure retainers",
  },
  {
    name: "Atlas Automations",
    tagline: "24/7 on-call AI squads now productized",
    initials: "AA",
    segment: "AI Agency",
    result: "3× faster delivery",
  },
  {
    name: "Helix Studio",
    tagline: "Owns their infra, bills clients at premium margins",
    initials: "HS",
    segment: "AI Agency",
    result: "Margins +28 pts",
  },
  {
    name: "PulseWorks",
    tagline: "Scaled fleets of fine-tuned systems for retail",
    initials: "PW",
    segment: "AI Agency",
    result: "7 new markets launched",
  },
];

const saasPlatforms: ClientLogo[] = [
  {
    name: "ContextLoop",
    tagline: "Multi-tenant AI support copilots with zero drift",
    initials: "CL",
    segment: "SaaS Platform",
    result: "CSAT +22%",
  },
  {
    name: "LedgerFlow",
    tagline: "Finance automation with self-hosted guardrails",
    initials: "LF",
    segment: "SaaS Platform",
    result: "$420k saved in API fees",
  },
  {
    name: "OrbitOps",
    tagline: "System intelligence for complex logistics clouds",
    initials: "OO",
    segment: "SaaS Platform",
    result: "Latency down 43%",
  },
  {
    name: "RelayDesk",
    tagline: "White-label copilots for their customers' support teams",
    initials: "RD",
    segment: "SaaS Platform",
    result: "Churn down 18%",
  },
  {
    name: "VelaSignals",
    tagline: "Proactive intelligence layer across enterprise BI",
    initials: "VS",
    segment: "SaaS Platform",
    result: "Closed 9 enterprise deals",
  },
];

function CarouselRow({
  items,
  reverse = false,
}: {
  items: ClientLogo[];
  reverse?: boolean;
}) {
  const animationClass = reverse
    ? "animate-client-carousel-reverse"
    : "animate-client-carousel";

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-center gap-6 ${animationClass}`}
        aria-hidden="true"
      >
        {[...items, ...items].map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="group relative flex min-w-[240px] flex-col gap-4 rounded-2xl border border-white/40 bg-white/80 px-6 py-5 shadow-lg shadow-purple-200/40 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-purple-300/60"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-base font-semibold uppercase text-white">
                {client.initials}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {client.segment}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {client.name}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{client.tagline}</p>
            <p className="text-xs font-semibold text-purple-600">
              {client.result}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientCarousel() {
  return (
    <section
      className="relative bg-white py-16 sm:py-20"
      aria-label="Clients already powered by our stack"
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-purple-100/40 to-transparent" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:px-8">
        <div className="space-y-4 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-purple-600/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-purple-700">
            Already switched
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            Agencies & SaaS teams that already trust our private AI stack
          </h2>
          <p className="text-base text-gray-600 sm:text-lg">
            Showing a quick loop of the teams we keep on dedicated,
            air-gapped infrastructure.
          </p>
        </div>

        <div className="space-y-8">
          <CarouselRow items={aiAgencies} />
          <CarouselRow items={saasPlatforms} reverse />
        </div>
      </div>
    </section>
  );
}

