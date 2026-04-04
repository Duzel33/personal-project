echo "Stopping ZEN Site Application..."

# Kill Vite/npm dev server
pkill -f "vite" || true

cd backend
docker compose down
cd ..

echo "All systems shut down."