set -e

echo "Starting ZEN Site Application..."

cd backend

docker compose up -d --build
sleep 10

docker exec backend-api-1 python3 manage.py makemigrations
docker exec backend-api-1 python3 manage.py migrate
docker exec backend-api-1 python3 setup_data.py

cd ..

cd frontend/zen_fe
npm install --silent
npm run dev &
cd ../..

echo "All systems started."
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"