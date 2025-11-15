#!/bin/bash

echo "Verifying environment setup..."

# Check web app .env
if [ -f "apps/web/.env" ]; then
    echo "✅ Web app .env file exists"
    required_vars=("DATABASE_URL" "NEXTAUTH_SECRET" "STRIPE_SECRET_KEY")
    for var in "${required_vars[@]}"; do
        if grep -q "^${var}=" apps/web/.env; then
            echo "✅ ${var} is set"
        else
            echo "❌ ${var} is missing"
        fi
    done
else
    echo "❌ Web app .env file missing"
fi

# Check docs app .env
if [ -f "apps/docs/.env" ]; then
    echo "✅ Docs app .env file exists"
else
    echo "❌ Docs app .env file missing"
fi

echo "Verification complete!"
