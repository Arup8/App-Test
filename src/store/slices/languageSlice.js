import { createSlice } from '@reduxjs/toolkit';
import { translations } from '../../translations';

const initialState = {
  selectedLanguage: 'en',
  translations: translations.en,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      state.translations = translations[action.payload];
    },
  },
});

export const { setLanguage, setTranslations } = languageSlice.actions;
export default languageSlice.reducer;
