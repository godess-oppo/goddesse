#!/bin/bash
# ===================================================================
# 🚀 GODDESSE QUANTUM WORKSPACE REPAIR SCRIPT
# ===================================================================
# This script fixes broken symlinks, reinstalls dependencies,
# and ensures the dev server can start in a Termux environment.
# ===================================================================

set -e # Exit immediately if a command exits with a non-zero status.

echo "🔍 Starting quantum workspace repair..."

# --- Step 1: Detect and Remove Broken Symlinks ---
echo "🧹 Scanning for and removing broken symbolic links..."
# Find all 'l'inks that are 'L'ost (broken) and delete them
find . -type l -exec test ! -e {} \; -delete
echo "✅ Broken symlinks removed."

# --- Step 2: Clean All node_modules Directories ---
echo "🗑️  Purging all node_modules directories for a fresh start..."
# The 'superposition' directory seems to be your main project folder
find ./superposition -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
find . -maxdepth 1 -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
echo "✅ node_modules purged."

# --- Step 3: Clean Lock Files and Build Caches ---
echo "🧼 Removing lock files and build caches..."
rm -f ./superposition/pnpm-lock.yaml
rm -f ./package-lock.json
rm -rf ./superposition/.next
rm -rf ./.turbo
echo "✅ Caches cleared."

# --- Step 4: Reinstall Dependencies ---
echo "📦 Reinstalling all dependencies with pnpm..."
cd ./superposition
# Ensure pnpm is installed and up to date
npm install -g pnpm
# Reinstall dependencies for the entire workspace
pnpm install
echo "✅ Dependencies reinstalled."

# --- Step 5: Fallback to Webpack if Turbopack Fails ---
echo "🔧 Checking Turbopack stability..."
# We will try to run the dev server and catch the error
if ! timeout 10s pnpm dev 2>&1 | grep -q "Invalid symlink"; then
    echo "✅ Turbopack seems stable. Proceeding without changes."
else
    echo "⚠️  Turbopack is unstable. Applying fallback to Webpack..."
    # Modify the dev script in the web app's package.json to use webpack
    WEB_APP_PACKAGE="apps/web/package.json"
    if [ -f "$WEB_APP_PACKAGE" ]; then
        # Use sed to replace '--turbo' with '--webpack' in the dev script
        sed -i 's/"dev": "next dev --turbo"/"dev": "next dev --webpack"/g' "$WEB_APP_PACKAGE"
        echo "✅ Fallback to Webpack configured in apps/web/package.json."
    else
        echo "❌ Could not find apps/web/package.json to apply fallback."
    fi
fi

# --- Step 6: Final Cleanup and Restart ---
echo "🧹 Performing final cleanup before restart..."
# Go back to the root of the project
cd ..
# Remove any remaining root-level node_modules to avoid conflicts
rm -rf ./node_modules
echo "✅ Final cleanup complete."

echo "🚀 Attempting to start the development server..."
echo "   If it fails, run 'cd superposition && pnpm dev' manually."
echo "=================================================================="

# --- Step 7: Start the Dev Server ---
cd ./superposition
pnpm dev

echo "=================================================================="
echo "🎉 Script finished. Your quantum workspace should be stable."
echo "=================================================================="
