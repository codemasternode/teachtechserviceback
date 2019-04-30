import redis from "redis";
import colors from "colors";

const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

client.on("connect", function() {
  console.log("[REDIS] Connection has been established".yellow);
});

client.on("error", function(err) {
  throw new Error(`Problem with Redis connection`.red);
});

export const addToRedis = (key, value) => {
  client.set(key, value, "EX", 86400, redis.print);
};

export const getFromRedis = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err) {
      return callback(err);
    }
    callback(reply);
  });
};

export const checkIsNotExpire = (key, callback) => {
  client.get(key, (err, reply) => {
    console.log(reply);
    if (err || !reply) {
      callback({ error: "NOT EXIST" });
    } else {
      client.ttl(key, (err, time) => {
        console.log(time);
        if (err) {
          callback({ error: "NOT EXPIRE" });
        } else {
          callback(undefined, time);
        }
      });
    }
  });
};

export function removeFromRedis(key, callback) {
  client.del(key, (err, response) => {
    if (response == 1) {
      callback(undefined, {});
    } else {
      callback({ error: "Can not delete" });
    }
  });
}

export default client;
