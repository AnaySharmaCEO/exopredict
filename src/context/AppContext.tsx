import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface PredictionResult {
  id: string;
  timestamp: Date;
  inputs: {
    orbital_period: number;
    planet_radius: number;
    transit_depth: number;
    transit_duration: number;
    is_transit: boolean;
    is_rv: boolean;
    is_default: boolean;
  };
  result: {
    is_exoplanet: boolean;
    confidence: number;
    method: string;
    planet_name?: string;
  };
}

interface AppState {
  predictions: PredictionResult[];
  currentPrediction: PredictionResult | null;
  isLoading: boolean;
}

type AppAction = 
  | { type: 'ADD_PREDICTION'; payload: PredictionResult }
  | { type: 'SET_CURRENT_PREDICTION'; payload: PredictionResult | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_PREDICTIONS'; payload: PredictionResult[] };

const initialState: AppState = {
  predictions: [],
  currentPrediction: null,
  isLoading: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_PREDICTION':
      const newPredictions = [action.payload, ...state.predictions];
      // Store in localStorage
      localStorage.setItem('exopredict_predictions', JSON.stringify(newPredictions));
      return {
        ...state,
        predictions: newPredictions,
        currentPrediction: action.payload,
      };
    case 'SET_CURRENT_PREDICTION':
      return {
        ...state,
        currentPrediction: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'LOAD_PREDICTIONS':
      return {
        ...state,
        predictions: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load predictions from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('exopredict_predictions');
    if (stored) {
      try {
        const predictions = JSON.parse(stored).map((p: any) => ({
          ...p,
          timestamp: new Date(p.timestamp),
        }));
        dispatch({ type: 'LOAD_PREDICTIONS', payload: predictions });
      } catch (error) {
        console.warn('Failed to load stored predictions:', error);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}