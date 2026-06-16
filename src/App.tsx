/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { Hero } from './components/Hero';
import { MarqueeStats } from './components/MarqueeStats';
import { Competencies } from './components/Competencies';
import { Arsenal } from './components/Arsenal';
import { EventsCovered } from './components/EventsCovered';
import { SectorsServed } from './components/SectorsServed';
import { Unfiltered } from './components/Unfiltered';
import { Articles } from './components/Articles';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="font-sans bg-slate-950 text-white selection:bg-brand-cyan selection:text-slate-950">
      <Hero />
      <MarqueeStats />
      <EventsCovered />
      <SectorsServed />
      <Competencies />
      <Arsenal />
      <Unfiltered />
      <Articles />
      <Contact />
      <Footer />
    </div>
  );
}
