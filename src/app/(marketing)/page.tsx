import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { Process } from "@/components/marketing/process";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <ServicesGrid />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
