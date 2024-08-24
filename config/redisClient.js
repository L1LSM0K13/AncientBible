const redis = require('redis')

// Creates the redis client
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
})

//Handles redis connection issues
redisClient.on('error', (err) => {
    console.error('Redis error:', err)
})

//Connects to redis
redisClient.connect();

module.exports = redisClient