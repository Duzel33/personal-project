echo "Stopping ZEN Site Application..."

# Kill Django runserver
pkill -f "manage.py runserver" || true

# Kill Vite/npm dev server
pkill -f "vite" || true

cd backend
docker compose down -v
cd ..

echo "All systems shut down."