#!/bin/bash
set -e

echo "🔄 Upgrading goddesse project structure..."

# Navigate to project root
cd /root/goddesse

# Backup critical files
echo "📦 Backing up critical files..."
mkdir -p .backup
cp package.json .backup/ 2>/dev/null || true
cp turbo.json .backup/ 2>/dev/null || true
cp -r packages .backup/ 2>/dev/null || true

# Create new directory structure
echo "🏗️ Creating new structure..."

# Frontend structure
mkdir -p frontend/src/{app,components,hooks,lib,store,types}
mkdir -p frontend/src/app/{"(auth)","(shop)","(dashboard)",api}
mkdir -p frontend/src/app/"(auth)"/{login,register}
mkdir -p frontend/src/app/"(shop)"/{products,cart,checkout}
mkdir -p frontend/src/app/"(shop)"/products/"[id]"
mkdir -p frontend/src/app/"(dashboard)"/{analytics,orders}
mkdir -p frontend/src/app/api/{auth,trpc,webhooks}
mkdir -p frontend/src/app/api/auth/"[...nextauth]"
mkdir -p frontend/src/app/api/trpc/"[trpc]"
mkdir -p frontend/src/app/api/webhooks/stripe
mkdir -p frontend/src/components/{ui,shop,ai,analytics}
mkdir -p frontend/public/{images,fonts}
mkdir -p frontend/tests/{unit,integration,e2e}

# Backend structure
mkdir -p backend/{api-gateway,services,shared}
mkdir -p backend/api-gateway/src/{middleware,routes,utils}
mkdir -p backend/services/{auth-service,product-service,order-service,notification-service}
mkdir -p backend/services/auth-service/src/{controllers,models,services,routes}
mkdir -p backend/services/product-service/src/{controllers,models,services,routes}
mkdir -p backend/services/order-service/src/{controllers,models,services,routes}
mkdir -p backend/services/notification-service/src/{controllers,services,templates}
mkdir -p backend/shared/{utils,types}

# AI Services structure
mkdir -p ai-services/{chatgpt-integration,recommendation-engine,image-recognition,price-optimization,fraud-detection}
mkdir -p ai-services/chatgpt-integration/src/{agents,prompts,chains,memory,api}
mkdir -p ai-services/recommendation-engine/src/{models,preprocessing,training,serving}
mkdir -p ai-services/recommendation-engine/notebooks
mkdir -p ai-services/image-recognition/src/{models,processing,api}
mkdir -p ai-services/image-recognition/weights
mkdir -p ai-services/price-optimization/src/{models,strategies,api}
mkdir -p ai-services/fraud-detection/src/{models,features,api}

# Analytics structure
mkdir -p analytics/{real-time,batch-processing,visualization}
mkdir -p analytics/real-time/src/{streaming,aggregations,dashboards}
mkdir -p analytics/batch-processing/{airflow,spark}
mkdir -p analytics/batch-processing/airflow/dags
mkdir -p analytics/batch-processing/spark/jobs
mkdir -p analytics/visualization/{grafana,metabase}

# Database structure
mkdir -p database/{postgres,redis,mongodb}
mkdir -p database/postgres/{migrations,seeds,functions}

# Infrastructure
mkdir -p infrastructure/{docker,kubernetes,terraform,ansible,monitoring}
mkdir -p infrastructure/kubernetes/{base,services,configmaps,secrets,ingress}
mkdir -p infrastructure/terraform/{modules,environments}
mkdir -p infrastructure/terraform/environments/{dev,staging,production}
mkdir -p infrastructure/terraform/modules/{vpc,eks,rds,s3}
mkdir -p infrastructure/monitoring/{prometheus,grafana,elk,apm}

# ML Models
mkdir -p ml-models/{trained-models,experiments,datasets,pipelines}
mkdir -p ml-models/experiments/{mlflow,tensorboard}

# Scripts
mkdir -p scripts/{deployment,database,development,ai}

# Move existing files to new structure
echo "🔄 Migrating existing files..."

# Move existing platform code to frontend if it exists
if [ -d "platform" ]; then
    echo "📱 Moving platform to frontend..."
    cp -r platform/* frontend/ 2>/dev/null || true
fi

# Move existing services to backend
if [ -d "services" ]; then
    echo "🔧 Moving services to backend..."
    cp -r services/* backend/services/ 2>/dev/null || true
fi

# Move existing packages to appropriate locations
if [ -d "packages" ]; then
    echo "📦 Moving packages..."
    # UI packages to frontend components
    find packages -name "*ui*" -type d -exec cp -r {} frontend/src/components/ui/ 2>/dev/null \; || true
    # Utility packages to shared
    find packages -name "*util*" -type d -exec cp -r {} backend/shared/utils/ 2>/dev/null \; || true
fi

# Create essential configuration files
echo "⚙️ Creating configuration files..."

# Root configuration
cat > .editorconfig << 'EOL'
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{js,jsx,ts,tsx}]
indent_size = 2

[*.json]
indent_size = 2

[*.md]
trim_trailing_whitespace = false
EOL

# Docker compose
cat > docker-compose.yml << 'EOL'
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
      - database

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
    depends_on:
      - database
      - redis

  database:
    image: postgres:15
    environment:
      POSTGRES_DB: goddesse
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
EOL

# Update package.json for monorepo
if [ -f "package.json" ]; then
    echo "📦 Updating package.json for monorepo..."
    cat > package.json << 'EOL'
{
  "name": "goddesse-ai-platform",
  "private": true,
  "workspaces": [
    "frontend",
    "backend/*",
    "ai-services/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint",
    "clean": "turbo clean",
    "docker:dev": "docker-compose up",
    "docker:prod": "docker-compose -f docker-compose.prod.yml up"
  },
  "devDependencies": {
    "turbo": "^1.10.0",
    "typescript": "^5.0.0"
  }
}
EOL
fi

# Create README with migration guide
cat > MIGRATION_GUIDE.md << 'EOL'
# Goddesse Project Structure Migration

## 🎯 What Changed

We've upgraded from a simple structure to a comprehensive microservices architecture:

### New Structure:
- `frontend/` - Next.js application with app router
- `backend/` - Microservices architecture
- `ai-services/` - AI/ML services and integrations
- `analytics/` - Real-time and batch processing
- `database/` - Database configurations
- `infrastructure/` - Docker, Kubernetes, Terraform
- `ml-models/` - Machine learning models and pipelines

## 🚀 Next Steps

1. **Review the new structure**
2. **Move your existing code** to appropriate locations
3. **Update imports and configurations**
4. **Test each service independently**
5. **Update deployment configurations**

## 📁 Where to Put Existing Code

- Frontend code → `frontend/src/`
- Backend APIs → `backend/services/`
- Shared utilities → `backend/shared/`
- AI components → `ai-services/`
- Database scripts → `database/`

## 🔧 Development

\`\`\`bash
# Start all services
pnpm dev

# Start with Docker
pnpm docker:dev

# Build everything
pnpm build
\`\`\`

## 📞 Need Help?

Check the documentation in \`docs/\` directory.
EOL

# ===========================================
# FINAL SETUP
# ===========================================
echo "🎉 Project structure upgraded successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Review the new structure"
echo "2. Check backup in: .backup/"
echo "3. Run 'pnpm install' to install dependencies"
echo "4. Test your application"
echo "5. Remove backup once verified"
