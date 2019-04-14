import redis from "redis";
import colors from "colors";

const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

client.on("error", function(err) {
  throw new Error(`Problem with Redis connection`.red);
});

client.on("connect", function() {
  console.log("[REDIS] Connection has been established".yellow);
});

export const addToRedis = (key, value) => {
  client.set(key, value);
};

export const getFromRedis = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err) {
      return callback(err);
    }
    callback(reply);
  });
};

export default client;
