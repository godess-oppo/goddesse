.PHONY: setup dev materialize

setup:
    @echo "⚛️ Collapsing development environment..."
    pnpm install
    pnpm --filter @goddesse/product-service migrate
    docker-compose -f platform/docker-compose.yml up -d

dev:
    pnpm -r --parallel dev

materialize:
    @bash -c 'read -p "App name (web/api/docs): " app; ./scripts/organize.js materialize $$app'
