#!/bin/sh
# start-app.sh

# Function to check if the database is ready
check_db() {
  nc -z db 5432
  return $?
}

echo "Waiting for the database to be ready..."
while ! check_db; do
  sleep 1
done
echo "Database is ready."

# Start the Node.js application
exec npm start
