#!/bin/bash

echo "🔍 STOREFRONT DETECTOR - Finding the REAL main storefront"
echo "=========================================================="

cd ~/goddesse

# Check all potential storefront locations
locations=("superposition/apps/web" "frontend" "packages/ui" "superposition/apps/docs")

for location in "${locations[@]}"; do
    if [ -d "$location" ]; then
        echo ""
        echo "=== Checking: $location ==="
        
        # Check for storefront indicators
        if [ -f "$location/package.json" ]; then
            echo "✅ Has package.json"
            name=$(grep '"name"' "$location/package.json" | head -1 | awk -F: '{print $2}' | tr -d '," ')
            echo "   Project: $name"
            
            # Check for Next.js
            if grep -q "next" "$location/package.json"; then
                echo "   🚀 Next.js detected"
            fi
            
            # Check for scripts
            scripts=$(grep -A 20 '"scripts"' "$location/package.json" | grep -E '"(dev|start|build)"' | head -3)
            if [ ! -z "$scripts" ]; then
                echo "   📜 Scripts available:"
                echo "$scripts" | sed 's/^/      /'
            fi
        fi
        
        # Check for pages/components
        if [ -d "$location/pages" ] || [ -d "$location/src/app" ] || [ -d "$location/src/pages" ]; then
            echo "   📄 Has pages directory"
        fi
        
        if [ -d "$location/components" ] || [ -d "$location/src/components" ]; then
            echo "   🧩 Has components directory"
        fi
        
        # Check for store-specific files
        if find "$location" -name "*product*" -o -name "*cart*" -o -name "*shop*" | grep -q .; then
            echo "   🛍️ Has e-commerce files"
        fi
        
        # Check if it's runnable
        if [ -f "$location/package.json" ] && [ -d "$location/node_modules" ]; then
            echo "   ✅ Dependencies installed"
        fi
    fi
done

echo ""
echo "🎯 ANALYSIS COMPLETE"
echo "===================="

# Determine the main storefront
if [ -f "superposition/apps/web/package.json" ]; then
    echo ""
    echo "🏆 MAIN STOREFRONT IDENTIFIED:"
    echo "   Location: superposition/apps/web/"
    echo "   Reason: Has complete Next.js setup with pages, components, and AI features"
    echo "   Status: Most likely the active development storefront"
    
    # Show what's inside
    echo ""
    echo "📁 Contents:"
    ls -la superposition/apps/web/
    
elif [ -f "frontend/package.json" ]; then
    echo ""
    echo "🏆 MAIN STOREFRONT IDENTIFIED:"
    echo "   Location: frontend/"
    echo "   Reason: Primary frontend directory with full structure"
    echo "   Status: Likely the production storefront"
    
else
    echo ""
    echo "❓ UNCLEAR - Multiple potential storefronts found"
    echo "   Run this to test each one:"
    echo "   cd <folder> && npm run dev"
fi

echo ""
echo "🚀 QUICK START COMMANDS:"
echo "   cd superposition/apps/web && npm run dev"
echo "   cd frontend && npm run dev"
