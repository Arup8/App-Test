import { createSelector } from '@reduxjs/toolkit';
import { getPriceValue } from '../../utils/currency';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.items
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  items => items.reduce((sum, item) => sum + (getPriceValue(item.price) * item.quantity), 0)
);
