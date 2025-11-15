.PHONY: help clean clean-all optimize dev install

# Default target
help:
	@echo "Available commands:"
	@echo "  make install     - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make clean       - Basic cleanup (node_modules, .next, logs)"
	@echo "  make clean-all   - Deep cleanup (all caches, artifacts, IDE files)"
	@echo "  make optimize    - Full system optimization (includes clean-all)"

install:
	pnpm install

dev:
	pnpm dev

clean:
	@echo "🧹 Basic cleanup..."
	@find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".next" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name "__pycache__" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name "*.log" -delete 2>/dev/null || true
	@echo "✅ Basic cleanup done."

clean-all:
	@echo "🔥 Deep cleanup..."
	@find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".next" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name "dist" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name "build" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name "__pycache__" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".pytest_cache" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name "coverage" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".nyc_output" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".vscode" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".idea" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@find . -name "*.log" -delete 2>/dev/null || true
	@find . -name "*.tmp" -delete 2>/dev/null || true
	@find . -name ".DS_Store" -delete 2>/dev/null || true
	@pnpm store prune 2>/dev/null || true
	@echo "✅ Deep cleanup done."

optimize: clean-all
	@echo "⚡ Advanced optimization..."
	@if command -v docker &> /dev/null; then docker system prune -f; else echo "⚠️ Docker not found. Skipping."; fi
	@echo "Note: System cache clearing requires root privileges."
	@sync && echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || echo "⚠️ Could not clear system caches (try with sudo)."
	@echo "✅ Optimization complete."
