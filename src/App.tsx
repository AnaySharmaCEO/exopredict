import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout/Layout';
import { StarfieldBackground } from './components/Visualization/StarfieldBackground';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Explorer } from './pages/Explorer';
import { Docs } from './pages/Docs';
import { Pricing } from './pages/Pricing';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
          <StarfieldBackground />
          
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </Layout>
          
          <Toaster 
            theme="dark"
            className="!bg-[rgba(16,33,62,0.9)] !border-[rgba(0,255,255,0.2)]"
          />
        </div>
      </Router>
    </AppProvider>
  );
}