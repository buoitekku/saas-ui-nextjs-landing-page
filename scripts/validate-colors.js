#!/usr/bin/env node

/**
 * Build script for validating Safe Talk brand colors
 * Run this during CI/CD or before deployment to ensure color compliance
 */

const { runBuildTimeValidation } = require('../utils/build-time-color-validation');

// Configuration
const config = {
  failOnWarnings: process.env.FAIL_ON_COLOR_WARNINGS === 'true',
  verbose: process.env.VERBOSE_COLOR_VALIDATION === 'true',
  outputReport: process.env.OUTPUT_COLOR_REPORT === 'true',
};

async function main() {
  console.log('🎨 Safe Talk Brand Color Validation');
  console.log('=====================================');
  
  if (config.verbose) {
    console.log('Configuration:');
    console.log(`  • Fail on warnings: ${config.failOnWarnings}`);
    console.log(`  • Verbose output: ${config.verbose}`);
    console.log(`  • Output report: ${config.outputReport}`);
    console.log('');
  }

  try {
    const result = runBuildTimeValidation();
    
    // Generate detailed report if requested
    if (config.outputReport) {
      const fs = require('fs');
      const path = require('path');
      
      const reportData = {
        timestamp: new Date().toISOString(),
        success: result.success,
        themeValidation: result.themeValidation,
        accessibilityValidation: result.accessibilityValidation,
        report: result.report,
        config,
      };
      
      const reportPath = path.join(process.cwd(), 'brand', 'color-validation-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
      console.log(`📄 Detailed report saved to: ${reportPath}`);
    }

    // Determine exit code
    let shouldExit = false;
    let exitCode = 0;

    if (!result.success) {
      shouldExit = true;
      exitCode = 1;
    } else if (config.failOnWarnings) {
      const hasWarnings = result.themeValidation.warnings.length > 0 || 
                         result.accessibilityValidation.warnings.length > 0;
      
      if (hasWarnings) {
        console.log('⚠️  Failing due to warnings (FAIL_ON_COLOR_WARNINGS=true)');
        shouldExit = true;
        exitCode = 1;
      }
    }

    if (shouldExit) {
      console.log(`❌ Color validation failed with exit code ${exitCode}`);
      process.exit(exitCode);
    } else {
      console.log('✅ Color validation completed successfully');
    }

  } catch (error) {
    console.error('💥 Color validation script failed:');
    console.error(error.message);
    
    if (config.verbose) {
      console.error(error.stack);
    }
    
    process.exit(2);
  }
}

// Handle CLI arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Safe Talk Color Validation Script

Usage: node scripts/validate-colors.js [options]

Environment Variables:
  FAIL_ON_COLOR_WARNINGS=true    Fail build on warnings (default: false)
  VERBOSE_COLOR_VALIDATION=true  Show detailed output (default: false)
  OUTPUT_COLOR_REPORT=true       Generate JSON report (default: false)

Options:
  --help, -h                     Show this help message

Examples:
  # Basic validation
  node scripts/validate-colors.js

  # Strict validation (fail on warnings)
  FAIL_ON_COLOR_WARNINGS=true node scripts/validate-colors.js

  # Verbose output with report
  VERBOSE_COLOR_VALIDATION=true OUTPUT_COLOR_REPORT=true node scripts/validate-colors.js
`);
  process.exit(0);
}

// Run the validation
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(2);
});