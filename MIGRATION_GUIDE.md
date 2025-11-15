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
