import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { predictExoplanet, generateRandomInputs, sampleDatasets } from '../utils/mockApi';
import { PredictionForm } from '../components/Sections/PredictionForm';
import { ResultPanel } from '../components/Sections/ResultPanel';
import { ScientificSidebar } from '../components/Sections/ScientificSidebar';
import { PredictionHistory } from '../components/Sections/PredictionHistory';
import { SciFiCard } from '../components/UI/SciFiCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function Dashboard() {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('predict');

  const handlePrediction = async (inputs: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const result = await predictExoplanet(inputs);
      
      const prediction = {
        id: Date.now().toString(),
        timestamp: new Date(),
        inputs,
        result,
      };
      
      dispatch({ type: 'ADD_PREDICTION', payload: prediction });
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
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
            Exoplanet Prediction Dashboard
          </h1>
          <p className="text-xl text-gray-300 font-['Rajdhani'] max-w-3xl mx-auto">
            Enter planetary observation data to predict exoplanet candidates using 
            advanced machine learning algorithms trained on NASA's confirmed discoveries.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Column - Form and Results */}
          <div className="xl:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="glass border-[rgba(0,255,255,0.2)] mb-8">
                <TabsTrigger 
                  value="predict" 
                  className="data-[state=active]:bg-[rgba(0,255,255,0.2)] data-[state=active]:text-[#00FFFF]"
                >
                  Prediction Lab
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  className="data-[state=active]:bg-[rgba(0,255,255,0.2)] data-[state=active]:text-[#00FFFF]"
                >
                  History ({state.predictions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="predict" className="space-y-8">
                {/* Prediction Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <PredictionForm 
                    onSubmit={handlePrediction}
                    isLoading={state.isLoading}
                  />
                </motion.div>

                {/* Results */}
                {state.currentPrediction && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ResultPanel prediction={state.currentPrediction} />
                  </motion.div>
                )}

                {/* Quick Start Guide */}
                {!state.currentPrediction && !state.isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <SciFiCard className="p-8">
                      <h3 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-4">
                        Quick Start Guide
                      </h3>
                      <div className="space-y-4 text-gray-300 font-['Rajdhani']">
                        <p>1. <strong>Fill in planetary data</strong> - Use the form above to enter observation parameters</p>
                        <p>2. <strong>Try sample data</strong> - Click "Load Sample" to use data from known exoplanets</p>
                        <p>3. <strong>Generate random data</strong> - Click "Randomize" for realistic test parameters</p>
                        <p>4. <strong>Analyze results</strong> - View confidence scores, orbital parameters, and visualizations</p>
                      </div>
                    </SciFiCard>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="history">
                <PredictionHistory predictions={state.predictions} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Scientific Sidebar */}
          <div className="xl:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ScientificSidebar />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}