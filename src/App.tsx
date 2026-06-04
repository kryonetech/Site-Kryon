/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Hero from "./components/Hero";

// Lazy loaded components (Below the fold) to improve initial page load performance
const Solutions = React.lazy(() => import("./components/Solutions"));
const Benefits = React.lazy(() => import("./components/Benefits"));
const CustomSolutions = React.lazy(() => import("./components/CustomSolutions"));
const WebsiteCreation = React.lazy(() => import("./components/WebsiteCreation"));
const BudgetSimulator = React.lazy(() => import("./components/BudgetSimulator"));
const About = React.lazy(() => import("./components/About"));
const CTA = React.lazy(() => import("./components/CTA"));
const Footer = React.lazy(() => import("./components/Footer"));

const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));
const ProtectedAdminRoute = React.lazy(() => import("./components/admin/ProtectedAdminRoute"));

function PublicLayout() {
  return (
    <>
      {/* Fixed Sticky Header */}
      <Header />

      <main>
        {/* Core Sections */}
        <Hero />
        
        <Suspense fallback={<div className="py-20 flex justify-center items-center"><div className="w-8 h-8 rounded-full border-t-2 border-brand-primary animate-spin"></div></div>}>
          <Solutions />
          <Benefits />
          <CustomSolutions />
          <WebsiteCreation />
          
          {/* Interactive Custom Calculator/Form */}
          <BudgetSimulator />
          
          {/* Institutional section */}
          <About />
          
          {/* Final Trigger with custom actions */}
          <CTA />
        </Suspense>
      </main>

      {/* Main Footer contact info */}
      <Suspense fallback={<div className="h-40 bg-brand-surface" />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-light font-sans selection:bg-brand-primary selection:text-white overflow-x-hidden antialiased">
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route 
          path="/admin/*" 
          element={
            <Suspense fallback={<div className="min-h-screen flex justify-center items-center"><div className="w-8 h-8 rounded-full border-t-2 border-brand-primary animate-spin"></div></div>}>
              <ProtectedAdminRoute>
                <AdminPanel />
              </ProtectedAdminRoute>
            </Suspense>
          } 
        />
      </Routes>
    </div>
  );
}
