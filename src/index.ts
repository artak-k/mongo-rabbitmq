import config from "./config/config";
import connect from "./config/db.config";
import mqConnection from "./config/rabbitmq.config";
import { Notification } from "./utils/notification";

(async (dbUri: string, queue: string) => await Promise.all([
  connect({ dbUri }),
  mqConnection.consume(queue, Notification.get)
])
)(config.MONGO_URI, config.NOTIFICATION_QUEUE.request);
