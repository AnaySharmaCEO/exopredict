import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SciFiCard } from '../components/UI/SciFiCard';
import { GlowingButton } from '../components/UI/GlowingButton';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Check, Users, Rocket, Star, Globe, Database } from 'lucide-react';

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for students and amateur astronomers',
      emoji: '🌌',
      price: { monthly: 0, annual: 0 },
      features: [
        '10 predictions per month',
        'Basic visualizations',
        'Access to public datasets',
        'Community support',
        'Educational resources',
        'Transit method only'
      ],
      limitations: [
        'No API access',
        'Limited history (30 days)',
        'No export capabilities'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'from-[#00FFFF] to-[#8A2BE2]'
    },
    {
      name: 'Pro',
      description: 'For scientists and research institutions',
      emoji: '🚀',
      price: { monthly: 49, annual: 490 },
      features: [
        'Unlimited predictions',
        'Advanced 3D visualizations',
        'Combined transit + RV analysis',
        'Full prediction history',
        'Data export (CSV, JSON)',
        'Priority support',
        'API access (1000 calls/month)',
        'Custom batch processing'
      ],
      limitations: [],
      cta: 'Start Pro',
      popular: true,
      color: 'from-[#8A2BE2] to-[#FF6B9D]'
    },
    {
      name: 'Enterprise',
      description: 'For universities and space agencies',
      emoji: '🛰️',
      price: { monthly: 199, annual: 1990 },
      features: [
        'Everything in Pro',
        'Unlimited API access',
        'White-label integration',
        'Custom model training',
        'Dedicated support team',
        'Multi-user management',
        'Advanced analytics dashboard',
        'Custom deployment options',
        'SLA guarantee (99.9% uptime)'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-[#FFD700] to-[#FFA500]'
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the predictions?',
      answer: 'Our AI model achieves 99.2% accuracy when validated against confirmed exoplanets from NASA datasets. The confidence score provides a measure of prediction reliability.'
    },
    {
      question: 'What data sources do you use?',
      answer: 'We use confirmed exoplanet data from NASA Exoplanet Archive, Kepler mission, TESS survey, and ground-based observations from major observatories worldwide.'
    },
    {
      question: 'Can I use this for published research?',
      answer: 'Yes! Our Researcher and Institution plans are designed for academic and professional use. We provide proper attribution guidelines and research-grade documentation.'
    },
    {
      question: 'Is there an API for automated analysis?',
      answer: 'Yes, Researcher and Institution plans include API access. The API supports batch processing and can be integrated into existing workflows.'
    },
    {
      question: 'What if I need custom features?',
      answer: 'Institution plan users can request custom features and model training. Contact our team to discuss specific requirements for your research needs.'
    },
    {
      question: 'Do you offer educational discounts?',
      answer: 'Yes! We offer 50% discounts for students and 30% for educational institutions. Contact us with your academic email for verification.'
    }
  ];



  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-['Orbitron'] mb-4 neon-text">
            Pricing Plans
          </h1>
          <p className="text-xl text-gray-300 font-['Rajdhani'] max-w-3xl mx-auto mb-8">
            From amateur astronomers to leading research institutions, 
            we have a plan that scales with your exoplanet discovery needs.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className="text-gray-300 font-['Rajdhani']">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className="text-gray-300 font-['Rajdhani']">
              Annual
            </Label>
            <Badge className="bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-black">
              Save 17%
            </Badge>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-[#8A2BE2] to-[#FF6B9D] text-white px-6 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <SciFiCard 
                className={`p-8 h-full relative overflow-hidden transition-all duration-300 group-hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-[rgba(138,43,226,0.5)] group-hover:border-[rgba(138,43,226,0.8)]' 
                    : 'group-hover:border-[rgba(0,255,255,0.4)]'
                }`}
                glow={plan.popular}
              >
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(138,43,226,0.1)] to-[rgba(255,107,157,0.1)] pointer-events-none group-hover:from-[rgba(138,43,226,0.2)] group-hover:to-[rgba(255,107,157,0.2)] transition-all duration-300" />
                )}
                
                {/* Enhanced glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-[rgba(138,43,226,0.1)] to-[rgba(255,107,157,0.1)]' 
                      : 'bg-gradient-to-br from-[rgba(0,255,255,0.1)] to-[rgba(138,43,226,0.1)]'
                  }`} />
                </div>
                
                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{plan.emoji}</span>
                    </div>
                    <h3 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-2 group-hover:text-white transition-colors duration-300">
                      {plan.name}
                    </h3>
                    <p className="text-gray-300 font-['Rajdhani']">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-white font-['Orbitron']">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-gray-400 font-['Rajdhani']">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {isAnnual && plan.price.monthly > 0 && (
                      <p className="text-sm text-gray-400 mt-1 font-['Rajdhani']">
                        ${plan.price.monthly}/month billed annually
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 font-['Rajdhani']">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(0, 255, 255, 0.3)",
                          "0 0 30px rgba(0, 255, 255, 0.5)",
                          "0 0 20px rgba(0, 255, 255, 0.3)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="rounded-lg"
                    >
                      <GlowingButton
                        variant={plan.popular ? 'accent' : 'primary'}
                        size="lg"
                        className="w-full group-hover:scale-105 transition-transform duration-300"
                        asChild
                      >
                        {plan.name === 'Enterprise' ? (
                          <a href="mailto:enterprise@exopredict.com">{plan.cta}</a>
                        ) : (
                          <Link to="/dashboard">{plan.cta}</Link>
                        )}
                      </GlowingButton>
                    </motion.div>
                  </div>
                </div>
              </SciFiCard>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SciFiCard className="p-8">
            <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-8 text-center">
              What's Included
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Database className="h-12 w-12 text-[#00FFFF] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-['Orbitron']">
                  Research-Grade AI
                </h3>
                <p className="text-gray-300 font-['Rajdhani']">
                  Machine learning models trained on NASA's confirmed exoplanet database 
                  with 99.2% accuracy validation.
                </p>
              </div>
              
              <div className="text-center">
                <Rocket className="h-12 w-12 text-[#00FFFF] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-['Orbitron']">
                  Real-time Analysis
                </h3>
                <p className="text-gray-300 font-['Rajdhani']">
                  Instant predictions with detailed confidence scores, orbital parameters, 
                  and interactive 3D visualizations.
                </p>
              </div>
              
              <div className="text-center">
                <Users className="h-12 w-12 text-[#00FFFF] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2 font-['Orbitron']">
                  Expert Support
                </h3>
                <p className="text-gray-300 font-['Rajdhani']">
                  Direct access to our team of astrophysicists and data scientists 
                  for research collaboration and technical support.
                </p>
              </div>
            </div>
          </SciFiCard>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SciFiCard className="p-8">
            <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="space-y-2"
                >
                  <h3 className="text-lg font-semibold text-[#00FFFF] font-['Orbitron']">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 font-['Rajdhani'] leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </SciFiCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <SciFiCard className="p-12 bg-gradient-to-r from-[rgba(0,255,255,0.1)] to-[rgba(138,43,226,0.1)]">
            <h2 className="text-3xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
              Ready to Discover Exoplanets?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-['Rajdhani'] max-w-2xl mx-auto">
              Join the next generation of astronomers using AI to explore the cosmos. 
              Start your journey today with our free plan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 255, 0.3)",
                    "0 0 30px rgba(0, 255, 255, 0.5)",
                    "0 0 20px rgba(0, 255, 255, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="rounded-lg"
              >
                <GlowingButton size="lg" variant="primary" asChild>
                  <Link to="/dashboard">Start Free Trial</Link>
                </GlowingButton>
              </motion.div>
              
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(138, 43, 226, 0.3)",
                    "0 0 30px rgba(138, 43, 226, 0.5)",
                    "0 0 20px rgba(138, 43, 226, 0.3)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="rounded-lg"
              >
                <GlowingButton size="lg" variant="secondary" asChild>
                  <a href="mailto:contact@exopredict.com">Contact Sales</a>
                </GlowingButton>
              </motion.div>
            </div>
          </SciFiCard>
        </motion.div>
      </div>
    </div>
  );
}