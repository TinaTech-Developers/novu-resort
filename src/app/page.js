import About from "@/components/About";
import Adventure from "@/components/Adventure";
import Discover from "@/components/Discover";
import ExploreRooms from "@/components/ExploreRooms";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Layout>
        <Hero />
        <About />
        <Adventure />
        <Discover />
        <ExploreRooms heading={"Explore Our Apartments"} />
        <Services />
        <Testimonials />
        <Gallery />
      </Layout>
    </main>
  );
}
