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
      const langCode = action.payload;
      if (translations[langCode]) {
        state.selectedLanguage = langCode;
        state.translations = translations[langCode];
      } else {
        console.warn(`Translation not found for language code: ${langCode}`);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
