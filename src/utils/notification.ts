import mqConnection from "../config/rabbitmq.config";
import { actions, prefixes } from "../config/constants";
import adminOperations from "../modules/admin/admin.operations";
import ErrorMsgResponse from "../responses/error.message";

export type INotification = {
    action: string;
    data?: any;
};

type Keys = keyof typeof actions;

interface ParsedData {
    action: typeof actions[Keys];
    data?: any;
}

export class Notification {
    static async send(notification: INotification, correlationId: string, replyTo: string) {
        const result = await mqConnection.sendToQueue(replyTo, notification, correlationId);

        return result
    }


    static async get(msg: string, correlationId: string, replyTo: string) {
        const { data: parsed } = JSON.parse(msg).message;
        const parsedData: ParsedData = { action: parsed.action, data: parsed.data };
        try {
            const prefix = parsedData.action.split('-')[0];
            let data;
            if (prefix === prefixes.admin) {
                data = await adminOperations[parsedData.action](parsedData.data);
            }

            data && Notification.send({ action: parsedData.action, data }, correlationId, replyTo)
        } catch (error: any) {
            console.error(`Error While Parsing the message`);
            Notification.send({ action: parsedData.action, data: new ErrorMsgResponse(error.message) }, correlationId, replyTo)
        }
    }
}
