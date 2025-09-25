// Mock API for ExoPredict predictions
interface PredictionInput {
  orbital_period: number;
  planet_radius: number;
  transit_depth: number;
  transit_duration: number;
  is_transit: boolean;
  is_rv: boolean;
  is_default: boolean;
}

interface PredictionResult {
  is_exoplanet: boolean;
  confidence: number;
  method: string;
  planet_name?: string;
  orbital_velocity?: number;
  mass_estimate?: number;
  temperature?: number;
}

// Generate realistic planet names
const starNames = [
  'Kepler', 'TRAPPIST', 'HD', 'WASP', 'HAT-P', 'TrES', 'XO', 'CoRoT',
  'K2', 'TOI', 'LP', 'GJ', 'Proxima', 'Wolf', 'Ross', 'LHS'
];

const planetSuffixes = ['b', 'c', 'd', 'e', 'f', 'g', 'h'];

function generatePlanetName(): string {
  const star = starNames[Math.floor(Math.random() * starNames.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  const suffix = planetSuffixes[Math.floor(Math.random() * planetSuffixes.length)];
  return `${star}-${number}${suffix}`;
}

// Mock prediction algorithm
export async function predictExoplanet(inputs: PredictionInput): Promise<PredictionResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

  const {
    orbital_period,
    planet_radius,
    transit_depth,
    transit_duration,
    is_transit,
    is_rv
  } = inputs;

  // Realistic prediction logic based on actual exoplanet detection methods
  let confidence = 0;
  let method = 'Unknown';

  if (is_transit) {
    method = 'Transit Method';
    // Transit method confidence based on depth and duration
    const depthScore = Math.min(transit_depth * 100, 1);
    const durationScore = Math.min(transit_duration / 10, 1);
    const periodScore = orbital_period > 0.5 && orbital_period < 1000 ? 1 : 0.5;
    confidence = (depthScore + durationScore + periodScore) / 3;
  }

  if (is_rv) {
    method = is_transit ? 'Combined Transit + RV' : 'Radial Velocity';
    // RV method confidence
    const massEffect = planet_radius > 1 ? 0.8 : 0.6;
    const orbitalEffect = orbital_period > 1 && orbital_period < 100 ? 0.9 : 0.7;
    const rvConfidence = (massEffect + orbitalEffect) / 2;
    
    if (is_transit) {
      confidence = (confidence + rvConfidence) / 2;
    } else {
      confidence = rvConfidence;
    }
  }

  // Add some realistic noise
  confidence += (Math.random() - 0.5) * 0.2;
  confidence = Math.max(0.1, Math.min(0.95, confidence));

  const is_exoplanet = confidence > 0.6;

  // Generate additional properties for confirmed exoplanets
  const result: PredictionResult = {
    is_exoplanet,
    confidence: Math.round(confidence * 100) / 100,
    method,
  };

  if (is_exoplanet) {
    result.planet_name = generatePlanetName();
    result.orbital_velocity = Math.round((29.78 * Math.sqrt(1 / orbital_period)) * 100) / 100; // km/s
    result.mass_estimate = Math.round((planet_radius ** 2.06) * 100) / 100; // Earth masses
    result.temperature = Math.round((278 * Math.pow(1 / orbital_period, 0.25)) * 100) / 100; // Kelvin
  }

  return result;
}

// Generate random test data
export function generateRandomInputs(): PredictionInput {
  const orbital_period = Math.round((Math.random() * 100 + 0.5) * 100) / 100;
  const planet_radius = Math.round((Math.random() * 5 + 0.3) * 100) / 100;
  const transit_depth = Math.round((Math.random() * 0.02 + 0.001) * 10000) / 10000;
  const transit_duration = Math.round((Math.random() * 8 + 0.5) * 100) / 100;
  
  return {
    orbital_period,
    planet_radius,
    transit_depth,
    transit_duration,
    is_transit: Math.random() > 0.3,
    is_rv: Math.random() > 0.4,
    is_default: false,
  };
}

// Sample datasets for testing
export const sampleDatasets = {
  'Kepler-452b': {
    orbital_period: 384.8,
    planet_radius: 1.6,
    transit_depth: 0.0012,
    transit_duration: 12.5,
    is_transit: true,
    is_rv: false,
    is_default: true,
  },
  'TRAPPIST-1e': {
    orbital_period: 6.1,
    planet_radius: 0.92,
    transit_depth: 0.0008,
    transit_duration: 1.4,
    is_transit: true,
    is_rv: true,
    is_default: true,
  },
  'HD 209458b': {
    orbital_period: 3.5,
    planet_radius: 1.32,
    transit_depth: 0.015,
    transit_duration: 3.1,
    is_transit: true,
    is_rv: true,
    is_default: true,
  },
};