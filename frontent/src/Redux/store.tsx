// Redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/index'; // Assuming you've combined your slices into a single file
import  changeColorReducer  from './slices/changeColor';





export const store = () => configureStore({
    reducer: {
        ChangeColor: changeColorReducer
    }
});
