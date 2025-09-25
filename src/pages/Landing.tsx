import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Planet3D } from '../components/Visualization/Planet3D';
import { GlowingButton } from '../components/UI/GlowingButton';
import { SciFiCard } from '../components/UI/SciFiCard';
import { Telescope, Zap, Globe, Database, Users, Award } from 'lucide-react';

export function Landing() {
  const features = [
    {
      icon: Telescope,
      title: 'Advanced Detection',
      description: 'AI-powered algorithms analyze transit and radial velocity data with unprecedented accuracy.',
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Get instant predictions with confidence scores and detailed orbital parameters.',
    },
    {
      icon: Globe,
      title: 'Global Database',
      description: 'Access to comprehensive exoplanet datasets from NASA and ESA missions.',
    },
    {
      icon: Database,
      title: 'Research Grade',
      description: 'Built for professional astronomers, researchers, and space agencies worldwide.',
    },
  ];

  const stats = [
    { number: '5,000+', label: 'Exoplanets Discovered' },
    { number: '99.2%', label: 'Prediction Accuracy' },
    { number: '150+', label: 'Research Institutions' },
    { number: '24/7', label: 'Analysis Available' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Planet3D size={2} color="#4A90E2" className="opacity-30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-['Orbitron'] mb-6 neon-text leading-tight">
              Discover New Worlds
              <br />
              <span className="text-[#8A2BE2]">Beyond Our Solar System</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-['Rajdhani'] leading-relaxed"
            >
              Advanced AI-powered exoplanet prediction platform for researchers, scientists, 
              and space enthusiasts. Analyze planetary data and predict exoplanet candidates 
              with research-grade accuracy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <GlowingButton size="lg" variant="primary" asChild>
                <Link to="/dashboard">Start Predicting</Link>
              </GlowingButton>
              
              <GlowingButton size="lg" variant="secondary" asChild>
                <Link to="/explorer">Explore Discoveries</Link>
              </GlowingButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#00FFFF] rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-[#00FFFF] rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[rgba(16,33,62,0.3)] to-[rgba(26,26,46,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold font-['Orbitron'] text-[#00FFFF] neon-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300 font-['Rajdhani']">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] mb-6 neon-text">
              Research-Grade Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Rajdhani']">
              Built with cutting-edge machine learning algorithms and validated 
              against known exoplanet discoveries from NASA's Kepler and TESS missions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <SciFiCard className="p-8 h-full text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] mb-6">
                    <feature.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 font-['Rajdhani']">
                    {feature.description}
                  </p>
                </SciFiCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[rgba(0,255,255,0.1)] to-[rgba(138,43,226,0.1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-['Orbitron'] mb-6 neon-text">
              Ready to Explore the Universe?
            </h2>
            <p className="text-xl text-gray-300 mb-12 font-['Rajdhani']">
              Join thousands of researchers and space enthusiasts in the quest 
              to discover new exoplanets and expand our understanding of the cosmos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <GlowingButton size="lg" variant="primary" asChild>
                <Link to="/dashboard">Start Your Discovery</Link>
              </GlowingButton>
              
              <GlowingButton size="lg" variant="secondary" asChild>
                <Link to="/pricing">View Pricing</Link>
              </GlowingButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}