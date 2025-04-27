import { persistor } from '@/app/store/store';
import { useEffect, useState } from 'react';

export default function useRehydrated() {
  const [rehydrated, setRehydrated] = useState(persistor.getState().bootstrapped);
  console.log(persistor.getState().registry);
  
  useEffect(() => {
    if (rehydrated) return;

    const unsubscribe = persistor.subscribe(() => {
      const state = persistor.getState();
      console.log(state);
      
      if (state.bootstrapped) {
        setRehydrated(true);
      }
    });

    return () => unsubscribe();
  }, [rehydrated]);

  return rehydrated;
}