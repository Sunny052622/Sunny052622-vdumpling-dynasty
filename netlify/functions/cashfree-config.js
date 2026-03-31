// Cashfree Payment Gateway Configuration
// All keys must be set in Netlify environment variables

module.exports = {
  CASHFREE_APP_ID: process.env.CASHFREE_APP_ID,
  CASHFREE_SECRET: process.env.CASHFREE_SECRET,
  ORDER_AMOUNT: 301,
  RETURN_URL: 'https://narprafoods.com/calculator?order_id={order_id}',
};
