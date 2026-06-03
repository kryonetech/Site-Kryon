/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Benefits from "./components/Benefits";
import Plans from "./components/Plans";
import SocialProof from "./components/SocialProof";
import BudgetSimulator from "./components/BudgetSimulator";
import About from "./components/About";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-light font-sans selection:bg-brand-primary selection:text-white overflow-x-hidden antialiased">
      {/* Fixed Sticky Header */}
      <Header />

      <main>
        {/* Core Sections */}
        <Hero />
        <SocialProof />
        <Solutions />
        <Benefits />
        <Plans />
        
        {/* Interactive Custom Calculator/Form */}
        <BudgetSimulator />
        
        {/* Institutional section */}
        <About />
        
        {/* Final Trigger with custom actions */}
        <CTA />
      </main>

      {/* Main Footer contact info */}
      <Footer />
    </div>
  );
}
