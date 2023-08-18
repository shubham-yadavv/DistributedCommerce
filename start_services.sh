echo "Starting customer service"
cd customer
npm run dev &

echo "Starting products service"
cd products
npm run dev &

echo "Starting shopping service"
cd shopping
npm run dev &
