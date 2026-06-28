import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import ServicePackages from "@/components/service-packages";

export default function ServicePackagesPage() {
  return (
    <>
      <SeoHead
        title="Therapy Packages & Pricing | Poorvam Care, Electronic City Bangalore"
        description="View speech therapy, occupational therapy, and early intervention therapy packages at Poorvam Care, Electronic City, Bangalore. Flexible plans for every family. Call +91 88617 64343."
        canonical="https://poorvamcare.in/service-packages"
        keywords="speech therapy cost Bangalore, therapy packages Electronic City, occupational therapy pricing, child therapy plans Bangalore, speech therapy fees per session Bangalore, affordable child therapy near me, occupational therapy cost Electronic City, ABA therapy cost Bangalore, therapy package pricing near me"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Service Packages", url: "https://poorvamcare.in/service-packages" },
      ])} />
      <ServicePackages />
    </>
  );
}
