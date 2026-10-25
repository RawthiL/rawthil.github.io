import { useState } from "react";
import Starfield from "./components/Starfield";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Trajectory from "./components/Trajectory";
import Constellations from "./components/Constellations";
import Contact from "./components/Contact";
import { useReveal } from "./lib/useReveal";

export default function App() {
  const [focusGroup, setFocusGroup] = useState<number | null>(null);
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link rounded-full bg-azure px-5 py-2.5 text-sm font-semibold text-abyss">
        Skip to content
      </a>
      <Starfield focusGroup={focusGroup} />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Constellations onGroupChange={setFocusGroup} />
        <Trajectory />
        <Contact />
      </main>
    </>
  );
}
