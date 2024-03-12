import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorState {
    color: string;
}

const initialState: ColorState = {
    color: "#000",
};

const changeColorSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        changeColor(state, action: PayloadAction<string>) {
            state.color = `#FFF` || action.payload;
        }
    },
});

export const { changeColor } = changeColorSlice.actions;

export default changeColorSlice.reducer;
