export const formatCurrency = (value) => {
  if (typeof value !== 'number') {
    // Convert string price to number by removing currency symbol and /kg
    const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return '₹0.00';
    return `₹${numericValue.toFixed(2)}`;
  }
  return `₹${value.toFixed(2)}`;
};

// Helper function to extract numeric value from price string
export const getPriceValue = (price) => {
  if (typeof price === 'number') return price;
  return parseFloat(price.toString().replace(/[^0-9.]/g, '')) || 0;
};
