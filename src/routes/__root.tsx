import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { SITE } from "../lib/site";
import { EditProvider } from "../lib/editing";
import { PromoProvider } from "../lib/promos";
import { EditBar } from "../components/EditBar";

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: SITE.name,
  image: "/og-image.jpg",
  telephone: "+57 313 789 3355",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: SITE.city,
    addressRegion: SITE.region,
    postalCode: SITE.postalCode,
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.latitude,
    longitude: SITE.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:30",
    },
  ],
  sameAs: [SITE.instagramUrl],
  areaServed: { "@type": "City", name: "Cali" },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#5E2B8A" },
      { name: "author", content: SITE.name },
      { name: "geo.region", content: "CO-VAC" },
      { name: "geo.placename", content: "Cali" },
      { name: "geo.position", content: `${SITE.latitude};${SITE.longitude}` },
      { name: "ICBM", content: `${SITE.latitude}, ${SITE.longitude}` },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "es_CO" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Veterinaria en Cali | Clínica Especializada Maskotas — Urgencias, Cirugías y Spa" },
      { property: "og:title", content: "Veterinaria en Cali | Clínica Especializada Maskotas — Urgencias, Cirugías y Spa" },
      { name: "twitter:title", content: "Veterinaria en Cali | Clínica Especializada Maskotas — Urgencias, Cirugías y Spa" },
      { name: "description", content: "Clínica veterinaria especializada en Cali, barrio Quintas de Don Simón. Consulta, cirugías, laboratorio, ecografía, urgencias, peluquería canina y domicilios. Agenda por WhatsApp." },
      { property: "og:description", content: "Clínica veterinaria especializada en Cali, barrio Quintas de Don Simón. Consulta, cirugías, laboratorio, ecografía, urgencias, peluquería canina y domicilios. Agenda por WhatsApp." },
      { name: "twitter:description", content: "Clínica veterinaria especializada en Cali, barrio Quintas de Don Simón. Consulta, cirugías, laboratorio, ecografía, urgencias, peluquería canina y domicilios. Agenda por WhatsApp." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2834691c-cd46-404d-a708-0c8242754972/id-preview-5e077bbc--c9ebf7bb-dce1-4c28-8ea5-6c7736de05a9.lovable.app-1784902044274.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2834691c-cd46-404d-a708-0c8242754972/id-preview-5e077bbc--c9ebf7bb-dce1-4c28-8ea5-6c7736de05a9.lovable.app-1784902044274.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = pathname.startsWith("/admin") || pathname.startsWith("/propuesta");

  return (
    <QueryClientProvider client={queryClient}>
      <EditProvider>
        <PromoProvider>
          <div className="flex min-h-screen flex-col">
            {!bare && <Header />}
            <main className="flex-1">
              {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
              <Outlet />
            </main>
            {!bare && <Footer />}
            {!bare && <WhatsAppFloat />}
          </div>
          <EditBar />
        </PromoProvider>
      </EditProvider>
    </QueryClientProvider>
  );
}
