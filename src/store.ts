import create from 'zustand';
import { Strategy, SuperStrategy } from './types';

interface StoreState {
    strategies: Strategy[];
    superStrategies: SuperStrategy[];
    addStrategy: (strategy: Strategy) => void;
    removeStrategy: (index: number) => void;
    addSuperStrategy: (superStrategy: SuperStrategy) => void;
    removeSuperStrategy: (index: number) => void;
}

const useStore = create<StoreState>((set) => ({
    strategies: [],
    superStrategies: [],
    addStrategy: (strategy) => set((state) => ({ strategies: [...state.strategies, strategy] })),
    removeStrategy: (index) => set((state) => ({ strategies: state.strategies.filter((_, i) => i !== index) })),
    addSuperStrategy: (superStrategy) => set((state) => ({ superStrategies: [...state.superStrategies, superStrategy] })),
    removeSuperStrategy: (index) => set((state) => ({ superStrategies: state.superStrategies.filter((_, i) => i !== index) })),
}));

export default useStore;
