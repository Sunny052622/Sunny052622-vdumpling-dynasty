export const CARD_FEE = 301;
export const DISCOUNT_RATE = 0.10;
export const MONTHS_IN_YEAR = 12;
export const ANNUAL_RETURN_RATE = 0.12;

export function calculateSavings(visits, orderValue) {
  const yearlySpend = visits * orderValue * MONTHS_IN_YEAR;
  const grossSavings = yearlySpend * DISCOUNT_RATE;
  const netSavings = grossSavings - CARD_FEE;
  const multiplier = CARD_FEE > 0 ? netSavings / CARD_FEE : 0;
  return { yearlySpend, grossSavings, netSavings, multiplier };
}

export function calculateSIPFutureValue(netSavings) {
  const monthlySavings = netSavings / 12;
  const monthlyRate = ANNUAL_RETURN_RATE / 12;
  const futureValue =
    monthlySavings *
    ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) *
    (1 + monthlyRate);
  return { monthlySavings, futureValue };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getMultiplierMessage(multiplier) {
  if (multiplier >= 10) return `Amazing! You save ${multiplier.toFixed(0)}X the card cost!`;
  if (multiplier >= 5) return `Excellent! You save ${multiplier.toFixed(1)}X the card cost!`;
  if (multiplier >= 2) return `Great value! You save ${multiplier.toFixed(1)}X the card cost!`;
  return `The VIP card pays for itself ${multiplier.toFixed(1)}X over!`;
}

const rewards = {
  tier1: [
    'Treat yourself to a couple of nice coffee dates.',
    'Grab tickets for that new movie you wanted to watch.',
    'Order your favorite premium dessert or meal.',
    'Buy that bestselling book you\'ve been eyeing.',
    'Upgrade your streaming service subscription.',
    'Get a nice potted plant for your desk.',
  ],
  tier2: [
    'Buy a premium pair of wireless earbuds.',
    'Get a sleek new smartwatch or fitness tracker.',
    'Upgrade your wardrobe with some nice outfits.',
    'Treat yourself and a friend to a fine-dining dinner.',
    'Book a relaxing spa day or massage.',
    'Invest in some high-quality skincare products.',
  ],
  tier3: [
    'Fund a relaxing weekend getaway trip.',
    'Upgrade your home setup with a new monitor or chair.',
    'Buy a mid-range tablet for reading and entertainment.',
    'Get a premium coffee machine for your kitchen.',
    'Book a domestic round-trip flight for your next vacation.',
    'Invest in a high-quality piece of jewelry.',
  ],
  tier4: [
    'Buy a brand new flagship smartphone.',
    'Upgrade to a next-gen gaming console.',
    'Fund a multi-day international vacation.',
    'Get a premium lightweight laptop.',
    'Invest in a high-end mirrorless camera.',
    'Buy a luxury designer accessory.',
  ],
};

export function getRandomReward(netSavings) {
  let tier;
  if (netSavings < 2000) tier = rewards.tier1;
  else if (netSavings < 10000) tier = rewards.tier2;
  else if (netSavings < 30000) tier = rewards.tier3;
  else tier = rewards.tier4;
  return tier[Math.floor(Math.random() * tier.length)];
}

export function generatePaymentCode(mobile) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomCode = Array.from({ length: 3 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join('');
  return randomCode + mobile;
}
