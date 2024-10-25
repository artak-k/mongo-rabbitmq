import { config } from "dotenv";

config();

const rmqUser = String(process.env.RABBITMQ_USERNAME);
const rmqPass = String(process.env.RABBITMQ_PASSWORD);
const rmqHost = String(process.env.RABBITMQ_URL);
const rmqUri = `amqp://${rmqUser}:${rmqPass}@${rmqHost}:5672`

const MONGO_HOST = process.env.MONGO_HOST || "127.0.0.1";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URI =
    MONGO_USERNAME && MONGO_PASSWORD
        ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?retryWrites=true&w=majority`
        : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

const NOTIFICATION_QUEUE = {
    request: '@request'
};

export default {
    rmqUri,
    NOTIFICATION_QUEUE,
    MONGO_URI
}