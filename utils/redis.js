import redis from 'redis';
const client = redis.createClient();
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

class RedisClient {
    constructor() {
	client.on('error', function(err) {
	    console.log(err);
	});
    }
    isAlive() {
	client.on('error', function(err) {
	    return (false);
	})
	client.on('connect', function() {
	    return (true);
	})
    }
    async set(key, val, duration) {
	client.set(await getAsync(key, val, duration * 1000));
    }
    async get(key) {
	client.get(key, function(err, res) {
	    return (res);
	});
    }
}

const redisClient = new RedisClient();
export default redisClient;
