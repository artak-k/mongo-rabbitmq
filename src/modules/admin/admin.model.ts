import mongoose, { Schema } from "mongoose";
import { IAdminModel } from "./admin.interface";
import { IAdmin } from "./admin.interface"
interface IData {
    id: string;
    name: string;
    username: string;
    password?: string;
}

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

AdminSchema.methods.entitize = function (withPassword = false) {
    const data: IData = {
        id: this._id.toString(),
        name: this.name,
        username: this.username,
    }

    if (withPassword) {
        data.password = this.password
    }

    return data;
};

AdminSchema.statics.findByUsername = async function (username: string) {
    const admin = await this.findOne({ username });

    return admin;
}

const Admin: IAdminModel = mongoose.model<IAdmin, IAdminModel>("Admin", AdminSchema);

export { Admin };