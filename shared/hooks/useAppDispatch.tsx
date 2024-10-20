import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store.tsx';

export const useAppDispatch = () => useDispatch<AppDispatch>();
