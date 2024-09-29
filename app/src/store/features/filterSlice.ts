import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  AUTORS: string[];
  DATES: string[];
  GENRES: string[];
}

const initialState: Filters = {
  AUTORS: [],
  DATES: [],
  GENRES: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      return action.payload;
    },
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
