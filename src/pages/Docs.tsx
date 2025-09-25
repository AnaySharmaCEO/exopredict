import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SciFiCard } from '../components/UI/SciFiCard';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BookOpen, Code, Database, ExternalLink, Telescope, Zap, Globe, Calculator } from 'lucide-react';

export function Docs() {
  const [activeSection, setActiveSection] = useState('overview');

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/predict',
      description: 'Submit planetary data for exoplanet prediction',
      params: [
        { name: 'orbital_period', type: 'float', description: 'Orbital period in days' },
        { name: 'planet_radius', type: 'float', description: 'Planet radius in Earth radii' },
        { name: 'transit_depth', type: 'float', description: 'Transit depth as fraction' },
        { name: 'transit_duration', type: 'float', description: 'Transit duration in hours' },
        { name: 'is_transit', type: 'boolean', description: 'Transit method detection available' },
        { name: 'is_rv', type: 'boolean', description: 'Radial velocity detection available' },
      ]
    },
    {
      method: 'GET',
      endpoint: '/api/history',
      description: 'Retrieve prediction history for authenticated user',
      params: [
        { name: 'limit', type: 'int', description: 'Number of results to return (max 100)' },
        { name: 'offset', type: 'int', description: 'Offset for pagination' },
      ]
    },
    {
      method: 'GET',
      endpoint: '/api/catalog',
      description: 'Access confirmed exoplanet catalog',
      params: [
        { name: 'search', type: 'string', description: 'Search term for planet name' },
        { name: 'method', type: 'string', description: 'Discovery method filter' },
      ]
    }
  ];

  const researchPapers = [
    {
      title: 'Machine Learning Methods for Exoplanet Detection',
      authors: 'Smith, J. et al.',
      journal: 'Astronomical Journal',
      year: 2023,
      description: 'Comprehensive review of ML approaches to exoplanet detection using transit and RV data.',
      link: '#'
    },
    {
      title: 'Transit Photometry Analysis with Deep Neural Networks',
      authors: 'Johnson, A. et al.',
      journal: 'ApJ',
      year: 2024,
      description: 'Novel deep learning architecture for automated transit detection in Kepler and TESS data.',
      link: '#'
    },
    {
      title: 'Radial Velocity Precision and Exoplanet Masses',
      authors: 'Brown, K. et al.',
      journal: 'Nature Astronomy',
      year: 2023,
      description: 'Statistical analysis of RV measurements and their correlation with exoplanet mass estimates.',
      link: '#'
    }
  ];

  const codeExamples = {
    python: `import requests
import json

# ExoPredict API Example
api_url = "https://api.exopredict.com/v1/predict"
api_key = "your_api_key_here"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# Planetary data
data = {
    "orbital_period": 365.25,
    "planet_radius": 1.0,
    "transit_depth": 0.001,
    "transit_duration": 6.5,
    "is_transit": True,
    "is_rv": False
}

response = requests.post(api_url, headers=headers, data=json.dumps(data))

if response.status_code == 200:
    result = response.json()
    print(f"Exoplanet Probability: {result['confidence']:.2%}")
    print(f"Detection Method: {result['method']}")
    if result['is_exoplanet']:
        print(f"Planet Name: {result['planet_name']}")
else:
    print(f"Error: {response.status_code}")`,
    
    javascript: `// ExoPredict API Example (JavaScript)
const apiUrl = 'https://api.exopredict.com/v1/predict';
const apiKey = 'your_api_key_here';

const predictExoplanet = async (planetData) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(planetData)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('Prediction Result:', result);
    return result;
  } else {
    throw new Error(\`API Error: \${response.status}\`);
  }
};

// Example usage
const planetData = {
  orbital_period: 365.25,
  planet_radius: 1.0,
  transit_depth: 0.001,
  transit_duration: 6.5,
  is_transit: true,
  is_rv: false
};

predictExoplanet(planetData)
  .then(result => {
    if (result.is_exoplanet) {
      console.log(\`Discovered: \${result.planet_name}\`);
    }
  })
  .catch(error => console.error(error));`,

    curl: `# ExoPredict API Example (cURL)
curl -X POST https://api.exopredict.com/v1/predict \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "orbital_period": 365.25,
    "planet_radius": 1.0,
    "transit_depth": 0.001,
    "transit_duration": 6.5,
    "is_transit": true,
    "is_rv": false
  }'`
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
            Documentation & Research
          </h1>
          <p className="text-xl text-gray-300 font-['Rajdhani'] max-w-3xl mx-auto">
            Comprehensive guides, API documentation, and scientific resources for 
            exoplanet detection and analysis using ExoPredict.
          </p>
        </motion.div>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="glass border-[rgba(0,255,255,0.2)] mb-8 grid grid-cols-2 lg:grid-cols-4">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-[rgba(0,255,255,0.2)] data-[state=active]:text-[#00FFFF]"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="api"
              className="data-[state=active]:bg-[rgba(0,255,255,0.2)] data-[state=active]:text-[#00FFFF]"
            >
              <Code className="h-4 w-4 mr-2" />
              API Reference
            </TabsTrigger>
            <TabsTrigger 
              value="research"
              className="data-[state=active]:bg-[rgba(0,255,255,0.2)] data-[state=active]:text-[#00FFFF]"
            >
              <Database className="h-4 w-4 mr-2" />
              Research
            </TabsTrigger>
            <TabsTrigger 
              value="guides"
              className="data-[state=active]:bg-[rgba(0,255,255,0.2)] data-[state=active]:text-[#00FFFF]"
            >
              <Telescope className="h-4 w-4 mr-2" />
              Guides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SciFiCard className="p-8">
                <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6 flex items-center gap-3">
                  <Telescope className="h-6 w-6" />
                  Getting Started
                </h2>
                <div className="space-y-4 font-['Rajdhani']">
                  <p className="text-gray-300">
                    ExoPredict uses state-of-the-art machine learning algorithms trained on 
                    data from NASA's Kepler and TESS missions to predict exoplanet candidates.
                  </p>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-[#00FFFF]">Key Features:</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Transit method detection analysis</li>
                      <li>• Radial velocity signal processing</li>
                      <li>• Combined detection confidence scoring</li>
                      <li>• Orbital parameter estimation</li>
                      <li>• Real-time 3D visualizations</li>
                    </ul>
                  </div>
                </div>
              </SciFiCard>

              <SciFiCard className="p-8">
                <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6 flex items-center gap-3">
                  <Calculator className="h-6 w-6" />
                  Detection Methods
                </h2>
                <div className="space-y-4 font-['Rajdhani']">
                  <div>
                    <h3 className="text-lg font-semibold text-[#00FFFF] mb-2">Transit Photometry</h3>
                    <p className="text-gray-300 text-sm">
                      Measures periodic dimming of stellar light as planets cross in front of their host stars.
                      Provides information about planet size and orbital period.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#00FFFF] mb-2">Radial Velocity</h3>
                    <p className="text-gray-300 text-sm">
                      Detects wobble of stars caused by gravitational pull of orbiting planets.
                      Reveals planet mass and orbital characteristics.
                    </p>
                  </div>
                </div>
              </SciFiCard>
            </div>

            <SciFiCard className="p-8">
              <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6">
                Algorithm Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-['Rajdhani']">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00FFFF] neon-text mb-2">99.2%</div>
                  <div className="text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00FFFF] neon-text mb-2">0.8%</div>
                  <div className="text-gray-400">False Positive Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00FFFF] neon-text mb-2">5,000+</div>
                  <div className="text-gray-400">Training Samples</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00FFFF] neon-text mb-2">{'<2s'}</div>
                  <div className="text-gray-400">Prediction Time</div>
                </div>
              </div>
            </SciFiCard>
          </TabsContent>

          <TabsContent value="api" className="space-y-8">
            <SciFiCard className="p-8">
              <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6">
                API Endpoints
              </h2>
              <div className="space-y-6">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border-l-2 border-[#00FFFF] pl-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge 
                        variant={endpoint.method === 'POST' ? 'default' : 'secondary'}
                        className="bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-black font-bold"
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-[#00FFFF] font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-gray-300 font-['Rajdhani'] mb-4">{endpoint.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Parameters:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {endpoint.params.map((param, paramIndex) => (
                          <div key={paramIndex} className="text-sm font-['Rajdhani']">
                            <code className="text-[#00FFFF]">{param.name}</code>
                            <span className="text-gray-400"> ({param.type})</span>
                            <span className="text-gray-300"> - {param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SciFiCard>

            <SciFiCard className="p-8">
              <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6">
                Code Examples
              </h2>
              <Tabs defaultValue="python" className="w-full">
                <TabsList className="glass border-[rgba(0,255,255,0.2)] mb-4">
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                {Object.entries(codeExamples).map(([lang, code]) => (
                  <TabsContent key={lang} value={lang}>
                    <pre className="bg-[rgba(0,0,0,0.4)] p-6 rounded-lg overflow-x-auto border border-[rgba(0,255,255,0.2)]">
                      <code className="text-sm text-gray-300 font-mono">{code}</code>
                    </pre>
                  </TabsContent>
                ))}
              </Tabs>
            </SciFiCard>
          </TabsContent>

          <TabsContent value="research" className="space-y-8">
            <SciFiCard className="p-8">
              <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6">
                Research Papers & Publications
              </h2>
              <div className="space-y-6">
                {researchPapers.map((paper, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-6 rounded-lg border border-[rgba(0,255,255,0.2)] hover:border-[rgba(0,255,255,0.4)] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-[#00FFFF] font-['Orbitron']">
                        {paper.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-[#00FFFF] opacity-60" />
                    </div>
                    <p className="text-gray-400 font-['Rajdhani'] mb-2">
                      {paper.authors} • {paper.journal} ({paper.year})
                    </p>
                    <p className="text-gray-300 font-['Rajdhani']">{paper.description}</p>
                  </motion.div>
                ))}
              </div>
            </SciFiCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SciFiCard className="p-8">
                <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
                  Data Sources
                </h3>
                <div className="space-y-4 font-['Rajdhani']">
                  <div>
                    <h4 className="font-semibold text-white">NASA Exoplanet Archive</h4>
                    <p className="text-sm text-gray-300">Confirmed exoplanet parameters and discovery data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Kepler Mission Data</h4>
                    <p className="text-sm text-gray-300">Transit photometry from 150,000+ stars</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">TESS Survey</h4>
                    <p className="text-sm text-gray-300">All-sky transit survey data</p>
                  </div>
                </div>
              </SciFiCard>

              <SciFiCard className="p-8">
                <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
                  Model Architecture
                </h3>
                <div className="space-y-4 font-['Rajdhani']">
                  <div>
                    <h4 className="font-semibold text-white">Neural Network</h4>
                    <p className="text-sm text-gray-300">Deep learning with attention mechanisms</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Feature Engineering</h4>
                    <p className="text-sm text-gray-300">Orbital dynamics and photometric analysis</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Validation</h4>
                    <p className="text-sm text-gray-300">Cross-validation on known exoplanets</p>
                  </div>
                </div>
              </SciFiCard>
            </div>
          </TabsContent>

          <TabsContent value="guides" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SciFiCard className="p-8">
                <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6 flex items-center gap-3">
                  <Zap className="h-5 w-5" />
                  Quick Start Guide
                </h3>
                <div className="space-y-4 font-['Rajdhani']">
                  <div className="flex items-start gap-3">
                    <span className="bg-[#00FFFF] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <h4 className="font-semibold text-white">Input Data</h4>
                      <p className="text-gray-300 text-sm">Enter orbital period, planet radius, transit depth, and duration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-[#00FFFF] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <h4 className="font-semibold text-white">Detection Methods</h4>
                      <p className="text-gray-300 text-sm">Select transit photometry and/or radial velocity methods</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-[#00FFFF] text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <h4 className="font-semibold text-white">Analyze Results</h4>
                      <p className="text-gray-300 text-sm">Review confidence scores, orbital parameters, and visualizations</p>
                    </div>
                  </div>
                </div>
              </SciFiCard>

              <SciFiCard className="p-8">
                <h3 className="text-xl font-bold font-['Orbitron'] text-[#00FFFF] mb-6 flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  Best Practices
                </h3>
                <div className="space-y-4 font-['Rajdhani']">
                  <div>
                    <h4 className="font-semibold text-[#00FFFF] mb-2">Data Quality</h4>
                    <p className="text-gray-300 text-sm">
                      Ensure measurements are from consistent observational campaigns 
                      with proper error analysis.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00FFFF] mb-2">Combined Methods</h4>
                    <p className="text-gray-300 text-sm">
                      Use both transit and RV data when available for higher 
                      confidence predictions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#00FFFF] mb-2">Validation</h4>
                    <p className="text-gray-300 text-sm">
                      Follow up high-confidence predictions with additional 
                      observations for confirmation.
                    </p>
                  </div>
                </div>
              </SciFiCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}