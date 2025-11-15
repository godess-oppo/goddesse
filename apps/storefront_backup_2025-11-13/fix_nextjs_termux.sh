[#!/bin/bash

echo "🔧 Next.js 16 Turbopack Fix Script for Termux"
echo "=============================================="

# Function to check if command failed
check_error() {
    if [ $? -ne 0 ]; then
        echo "❌ Error: $1"
        exit 1
    fi
}

# Store current directory
CURRENT_DIR=$(pwd)
echo "📁 Working in: $CURRENT_DIR"

# 1. Scan and remove invalid/broken symlinks
echo "📁 Step 1: Scanning for broken symlinks..."
find . -type l ! -exec test -e {} \; -print | while read broken_symlink; do
    echo "🗑️  Removing broken symlink: $broken_symlink"
    rm -f "$broken_symlink"
done
echo "✅ Broken symlinks cleanup completed"

# 2. Clean and reinstall dependencies
echo "📦 Step 2: Cleaning and reinstalling dependencies..."
echo "🧹 Removing node_modules and lock files..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

echo "📥 Reinstalling dependencies..."
npm install
check_error "Failed to install dependencies"

# 3. Fix Turbopack instability by switching to Webpack
echo "⚡ Step 3: Handling Turbopack instability..."
echo "🔧 Switching from Turbopack to Webpack for stability..."

# Check if package.json has dev script that uses Turbopack
if grep -q "\-\-turbo" package.json; then
    echo "🔄 Modifying dev script to disable Turbopack..."
    # Create backup
    cp package.json package.json.backup
    # Replace --turbo with --turbo=false or remove turbo flag
    sed -i 's/next dev/next dev --turbo=false/g' package.json || \
    sed -i 's/--turbo/--turbo=false/g' package.json
    echo "✅ Modified dev script to use --turbo=false"
fi

# 4. Fix file permissions for Termux
echo "🔐 Step 4: Fixing file permissions for Termux..."
find . -type f -name "*.js" -exec chmod 644 {} \;
find . -type f -name "*.json" -exec chmod 644 {} \;
find . -type f -name "*.ts" -exec chmod 644 {} \;
find . -type f -name "*.tsx" -exec chmod 644 {} \;
chmod -R 755 node_modules/.bin 2>/dev/null || true
echo "✅ File permissions fixed"

# 5. Clear Next.js cache and build artifacts
echo "🧹 Step 5: Clearing Next.js cache..."
rm -rf .next
rm -rf .turbo
rm -rf next-env.d.ts
echo "✅ Cache cleared"

# 6. Additional Termux-specific fixes
echo "📱 Step 6: Applying Termux-specific fixes..."
# Ensure we're not in problematic directories
if [[ "$CURRENT_DIR" == /mnt/* ]] || [[ "$CURRENT_DIR" == /system/* ]]; then
    echo "⚠️  Warning: Project in system directory. Consider moving to ~/projects/"
fi

# Check for Windows-style paths in config files
echo "🔍 Checking for incompatible path configurations..."
find . -name "*.js" -o -name "*.json" -o -name "*.ts" -o -name "*.tsx" | \
    xargs grep -l "\\\\" 2>/dev/null | while read file; do
    echo "⚠️  Found Windows paths in: $file"
done

# 7. Run development server with Webpack fallback
echo "🚀 Step 7: Starting development server..."
echo "💡 Using: next dev --turbo=false (Webpack mode)"
echo "📡 Server will start at: http://localhost:3000"
echo "────────────────────────────────────────────────"

# Try to start with explicit turbo disable
if npx next dev --turbo=false 2>/dev/null; then
    echo "✅ Development server started successfully with Webpack"
else
    echo "🔄 Falling back to npm run dev with modified script..."
    # Create temporary package.json modification
    cp package.json package.json.temp
    jq '.scripts.dev = "next dev --turbo=false"' package.json.temp > package.json 2>/dev/null || \
    sed -i 's/"dev": "next dev"/"dev": "next dev --turbo=false"/g' package.json
    
    npm run dev
    # Restore original package.json
    mv package.json.temp package.json 2>/dev/null || true
fi
