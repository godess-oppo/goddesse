#!/bin/bash
echo "🧹 Cleaning project space..."

# Check current space
echo "📊 Current space usage:"
du -sh ./

# Clean package caches
echo "🗑️ Cleaning package caches..."
npm cache clean --force 2>/dev/null || true
pnpm store prune 2>/dev/null || true

# Remove node_modules
echo "📦 Removing node_modules..."
rm -rf node_modules 2>/dev/null || true
rm -rf apps/*/node_modules 2>/dev/null || true
rm -rf packages/*/node_modules 2>/dev/null || true

# Clean build files
echo "🏗️ Cleaning build files..."
find . -name ".next" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name "build" -type d -exec rm -rf {} + 2>/dev/null || true

# Clean logs and temp files
echo "📝 Cleaning logs..."
find . -name "*.log" -delete 2>/dev/null || true
find . -name "*.tmp" -delete 2>/dev/null || true

# Clean Termux package cache
echo "📦 Cleaning Termux cache..."
pkg clean 2>/dev/null || true

echo "✅ Cleanup complete!"
echo "📊 New space usage:"
du -sh ./
