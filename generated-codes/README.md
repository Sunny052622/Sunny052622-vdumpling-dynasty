# Discount Codes for POS Configuration

This folder contains 100 unique discount codes generated for the VDD Momo Game reward system.

## Files Generated

1. **discount-codes.csv** - CSV format with columns: Code, Discount, Status
   - Suitable for importing into most POS systems
   - Includes header row for easy import

2. **discount-codes.txt** - Plain text format, one code per line
   - Simple format for manual entry or basic systems

3. **discount-codes.json** - JSON format with metadata
   - Includes generation timestamp and full details
   - Suitable for API integration or advanced systems

## Code Format

- **Length**: 8 characters
- **Format**: Alphanumeric (letters and numbers mixed)
- **Discount**: 20% OFF
- **Status**: Active

## Usage Instructions

### For POS System Configuration:

1. **CSV Import** (Recommended):
   - Open `discount-codes.csv` in Excel or your POS system
   - Import the CSV file into your POS discount codes section
   - Ensure the discount percentage is set to 20%

2. **Manual Entry**:
   - Use `discount-codes.txt` for manual entry
   - Copy codes one by one into your POS system

3. **API Integration**:
   - Use `discount-codes.json` if your POS system supports JSON import
   - The JSON includes metadata like generation date and status

## Regenerating Codes

To generate a new set of 100 codes, run:

```bash
node scripts/generate-codes.js
```

This will create new files in this folder. Make sure to backup existing codes before regenerating.

## Important Notes

- Each code is unique and can only be used once
- Codes are valid for 20% discount
- Codes are generated when customers win the Momo Game
- Store these codes securely and configure them in your POS system before going live

## Code Validation

When a customer provides a code at checkout:
1. Verify the code exists in your POS system
2. Apply 20% discount
3. Mark the code as used (if your POS supports this)
4. If code is invalid or already used, inform the customer
