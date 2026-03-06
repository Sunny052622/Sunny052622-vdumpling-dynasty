/**
 * Utility script to generate 100 unique discount codes for POS configuration
 * Run with: node scripts/generate-codes.js
 */

// Generate a unique code (8 characters: 4 letters + 4 numbers)
const generateUniqueCode = () => {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Excluding I and O to avoid confusion
    const numbers = '0123456789';
    
    let code = '';
    // Add 4 random letters
    for (let i = 0; i < 4; i++) {
        code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    // Add 4 random numbers
    for (let i = 0; i < 4; i++) {
        code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    // Shuffle the code to mix letters and numbers
    return code.split('').sort(() => Math.random() - 0.5).join('');
};

// Generate 100 unique codes
const generateCodes = (count = 100) => {
    const codes = new Set();
    
    // Keep generating until we have enough unique codes
    while (codes.size < count) {
        const code = generateUniqueCode();
        codes.add(code);
    }
    
    return Array.from(codes);
};

// Main execution
const main = async () => {
    console.log('Generating 100 unique discount codes...\n');
    
    const codes = generateCodes(100);
    
    // Sort codes for easier reference
    codes.sort();
    
    // Display codes
    console.log('Generated Codes:');
    console.log('================\n');
    codes.forEach((code, index) => {
        console.log(`${(index + 1).toString().padStart(3, ' ')}. ${code}`);
    });
    
    // Generate CSV content
    const csvContent = [
        'Code,Discount,Status',
        ...codes.map(code => `${code},20%,Active`)
    ].join('\n');
    
    // Generate text file content (one code per line)
    const txtContent = codes.join('\n');
    
    // Generate JSON content
    const jsonContent = JSON.stringify({
        generatedAt: new Date().toISOString(),
        totalCodes: codes.length,
        discount: '20%',
        codes: codes.map(code => ({
            code,
            discount: '20%',
            status: 'Active',
            createdAt: new Date().toISOString()
        }))
    }, null, 2);
    
    // Write files (using Node.js fs module)
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const { dirname } = await import('path');
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    const outputDir = path.join(__dirname, '..', 'generated-codes');
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write CSV file
    const csvPath = path.join(outputDir, 'discount-codes.csv');
    fs.writeFileSync(csvPath, csvContent, 'utf8');
    console.log(`\n✓ CSV file saved: ${csvPath}`);
    
    // Write text file
    const txtPath = path.join(outputDir, 'discount-codes.txt');
    fs.writeFileSync(txtPath, txtContent, 'utf8');
    console.log(`✓ Text file saved: ${txtPath}`);
    
    // Write JSON file
    const jsonPath = path.join(outputDir, 'discount-codes.json');
    fs.writeFileSync(jsonPath, jsonContent, 'utf8');
    console.log(`✓ JSON file saved: ${jsonPath}`);
    
    console.log(`\n✅ Successfully generated ${codes.length} unique codes!`);
    console.log('\nFiles are saved in the "generated-codes" folder.');
    console.log('You can now import these codes into your POS system.\n');
};

// Run the script
main();
