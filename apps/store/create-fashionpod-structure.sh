#!/bin/bash

echo "🚀 Creating FashionPod structure in your Turborepo..."

# Navigate to your store apps directory
cd apps

# Create the complete FashionPod web app structure
mkdir -p web/src
cd web/src

# Create main directories
mkdir -p \
  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
  app/product \
  app/profile \
  app/search \
  app/try-on \
  app/subscription \
  components \
  components/ui \
  components/navigation \
  components/product \
  components/cart \
  components/ai \
  components/search \
  components/layout \
  components/auth \
  components/social \
  lib \
  lib/db \
  lib/auth \
  lib/ai \
  lib/stripe \
  lib/storage \
  lib/utils \
  types \
  hooks \
  styles \
  tests \
  tests/unit \
  tests/e2e \
  middleware


  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
  app/product \
  app/profile \
  app/search \
  app/try-on \
  app/subscription \
  components \
  components/ui \
  components/navigation \
  components/product \
  components/cart \
  components/ai \
  components/search \
  components/layout \
  components/auth \
  components/social \
  lib \
  lib/db \
  lib/auth \
  lib/ai \
  lib/stripe \
  lib/storage \
  lib/utils \
  types \
  hooks \
  styles \
  tests \
  tests/unit \
  tests/e2e \
  middleware

  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
  app/product \
  app/profile \
  app/search \
  app/try-on \
  app/subscription \
  components \
  components/ui \
  components/navigation \
  components/product \
  components/cart \
  components/ai \
  components/search \
  components/layout \
  components/auth \
  components/social \
  lib \
  lib/db \
  lib/auth \
  lib/ai \
  lib/stripe \
  lib/storage \
  lib/utils

  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
  app/product \
  app/profile \
  app/search \
  app/try-on \
  app/subscription \
  components \
  components/ui \
  components/navigation \
  components/product \
  components/cart \
  components/ai \
  components/search \
  components/layout

  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
  app/product \
  app/profile \
  app/search \
  app/try-on \
  app/subscription \
  components \
  components/ui \
  components/navigation \
  components/product \
  components/cart

  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
  app/product \
  app/profile \
  app/search \
  app/try-on \
  app/subscription

  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
  app/product \
  app/profile \
  app/search

  app \
  app/api \
  app/(auth) \
  app/(shop) \
  app/dashboard \
  app/cart \
# Create App Router structure
cd app
mkdir -p \
  api/auth \
  api/products \
  api/cart \
  api/users \
  api/ai \
  api/search \
  api/orders \
  (auth)/login \
  (auth)/register \
  (auth)/forgot-password \
  (shop) \
  (shop)/category/[slug] \
  (shop)/brand/[
  api/auth \
  api/products \
  api/cart \
  api/users \
  api/ai \
  api/search \
  api/orders \
  (auth)/login \
  (auth)/register \
  (auth)/forgot-password \
  (shop) \
  (shop)/category/[slug]

  api/auth \
  api/products \
  api/cart \
  api/users \
id] \
  dashboard/settings \
  dashboard/orders \
  dashboard/wishlist \
  cart \
  product/[id] \
  profile/edit \
  profile/orders \
  profile/preferences \
  search \
  try-on \
  try-on/[productId] \
  subscription/checkout

# Create all the files (simplified for brevity)
find . -type d -exec sh -c 'cd "{}" && touch page.tsx 2>/dev/null || true' \;

# Create API routes
cd api && find . -type d -exec sh -c 'cd "{}" && touch route.ts 2>/dev/null || true' \;

cd ../../..

# Components structure (simplified)
cd ../../components
find . -type d -exec sh -c 'cd "{}" && touch Component.tsx 2>/dev/null || true' \;

# Lib, types, hooks, styles, tests
cd ../../lib && find . -type d -exec sh -c 'cd "{}" && touch module.ts 2>/dev/null || true' \;
cd ../../types && touch product.ts user.ts cart.ts order.ts ai.ts auth.ts
cd ../../hooks && touch useCart.ts useAuth.ts useProducts.ts useAI.ts useSearch.ts
cd ../../styles && touch globals.css components.css
cd ../../tests && touch setup.ts && cd unit && touch cart.test.ts auth.test.ts && cd ../e2e && touch homepage.test.ts checkout.test.ts

# Config files
cd ../../..
touch next.config.js tsconfig.json tailwind.config.js postcss.config.js .eslintrc.json .prettierrc .env.local .env.example

# Docs app
cd ../docs
mkdir -p src/app src/components src/lib src/types src/styles
cd src/app && touch layout.tsx page.tsx

echo "✅ FashionPod structure created successfully!"
