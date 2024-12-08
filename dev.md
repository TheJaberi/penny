# API Testing Commands

## Register a new user
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{"username":"test","email":"test@test.com","password":"password123"}'

## Login and get token
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{"username":"test","password":"password123"}'

## Get current user info (requires token)
# Replace YOUR_TOKEN with the token received from login
curl -X GET http://localhost:3000/api/users/me \
-H "Authorization: Bearer YOUR_TOKEN"

## Get all other users (requires token)
# Replace YOUR_TOKEN with the token received from login
curl -X GET http://localhost:3000/api/users/all \
-H "Authorization: Bearer YOUR_TOKEN"

## Helper: Save token and use it
# First save token to variable
TOKEN=$(curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{"username":"test","password":"password123"}' | jq -r '.token')

# Then use it in subsequent requests
curl -X GET http://localhost:3000/api/users/me \
-H "Authorization: Bearer $TOKEN"

curl -X GET http://localhost:3000/api/users/all \
-H "Authorization: Bearer $TOKEN"

