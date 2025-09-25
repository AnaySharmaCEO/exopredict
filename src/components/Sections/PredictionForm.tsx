import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form@7.55.0';
import { SciFiCard } from '../UI/SciFiCard';
import { GlowingButton } from '../UI/GlowingButton';
import { NeonInput } from '../UI/NeonInput';
import { generateRandomInputs, sampleDatasets } from '../../utils/mockApi';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shuffle, Database, Rocket } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PredictionFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      orbital_period: '',
      planet_radius: '',
      transit_depth: '',
      transit_duration: '',
      is_transit: true,
      is_rv: false,
      is_default: false,
    }
  });

  const watchedValues = watch();

  const handleRandomize = () => {
    const randomData = generateRandomInputs();
    Object.entries(randomData).forEach(([key, value]) => {
      setValue(key as any, value);
    });
    toast.success('Random parameters generated!');
  };

  const handleLoadSample = (sampleName: string) => {
    const sampleData = sampleDatasets[sampleName as keyof typeof sampleDatasets];
    if (sampleData) {
      Object.entries(sampleData).forEach(([key, value]) => {
        setValue(key as any, value);
      });
      toast.success(`Loaded data for ${sampleName}`);
    }
  };

  const onFormSubmit = (data: any) => {
    // Convert string inputs to numbers
    const processedData = {
      ...data,
      orbital_period: parseFloat(data.orbital_period),
      planet_radius: parseFloat(data.planet_radius),
      transit_depth: parseFloat(data.transit_depth),
      transit_duration: parseFloat(data.transit_duration),
    };
    
    onSubmit(processedData);
  };

  return (
    <SciFiCard className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-['Orbitron'] text-[#00FFFF] neon-text">
          Planetary Data Input
        </h2>
        
        <div className="flex gap-3">
          <GlowingButton
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleRandomize}
            className="flex items-center gap-2"
          >
            <Shuffle className="h-4 w-4" />
            Randomize
          </GlowingButton>
          
          <Select onValueChange={handleLoadSample}>
            <SelectTrigger className="w-40 glass border-[rgba(0,255,255,0.3)] text-white">
              <SelectValue placeholder="Load Sample" />
            </SelectTrigger>
            <SelectContent className="glass border-[rgba(0,255,255,0.3)] bg-[rgba(16,33,62,0.9)]">
              {Object.keys(sampleDatasets).map((name) => (
                <SelectItem key={name} value={name} className="text-white hover:bg-[rgba(0,255,255,0.1)]">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orbital Period */}
          <NeonInput
            label="Orbital Period (days)"
            type="number"
            step="0.01"
            placeholder="e.g., 365.25"
            {...register('orbital_period', { 
              required: 'Orbital period is required',
              min: { value: 0.1, message: 'Must be greater than 0.1 days' },
              max: { value: 10000, message: 'Must be less than 10,000 days' }
            })}
            error={errors.orbital_period?.message}
          />

          {/* Planet Radius */}
          <NeonInput
            label="Planet Radius (Earth radii)"
            type="number"
            step="0.01"
            placeholder="e.g., 1.0"
            {...register('planet_radius', { 
              required: 'Planet radius is required',
              min: { value: 0.1, message: 'Must be greater than 0.1 Earth radii' },
              max: { value: 20, message: 'Must be less than 20 Earth radii' }
            })}
            error={errors.planet_radius?.message}
          />

          {/* Transit Depth */}
          <NeonInput
            label="Transit Depth (fraction)"
            type="number"
            step="0.0001"
            placeholder="e.g., 0.001"
            {...register('transit_depth', { 
              required: 'Transit depth is required',
              min: { value: 0.0001, message: 'Must be greater than 0.0001' },
              max: { value: 0.1, message: 'Must be less than 0.1' }
            })}
            error={errors.transit_depth?.message}
          />

          {/* Transit Duration */}
          <NeonInput
            label="Transit Duration (hours)"
            type="number"
            step="0.1"
            placeholder="e.g., 4.5"
            {...register('transit_duration', { 
              required: 'Transit duration is required',
              min: { value: 0.1, message: 'Must be greater than 0.1 hours' },
              max: { value: 24, message: 'Must be less than 24 hours' }
            })}
            error={errors.transit_duration?.message}
          />
        </div>

        {/* Detection Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-['Orbitron'] text-[#00FFFF]">
            Detection Methods
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 glass rounded-lg border border-[rgba(0,255,255,0.2)]">
              <Switch
                id="is_transit"
                checked={watchedValues.is_transit}
                onCheckedChange={(checked) => setValue('is_transit', checked)}
              />
              <Label htmlFor="is_transit" className="text-white font-['Rajdhani']">
                Transit Method Detection
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-4 glass rounded-lg border border-[rgba(0,255,255,0.2)]">
              <Switch
                id="is_rv"
                checked={watchedValues.is_rv}
                onCheckedChange={(checked) => setValue('is_rv', checked)}
              />
              <Label htmlFor="is_rv" className="text-white font-['Rajdhani']">
                Radial Velocity Detection
              </Label>
            </div>
          </div>

          <p className="text-sm text-gray-400 font-['Rajdhani']">
            Select the detection methods used in your observations. 
            Combined methods typically provide higher confidence predictions.
          </p>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <GlowingButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3"
            pulse={isLoading}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Database className="h-5 w-5" />
                </motion.div>
                Analyzing Data...
              </>
            ) : (
              <>
                <Rocket className="h-5 w-5" />
                Predict Exoplanet
              </>
            )}
          </GlowingButton>
        </motion.div>
      </form>
    </SciFiCard>
  );
}