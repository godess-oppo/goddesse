#!/bin/bash
# fix_nextjs_termux.sh - Enhanced Termux compatibility fixes

echo "🔧 Applying Termux-specific fixes for Next.js..."

# Fix 1: Set proper Node.js path
export NODE_PATH="/data/data/com.termux/files/usr/lib/node_modules"
export PATH="/data/data/com.termux/files/usr/bin:$PATH"

# Fix 2: Disable file system watching (causes issues in Termux)
export CHOKIDAR_USEPOLLING=true
export WATCHPACK_POLLING=true

# Fix 3: Increase memory limits for Node.js
export NODE_OPTIONS="--max-old-space-size=2048 --max-semi-space-size=128"

# Fix 4: Fix Next.js telemetry issues in Termux
export NEXT_TELEMETRY_DISABLED=1

# Fix 5: Set proper temp directory
export TMPDIR="/data/data/com.termux/files/usr/tmp"

# Fix 6: Fix webpack file watching
export WEBPACK_USEPOLLING=true

# Fix 7: Disable Next.js SWC (can cause issues in Termux)
export NEXT_DISABLE_SWC=1

# Fix 8: Set proper cache directory
export NEXT_CACHE_DIR="/data/data/com.termux/files/home/.next/cache"

# Fix 9: Create necessary directories
mkdir -p "$TMPDIR"
mkdir -p "$NEXT_CACHE_DIR"

# Fix 10: Set file permissions
chmod -R 755 node_modules/.bin/ 2>/dev/null || true

echo "✅ Termux fixes applied successfully!"
echo "🚀 You can now run: npm run dev"
