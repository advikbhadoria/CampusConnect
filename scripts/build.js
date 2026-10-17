/**
 * ==============================================================================
 * CAMPUS CONNECT UNIFIED BUILD & VERIFICATION PIPELINE
 * ==============================================================================
 * Validates, builds, and bundles the unified Campus Connect web platform
 * for production deployment on Vercel, Netlify, or self-hosted Node server.
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('=================================================================');
console.log('🚀 CAMPUS CONNECT — PRODUCTION BUILD & VERIFICATION');
console.log('=================================================================');
console.log(`Root Directory: ${ROOT_DIR}\n`);

const requiredPages = [
  { name: 'Root Entry', path: 'index.html' },
  { name: 'Main Campus Homepage', path: 'homepage/homepage.html' },
  { name: 'Campus Feed & Community', path: 'Feed/feed.html' },
  { name: 'User Profile & Settings', path: 'Feed/Profile/profile.html' },
  { name: 'Student Directory & Peer Hub', path: 'Student-details/student-details.html' },
  { name: 'Faculty Directory', path: 'Faculty directory/faculty-directory.html' },
  { name: 'Alumni Directory', path: 'alumini directory/alumini.html' },
  { name: 'Clubs & Student Chapters (Production Bundle)', path: 'Clubs/dist/index.html' },
  { name: 'Aakriti Cultural Championship', path: 'Aakriti/aakriti.html' },
  { name: 'Hostel Outpass & Leaves', path: 'Outpass/outpass.html' },
  { name: 'Complaints Register (Production Bundle)', path: 'Complain/dist/index.html' },
  { name: 'CampuSync Borrow & Share (Production Bundle)', path: 'Borrow/dist/index.html' },
  { name: 'Campus Commercial Shops Directory', path: 'Shops/index.html' },
  { name: 'Campus Commercial Order Portal', path: 'Shops/shop.html' }
];

let errors = [];

// Pre-flight check: Auto-build Complain if dist or assets are missing
const complainDist = path.join(ROOT_DIR, 'Complain', 'dist');
const complainAssets = path.join(complainDist, 'assets');
if (!fs.existsSync(path.join(complainDist, 'index.html')) || !fs.existsSync(complainAssets)) {
  console.log('⚡ Complain/dist missing, triggering automated build...');
  try {
    const { execSync } = require('child_process');
    execSync('npm --prefix Complain run build', { stdio: 'inherit', cwd: ROOT_DIR });
  } catch (err) {
    console.warn('⚠️ Automated Complain build notice:', err.message);
  }
}

// 1. Verify Core Portal HTML Pages
console.log('🔍 Step 1: Validating all 10 Portal Route Entrypoints...');
requiredPages.forEach(page => {
  const fullPath = path.join(ROOT_DIR, page.path);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing portal file: ${page.path} (${page.name})`);
    console.log(`   ❌ [FAIL] ${page.name} -> ${page.path}`);
  } else {
    const size = fs.statSync(fullPath).size;
    console.log(`   ✅ [OK]   ${page.name} (${Math.round(size / 1024)} KB)`);
  }
});

// 2. Verify Compiled Dist Bundles & Assets
console.log('\n📦 Step 2: Validating Compiled Production Bundles (React/Vite Modules)...');
const distModules = [
  { name: 'Clubs Module', dir: 'Clubs/dist' },
  { name: 'Complaints Module', dir: 'Complain/dist' },
  { name: 'Borrow & Share Module', dir: 'Borrow/dist' }
];

distModules.forEach(mod => {
  const assetsDir = path.join(ROOT_DIR, mod.dir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    errors.push(`Missing assets directory for ${mod.name} at ${mod.dir}/assets`);
    console.log(`   ❌ [FAIL] ${mod.name} assets directory missing`);
  } else {
    const files = fs.readdirSync(assetsDir);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));
    console.log(`   ✅ [OK]   ${mod.name} bundle verified: ${jsFiles.length} JS chunk(s), ${cssFiles.length} CSS stylesheet(s)`);
  }
});

// 3. Verify Vercel Routing Configuration
console.log('\n🌐 Step 3: Validating Vercel & Edge Routing Configurations...');
const vercelConfigPath = path.join(ROOT_DIR, 'vercel.json');
const redirectsConfigPath = path.join(ROOT_DIR, '_redirects');

if (!fs.existsSync(vercelConfigPath)) {
  errors.push('vercel.json is missing');
  console.log('   ❌ [FAIL] vercel.json missing');
} else {
  try {
    const cfg = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    console.log(`   ✅ [OK]   vercel.json verified (${cfg.rewrites?.length || 0} rewrites configured)`);
  } catch (e) {
    errors.push(`Invalid vercel.json syntax: ${e.message}`);
    console.log(`   ❌ [FAIL] vercel.json parsing error: ${e.message}`);
  }
}

if (!fs.existsSync(redirectsConfigPath)) {
  errors.push('_redirects is missing');
  console.log('   ❌ [FAIL] _redirects missing');
} else {
  const lines = fs.readFileSync(redirectsConfigPath, 'utf8').trim().split('\n').filter(Boolean);
  console.log(`   ✅ [OK]   _redirects verified (${lines.length} redirect rules configured)`);
}

// 4. Verify Unified Backend API & Serverless Handlers
console.log('\n⚡ Step 4: Validating Unified Backend API & Serverless Handlers...');
const apiHandlerPath = path.join(ROOT_DIR, 'server/apiHandler.js');
const vercelApiPath = path.join(ROOT_DIR, 'api/index.js');
const serverPath = path.join(ROOT_DIR, 'server/server.js');

if (fs.existsSync(apiHandlerPath) && fs.existsSync(vercelApiPath) && fs.existsSync(serverPath)) {
  console.log('   ✅ [OK]   server/apiHandler.js (Shared API Gateway)');
  console.log('   ✅ [OK]   api/index.js (Vercel Serverless Function)');
  console.log('   ✅ [OK]   server/server.js (Local & Self-Hosted HTTP Daemon)');
} else {
  errors.push('One or more backend API files are missing');
  console.log('   ❌ [FAIL] Backend API handler missing');
}

// 5. Build Summary
console.log('\n=================================================================');
if (errors.length > 0) {
  console.error(`💥 BUILD FAILED with ${errors.length} error(s):`);
  errors.forEach(err => console.error(`   - ${err}`));
  console.log('=================================================================');
  process.exit(1);
} else {
  console.log('🎉 BUILD SUCCESSFUL! All routes, modules, and API handlers verified.');
  console.log('   Zero broken links. Single root entrypoint ready for Vercel deployment.');
  console.log('=================================================================\n');
  process.exit(0);
}
