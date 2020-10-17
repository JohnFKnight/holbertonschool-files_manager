import redis from 'redis';

const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  isAlive() {
    this.client.on('error', () => console.log('false'));
    this.client.on('connect', () => console.log('true'));
    // return (this.client.connected);
  }

  async set(key, val, duration) {
    await this.setAsync(key, val);
    this.client.expire(key, duration);
  }

  async get(key) {
    console.log(await this.getAsync(key)); // , (err, res) => console.log(res)));
  }

  async del(key) {
    await this.delAsync(key, (err, res) => res);
  }
}

const redisClient = new RedisClient();
// export default redisClient;
module.exports = redisClient;
