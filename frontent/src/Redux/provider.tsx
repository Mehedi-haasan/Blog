// Redux/provider.tsx

import { Provider } from 'react-redux';
import { store } from './store';
import { useRef, ReactNode } from 'react'; // Import ReactNode type

interface StoreProviderProps {
    children: ReactNode; // Define children prop as ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
    const storeRef = useRef(store());
    return <Provider store={storeRef.current}>
        {children}
    </Provider>;
}
