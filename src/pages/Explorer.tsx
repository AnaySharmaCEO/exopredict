import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SciFiCard } from '../components/UI/SciFiCard';
import { GlowingButton } from '../components/UI/GlowingButton';
import { Planet3D } from '../components/Visualization/Planet3D';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Filter, Globe, Thermometer, Clock, Ruler } from 'lucide-react';

interface ExoplanetData {
  id: string;
  name: string;
  hostStar: string;
  discoveryYear: number;
  discoveryMethod: string;
  orbitalPeriod: number;
  planetRadius: number;
  mass?: number;
  temperature?: number;
  distance: number;
  habitabilityScore: number;
  description: string;
}

const exoplanetDatabase: ExoplanetData[] = [
  {
    id: '1',
    name: 'Kepler-452b',
    hostStar: 'Kepler-452',
    discoveryYear: 2015,
    discoveryMethod: 'Transit',
    orbitalPeriod: 384.8,
    planetRadius: 1.6,
    mass: 5.0,
    temperature: 265,
    distance: 1402,
    habitabilityScore: 8.5,
    description: 'Often called Earth\'s "older cousin," this potentially rocky planet orbits in the habitable zone of a sun-like star.'
  },
  {
    id: '2',
    name: 'TRAPPIST-1e',
    hostStar: 'TRAPPIST-1',
    discoveryYear: 2017,
    discoveryMethod: 'Transit',
    orbitalPeriod: 6.1,
    planetRadius: 0.92,
    mass: 0.77,
    temperature: 251,
    distance: 40,
    habitabilityScore: 9.2,
    description: 'One of seven Earth-sized planets in the TRAPPIST-1 system, located in the habitable zone with potential for liquid water.'
  },
  {
    id: '3',
    name: 'HD 209458b',
    hostStar: 'HD 209458',
    discoveryYear: 1999,
    discoveryMethod: 'Transit',
    orbitalPeriod: 3.5,
    planetRadius: 1.32,
    mass: 0.73,
    temperature: 1130,
    distance: 159,
    habitabilityScore: 2.1,
    description: 'The first exoplanet detected by the transit method, this hot Jupiter has an extended atmosphere that\'s being stripped away.'
  },
  {
    id: '4',
    name: 'Proxima Centauri b',
    hostStar: 'Proxima Centauri',
    discoveryYear: 2016,
    discoveryMethod: 'Radial Velocity',
    orbitalPeriod: 11.2,
    planetRadius: 1.1,
    mass: 1.27,
    temperature: 234,
    distance: 4.2,
    habitabilityScore: 7.8,
    description: 'The closest known exoplanet to Earth, orbiting our nearest stellar neighbor in the potentially habitable zone.'
  },
  {
    id: '5',
    name: 'TOI-715 b',
    hostStar: 'TOI-715',
    discoveryYear: 2024,
    discoveryMethod: 'Transit',
    orbitalPeriod: 19.3,
    planetRadius: 1.55,
    temperature: 280,
    distance: 137,
    habitabilityScore: 8.9,
    description: 'A recently discovered super-Earth in the habitable zone, representing the cutting edge of exoplanet discovery.'
  },
  {
    id: '6',
    name: 'K2-18 b',
    hostStar: 'K2-18',
    discoveryYear: 2015,
    discoveryMethod: 'Transit',
    orbitalPeriod: 33.0,
    planetRadius: 2.3,
    mass: 8.6,
    temperature: 265,
    distance: 124,
    habitabilityScore: 8.1,
    description: 'A sub-Neptune with confirmed water vapor in its atmosphere, showcasing atmospheric analysis capabilities.'
  }
];

