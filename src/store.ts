import create from 'zustand';
import { BacktestingForm } from './types';

interface StoreState {
    formData: BacktestingForm | null;
    setFormData: (data: BacktestingForm) => void;
}

const useStore = create<StoreState>((set) => ({
    formData: null,
    setFormData: (data) => set({ formData: data }),
}));

export default useStore;
