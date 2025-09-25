import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TransitChartProps {
  transitDepth: number;
  transitDuration: number;
  orbitalPeriod: number;
}

export function TransitChart({ transitDepth, transitDuration, orbitalPeriod }: TransitChartProps) {
  const data = useMemo(() => {
    const points = [];
    const totalTime = Math.min(orbitalPeriod * 0.1, 48); // Show up to 10% of orbit or 48 hours
    const timeStep = totalTime / 200;
    const transitStart = totalTime * 0.4;
    const transitEnd = transitStart + transitDuration;
    
    for (let i = 0; i <= 200; i++) {
      const time = i * timeStep;
      let flux = 1.0; // Baseline stellar flux
      
      // Add some realistic noise
      flux += (Math.random() - 0.5) * 0.001;
      
      // Transit dip
      if (time >= transitStart && time <= transitEnd) {
        const transitProgress = (time - transitStart) / transitDuration;
        
        // Create a realistic transit shape (ingress, flat bottom, egress)
        if (transitProgress < 0.1) {
          // Ingress
          const ingressDepth = (transitProgress / 0.1) * transitDepth;
          flux = 1.0 - ingressDepth;
        } else if (transitProgress > 0.9) {
          // Egress
          const egressDepth = ((1 - transitProgress) / 0.1) * transitDepth;
          flux = 1.0 - egressDepth;
        } else {
          // Flat bottom
          flux = 1.0 - transitDepth;
        }
      }
      
      points.push({
        time: time,
        flux: flux,
        isTransit: time >= transitStart && time <= transitEnd,
      });
    }
    
    return points;
  }, [transitDepth, transitDuration, orbitalPeriod]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border border-[rgba(0,255,255,0.3)] p-3 rounded-lg">
          <p className="text-[#00FFFF] font-['Orbitron']">{`Time: ${label.toFixed(2)} hours`}</p>
          <p className="text-white font-['Rajdhani']">{`Flux: ${payload[0].value.toFixed(6)}`}</p>
          {payload[0].payload.isTransit && (
            <p className="text-yellow-400 font-['Rajdhani']">Transit Event</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(0,255,255,0.2)" 
          />
          <XAxis 
            dataKey="time" 
            stroke="#00FFFF"
            style={{ fontFamily: 'Rajdhani', fontSize: '12px' }}
            label={{ value: 'Time (hours)', position: 'insideBottom', offset: -10, fill: '#00FFFF' }}
          />
          <YAxis 
            stroke="#00FFFF"
            style={{ fontFamily: 'Rajdhani', fontSize: '12px' }}
            domain={['dataMin - 0.001', 'dataMax + 0.001']}
            label={{ value: 'Relative Flux', angle: -90, position: 'insideLeft', fill: '#00FFFF' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="flux" 
            stroke="#00FFFF" 
            strokeWidth={2}
            dot={false}
            activeDot={{ 
              r: 4, 
              fill: '#8A2BE2',
              stroke: '#00FFFF',
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 p-3 glass rounded-lg border border-[rgba(0,255,255,0.2)]">
        <h4 className="text-sm font-bold text-[#00FFFF] mb-2 font-['Orbitron']">Transit Analysis</h4>
        <div className="grid grid-cols-2 gap-4 text-sm font-['Rajdhani']">
          <div>
            <span className="text-gray-400">Depth:</span>
            <span className="text-white ml-2">{(transitDepth * 100).toFixed(4)}%</span>
          </div>
          <div>
            <span className="text-gray-400">Duration:</span>
            <span className="text-white ml-2">{transitDuration} hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}