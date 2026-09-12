import Navigation from "./components/navigation";
import Hero from "./components/hero";
import Services from "./components/services";
import Editorial from "./components/editorial";
import ProjectShowcase from "./components/project_showcase";
import Gallery from "./components/gallery";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Navigation />
      <Hero />
      <Services />
      <Editorial />
      <ProjectShowcase />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