export function Explorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [sortBy, setSortBy] = useState('discovery');
  const [selectedPlanet, setSelectedPlanet] = useState<ExoplanetData | null>(null);

  const filteredPlanets = exoplanetDatabase.filter(planet => {
    const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         planet.hostStar.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === 'all' || planet.discoveryMethod.toLowerCase().includes(filterMethod.toLowerCase());
    return matchesSearch && matchesMethod;
  });

  const sortedPlanets = [...filteredPlanets].sort((a, b) => {
    switch (sortBy) {
      case 'discovery':
        return b.discoveryYear - a.discoveryYear;
      case 'distance':
        return a.distance - b.distance;
      case 'habitability':
        return b.habitabilityScore - a.habitabilityScore;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getHabitabilityColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPlanetColor = (planet: ExoplanetData) => {
    if (planet.habitabilityScore >= 8) return '#4AE54A';
    if (planet.habitabilityScore >= 6) return '#FFD700';
    if (planet.habitabilityScore >= 4) return '#FFA500';
    return '#FF6B6B';
  };

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
            Exoplanet Explorer
          </h1>
          <p className="text-xl text-gray-300 font-['Rajdhani'] max-w-3xl mx-auto">
            Explore confirmed exoplanets discovered by space telescopes and ground-based observatories. 
            Each world represents a unique laboratory for understanding planetary formation and evolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Search and Filters */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter Controls */}
            <SciFiCard className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00FFFF]" />
                  <Input
                    placeholder="Search exoplanets or host stars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass border-[rgba(0,255,255,0.3)] bg-[rgba(16,33,62,0.6)] text-white"
                  />
                </div>
                
                <Select value={filterMethod} onValueChange={setFilterMethod}>
                  <SelectTrigger className="w-48 glass border-[rgba(0,255,255,0.3)]">
                    <Filter className="h-4 w-4 mr-2 text-[#00FFFF]" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-[rgba(0,255,255,0.3)] bg-[rgba(16,33,62,0.9)]">
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="transit">Transit</SelectItem>
                    <SelectItem value="radial">Radial Velocity</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 glass border-[rgba(0,255,255,0.3)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-[rgba(0,255,255,0.3)] bg-[rgba(16,33,62,0.9)]">
                    <SelectItem value="discovery">Discovery Year</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="habitability">Habitability</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4 text-sm text-gray-400 font-['Rajdhani']">
                Showing {sortedPlanets.length} of {exoplanetDatabase.length} confirmed exoplanets
              </div>
            </SciFiCard>

            {/* Exoplanet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedPlanets.map((planet, index) => (
                <motion.div
                  key={planet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <SciFiCard 
                    className="p-6 cursor-pointer h-full transition-all duration-300 hover:border-[rgba(0,255,255,0.6)]"
                    onClick={() => setSelectedPlanet(planet)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold font-['Orbitron'] text-[#00FFFF] mb-1">
                          {planet.name}
                        </h3>
                        <p className="text-sm text-gray-400 font-['Rajdhani']">
                          Host: {planet.hostStar}
                        </p>
                      </div>
                      <Badge 
                        className={`${getHabitabilityColor(planet.habitabilityScore)} bg-transparent border`}
                      >
                        H: {planet.habitabilityScore}/10
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm font-['Rajdhani']">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#00FFFF]" />
                        <span className="text-gray-400">Period:</span>
                        <span className="text-white">{planet.orbitalPeriod}d</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4 text-[#00FFFF]" />
                        <span className="text-gray-400">Radius:</span>
                        <span className="text-white">{planet.planetRadius}R⊕</span>
                      </div>
                      {planet.temperature && (
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-[#00FFFF]" />
                          <span className="text-gray-400">Temp:</span>
                          <span className="text-white">{planet.temperature}K</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#00FFFF]" />
                        <span className="text-gray-400">Distance:</span>
                        <span className="text-white">{planet.distance}ly</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-4 font-['Rajdhani'] line-clamp-3">
                      {planet.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-[rgba(138,43,226,0.2)] text-purple-300">
                        {planet.discoveryMethod}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Discovered {planet.discoveryYear}
                      </span>
                    </div>
                  </SciFiCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Panel - Selected Planet Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {selectedPlanet ? (
                <motion.div
                  key={selectedPlanet.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* 3D Visualization */}
                  <SciFiCard className="p-6">
                    <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
                      {selectedPlanet.name}
                    </h3>
                    <div className="h-64 mb-4">
                      <Planet3D 
                        size={Math.max(0.5, selectedPlanet.planetRadius * 0.5)}
                        color={getPlanetColor(selectedPlanet)}
                      />
                    </div>
                    <p className="text-sm text-gray-300 font-['Rajdhani']">
                      {selectedPlanet.description}
                    </p>
                  </SciFiCard>

                  {/* Detailed Properties */}
                  <SciFiCard className="p-6">
                    <h4 className="text-lg font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
                      Physical Properties
                    </h4>
                    <div className="space-y-3 font-['Rajdhani']">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Host Star:</span>
                        <span className="text-white">{selectedPlanet.hostStar}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Discovery Method:</span>
                        <span className="text-white">{selectedPlanet.discoveryMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Discovery Year:</span>
                        <span className="text-white">{selectedPlanet.discoveryYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orbital Period:</span>
                        <span className="text-white">{selectedPlanet.orbitalPeriod} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Planet Radius:</span>
                        <span className="text-white">{selectedPlanet.planetRadius} R⊕</span>
                      </div>
                      {selectedPlanet.mass && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Planet Mass:</span>
                          <span className="text-white">{selectedPlanet.mass} M⊕</span>
                        </div>
                      )}
                      {selectedPlanet.temperature && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Temperature:</span>
                          <span className="text-white">{selectedPlanet.temperature} K</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Distance:</span>
                        <span className="text-white">{selectedPlanet.distance} light-years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Habitability Score:</span>
                        <span className={getHabitabilityColor(selectedPlanet.habitabilityScore)}>
                          {selectedPlanet.habitabilityScore}/10
                        </span>
                      </div>
                    </div>
                  </SciFiCard>
                </motion.div>
              ) : (
                <SciFiCard className="p-8 text-center">
                  <Globe className="h-16 w-16 text-[#00FFFF] mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-2">
                    Select an Exoplanet
                  </h3>
                  <p className="text-gray-400 font-['Rajdhani']">
                    Click on any exoplanet card to view detailed information and 3D visualization.
                  </p>
                </SciFiCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}