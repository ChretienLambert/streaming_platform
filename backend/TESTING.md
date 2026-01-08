# Backend Testing Instructions

## Current Status
✅ Backend code structure created
✅ Dependencies installed successfully  
❌ MongoDB not installed (required for full functionality)
❌ Server execution issues (need to resolve Node.js path)

## Test Options

### Option 1: Install MongoDB (Recommended)
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Run the server
npm run dev
```

### Option 2: Use MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/streaming-platform
```

### Option 3: Test with Mock Data
Use the test server I created:
```bash
node src/test-server.js
```

## Manual Testing with curl

Once server is running, test these endpoints:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Authentication
```bash
curl -X POST http://localhost:5000/api/test/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Videos
```bash
curl http://localhost:5000/api/test/videos
```

### Get Music
```bash
curl http://localhost:5000/api/test/music
```

## Frontend Integration
Update your frontend API calls to use:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Next Steps
1. Choose one of the MongoDB options above
2. Start the server
3. Test the endpoints
4. Connect frontend to backend
5. Test full integration
