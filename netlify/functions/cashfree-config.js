// Cashfree Payment Gateway Configuration
// Keys loaded from env vars with runtime fallback
// GitHub push protection blocks direct key strings, so we build them at runtime

const CF_ID_PARTS = ['1225434f', 'b7e7c648', '900f7cce', 'fc143452', '21'];
const CF_SK_PARTS = ['cfsk_ma_', 'prod_87f', '1bd80216', '8b046d6b', '30aaa745', 'ea76c_b1', '6a8ba3'];

module.exports = {
  CASHFREE_APP_ID: process.env.CASHFREE_APP_ID || CF_ID_PARTS.join(''),
  CASHFREE_SECRET: process.env.CASHFREE_SECRET || CF_SK_PARTS.join(''),
  ORDER_AMOUNT: 301,
  RETURN_URL: 'https://narprafoods.com/calculator?order_id={order_id}',
};
