import Navigation from "./components/navigation";
import Hero from "./components/hero";
import Services from "./components/services";
import Editorial from "./components/editorial";
import ProjectShowcase from "./components/project_showcase";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Testimonials from "./components/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Navigation />
      <Hero />
      <Services />
      <Editorial />
      <ProjectShowcase />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
