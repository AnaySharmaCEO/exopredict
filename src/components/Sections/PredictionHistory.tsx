import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SciFiCard } from '../UI/SciFiCard';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CheckCircle, XCircle, Calendar, Filter, Globe, Trash2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface PredictionResult {
  id: string;
  timestamp: Date;
  inputs: any;
  result: {
    is_exoplanet: boolean;
    confidence: number;
    method: string;
    planet_name?: string;
  };
}

interface PredictionHistoryProps {
  predictions: PredictionResult[];
}

export function PredictionHistory({ predictions }: PredictionHistoryProps) {
  const { dispatch } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPredictions = predictions.filter(prediction => {
    if (filter === 'all') return true;
    if (filter === 'exoplanets') return prediction.result.is_exoplanet;
    if (filter === 'not_exoplanets') return !prediction.result.is_exoplanet;
    if (filter === 'high_confidence') return prediction.result.confidence > 0.8;
    return true;
  });

  const sortedPredictions = [...filteredPredictions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case 'confidence':
        return b.result.confidence - a.result.confidence;
      default:
        return 0;
    }
  });

  const clearHistory = () => {
    localStorage.removeItem('exopredict_predictions');
    dispatch({ type: 'LOAD_PREDICTIONS', payload: [] });
  };

  const selectPrediction = (prediction: PredictionResult) => {
    dispatch({ type: 'SET_CURRENT_PREDICTION', payload: prediction });
  };

  if (predictions.length === 0) {
    return (
      <SciFiCard className="p-12 text-center">
        <Globe className="h-16 w-16 text-[#00FFFF] mx-auto mb-4 opacity-50" />
        <h3 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] mb-2">
          No Predictions Yet
        </h3>
        <p className="text-gray-400 font-['Rajdhani'] mb-6">
          Start making predictions to see your discovery history here.
        </p>
        <Button
          onClick={() => window.location.hash = '#predict'}
          className="bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-black font-bold"
        >
          Make Your First Prediction
        </Button>
      </SciFiCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <SciFiCard className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#00FFFF]" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40 glass border-[rgba(0,255,255,0.3)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass border-[rgba(0,255,255,0.3)] bg-[rgba(16,33,62,0.9)]">
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="exoplanets">Exoplanets Only</SelectItem>
                  <SelectItem value="not_exoplanets">Non-Exoplanets</SelectItem>
                  <SelectItem value="high_confidence">High Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 glass border-[rgba(0,255,255,0.3)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-[rgba(0,255,255,0.3)] bg-[rgba(16,33,62,0.9)]">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="confidence">By Confidence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={clearHistory}
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear History
          </Button>
        </div>

        <div className="mt-4 flex gap-4 text-sm font-['Rajdhani']">
          <span className="text-gray-400">
            Total: <span className="text-white font-semibold">{predictions.length}</span>
          </span>
          <span className="text-gray-400">
            Exoplanets: <span className="text-green-400 font-semibold">
              {predictions.filter(p => p.result.is_exoplanet).length}
            </span>
          </span>
          <span className="text-gray-400">
            Filtered: <span className="text-[#00FFFF] font-semibold">{sortedPredictions.length}</span>
          </span>
        </div>
      </SciFiCard>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sortedPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <SciFiCard 
                className="p-6 cursor-pointer transition-all duration-300 hover:border-[rgba(0,255,255,0.6)]"
                variant={prediction.result.is_exoplanet ? 'success' : 'error'}
                onClick={() => selectPrediction(prediction)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {prediction.result.is_exoplanet ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400" />
                    )}
                    <span className="font-bold font-['Orbitron'] text-[#00FFFF]">
                      {prediction.result.is_exoplanet ? 'Exoplanet' : 'Not Exoplanet'}
                    </span>
                  </div>
                  
                  <Badge 
                    variant={prediction.result.confidence > 0.8 ? 'default' : 'secondary'}
                    className={prediction.result.confidence > 0.8 ? 'bg-green-500/20 text-green-300' : ''}
                  >
                    {(prediction.result.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>

                {prediction.result.planet_name && (
                  <h4 className="text-lg font-semibold text-white mb-2 font-['Orbitron']">
                    {prediction.result.planet_name}
                  </h4>
                )}

                <div className="space-y-2 mb-4 font-['Rajdhani']">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Period:</span>
                    <span className="text-white">{prediction.inputs.orbital_period} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Radius:</span>
                    <span className="text-white">{prediction.inputs.planet_radius} R⊕</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Method:</span>
                    <span className="text-white">{prediction.result.method}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {new Date(prediction.timestamp).toLocaleDateString()}
                  </div>
                  
                  <div className="flex gap-1">
                    {prediction.inputs.is_transit && (
                      <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                        Transit
                      </Badge>
                    )}
                    {prediction.inputs.is_rv && (
                      <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                        RV
                      </Badge>
                    )}
                  </div>
                </div>
              </SciFiCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {sortedPredictions.length === 0 && predictions.length > 0 && (
        <SciFiCard className="p-8 text-center">
          <p className="text-gray-400 font-['Rajdhani']">
            No predictions match the current filter criteria.
          </p>
        </SciFiCard>
      )}
    </div>
  );
}