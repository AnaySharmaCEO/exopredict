import React from 'react';
import { motion } from 'motion/react';
import { SciFiCard } from '../UI/SciFiCard';
import { OrbitVisualization } from '../Visualization/OrbitVisualization';
import { TransitChart } from '../Visualization/TransitChart';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle, XCircle, Globe, Thermometer, Zap, Clock } from 'lucide-react';

interface PredictionResult {
  id: string;
  timestamp: Date;
  inputs: any;
  result: {
    is_exoplanet: boolean;
    confidence: number;
    method: string;
    planet_name?: string;
    orbital_velocity?: number;
    mass_estimate?: number;
    temperature?: number;
  };
}

interface ResultPanelProps {
  prediction: PredictionResult;
}

export function ResultPanel({ prediction }: ResultPanelProps) {
  const { result, inputs } = prediction;
  const isExoplanet = result.is_exoplanet;
  const confidence = result.confidence * 100;

  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return 'text-green-400';
    if (conf >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getVariant = () => {
    if (confidence >= 80) return 'success';
    if (confidence >= 60) return 'warning';
    return 'error';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Main Result Card */}
      <SciFiCard variant={isExoplanet ? 'success' : 'error'} className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {isExoplanet ? (
              <CheckCircle className="h-12 w-12 text-green-400" />
            ) : (
              <XCircle className="h-12 w-12 text-red-400" />
            )}
            <div>
              <h2 className="text-3xl font-bold font-['Orbitron'] text-[#00FFFF]">
                {isExoplanet ? 'Likely Exoplanet' : 'Not an Exoplanet'}
              </h2>
              {result.planet_name && (
                <p className="text-lg text-gray-300 font-['Rajdhani']">
                  Candidate: {result.planet_name}
                </p>
              )}
            </div>
          </div>

          <Badge 
            variant="secondary"
            className="text-lg px-4 py-2 bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-black font-bold"
          >
            {result.method}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Confidence Score */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-['Orbitron'] text-[#00FFFF]">Confidence Score</span>
              <span className={`font-bold font-['Orbitron'] ${getConfidenceColor(confidence)}`}>
                {confidence.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={confidence} 
              className="h-3 bg-[rgba(16,33,62,0.6)]"
            />
          </div>

          {/* Key Parameters */}
          {isExoplanet && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {result.orbital_velocity && (
                <div className="glass p-4 rounded-lg border border-[rgba(0,255,255,0.2)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-[#00FFFF]" />
                    <span className="text-sm text-gray-300">Orbital Velocity</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {result.orbital_velocity} km/s
                  </p>
                </div>
              )}

              {result.mass_estimate && (
                <div className="glass p-4 rounded-lg border border-[rgba(0,255,255,0.2)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-[#00FFFF]" />
                    <span className="text-sm text-gray-300">Mass Estimate</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {result.mass_estimate} M⊕
                  </p>
                </div>
              )}

              {result.temperature && (
                <div className="glass p-4 rounded-lg border border-[rgba(0,255,255,0.2)]">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4 text-[#00FFFF]" />
                    <span className="text-sm text-gray-300">Temperature</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {result.temperature} K
                  </p>
                </div>
              )}

              <div className="glass p-4 rounded-lg border border-[rgba(0,255,255,0.2)]">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[#00FFFF]" />
                  <span className="text-sm text-gray-300">Orbital Period</span>
                </div>
                <p className="text-lg font-bold text-white">
                  {inputs.orbital_period} days
                </p>
              </div>
            </div>
          )}
        </div>
      </SciFiCard>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orbit Visualization */}
        <SciFiCard className="p-6">
          <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
            Orbital Simulation
          </h3>
          <div className="h-80">
            <OrbitVisualization 
              orbitalPeriod={inputs.orbital_period}
              planetRadius={inputs.planet_radius}
              isExoplanet={isExoplanet}
            />
          </div>
        </SciFiCard>

        {/* Transit Chart */}
        <SciFiCard className="p-6">
          <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
            Transit Light Curve
          </h3>
          <div className="h-80">
            <TransitChart 
              transitDepth={inputs.transit_depth}
              transitDuration={inputs.transit_duration}
              orbitalPeriod={inputs.orbital_period}
            />
          </div>
        </SciFiCard>
      </div>

      {/* Input Summary */}
      <SciFiCard className="p-6">
        <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
          Input Parameters Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-400">Orbital Period</p>
            <p className="text-lg font-semibold text-white">{inputs.orbital_period} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Planet Radius</p>
            <p className="text-lg font-semibold text-white">{inputs.planet_radius} R⊕</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Transit Depth</p>
            <p className="text-lg font-semibold text-white">{inputs.transit_depth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Transit Duration</p>
            <p className="text-lg font-semibold text-white">{inputs.transit_duration} hrs</p>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          {inputs.is_transit && (
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              Transit Method
            </Badge>
          )}
          {inputs.is_rv && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              Radial Velocity
            </Badge>
          )}
        </div>
      </SciFiCard>
    </motion.div>
  );
}