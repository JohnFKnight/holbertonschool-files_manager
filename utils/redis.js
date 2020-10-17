import redis from 'redis';

const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  isAlive() {
    this.client.on('error', () => false);
    this.client.on('connect', () => true);
  }

  async set(key, val, duration) {
    this.client.set(await this.getAsync(key, val, duration * 1000));
  }

  async get(key) {
    this.client.get(await this.getAsync(key, (err, res) => res));
  }
}

const redisClient = new RedisClient();
export default redisClient;
