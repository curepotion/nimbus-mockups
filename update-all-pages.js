// Script to help update all HTML pages to use consistent navbar
// This is a helper script for reference - not meant to run automatically

const pagesToUpdate = [
  'chats.html',
  'leaderboard.html', 
  'learn.html',
  'portfolio.html',
  'rewards.html'
];

const updateInstructions = {
  // What to replace in each page
  headerToReplace: `    <!-- Header -->
    <header class="sticky top-0 z-50 glass-header shadow-glass border-b" style="border-color: var(--color-border-subtle);">`,
  
  // What to replace it with
  newHeader: `    <!-- Navbar Container -->
    <div id="navbar-container"></div>`,
  
  // Script to add
  scriptToAdd: `  <script src="assets/js/navbar.js"></script>`,
  
  // Where to add the script (after this line)
  scriptLocation: `  <link rel="stylesheet" href="assets/css/components.css">`,
  
  // Body class to ensure consistency
  bodyClass: `<body class="h-full text-gray-200 antialiased bg-gradient-main">`,
  
  // HTML structure to ensure
  htmlClass: `<html lang="en" class="h-full" style="background: var(--color-bg-main);">`
};

console.log('Update Instructions for All Pages:');
console.log('=====================================');
console.log('1. Replace the entire header section with navbar container');
console.log('2. Add navbar.js script after components.css');
console.log('3. Ensure consistent body and html classes');
console.log('4. Remove any duplicate navbar styles');

console.log('\nPages to update:', pagesToUpdate);
console.log('\nUpdate template ready - apply manually to each page');
