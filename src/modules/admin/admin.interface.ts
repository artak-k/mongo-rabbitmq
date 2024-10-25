import { Document, Model } from "mongoose";

export interface IAdmin extends Document {
    username: string;
    name: string;
    password: string;
    entitize: () => IAdmin;
}

export interface IAdminModel extends Model<IAdmin> {
    findByUsername(username: string): Promise<IAdmin | null>;
}
