import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@/app/store.tsx';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
