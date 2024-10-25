import { Admin } from "./admin.model"
import { hashPassword } from "../../utils/utils"
import ErrorMsgResponse from "../../responses/error.message"

interface IRequest { name: string, username: string, password: string }

type RequestId = {
    id: string
}

interface IQuery {
    name?: string | { $regex: string; $options: string };
    username?: string | { $regex: string; $options: string };
    [key: string]: any;
}
class AdminService {
    static async getAll(data: { name?: string, username?: string, page: number, perPage: number }) {
        const query: IQuery = {};
        data.name && (query.name = { $regex: data.name, $options: 'i' })
        data.username && (query.username = { $regex: data.username, $options: 'i' })

        const page = data.page || 1;
        const perPage = data.perPage || 10;
        try {
            const admins = (await Admin.find(query).sort({ '_id': 1 }).skip((page - 1) * perPage).limit(perPage)).map(admin => admin.entitize())

            return admins;
        } catch (error: any) {
            return new ErrorMsgResponse(error.message);
        }

    }

    static async create(data: IRequest) {
        let result;
        try {
            let admin = await Admin.findByUsername(data.username)
            if (admin) {
                result = new ErrorMsgResponse('Admin already exists')
            } else {

                data.password = await hashPassword(data.password)
                admin = new Admin(data)
                await admin.save()

                result = admin.entitize()
            }

            return result;
        } catch (error: any) {
            return new ErrorMsgResponse(error.message);
        }
    }

    static async updateInfo(data: IRequest) {
        let result;
        try {
            const admin = await Admin.findByUsername(data.username)
            if (!admin) {
                result = new ErrorMsgResponse('Admin does not exist')
            } else {
                if (data.password) {
                    data.password = await hashPassword(data.password)
                    admin.password = data.password
                }
                if (data.name) {
                    admin.name = data.name
                }
                if (data.username) {
                    admin.username = data.username
                }
                await admin.save()

                result = admin.entitize()
            }
            return result;
        } catch (error: any) {
            return new ErrorMsgResponse(error.message);
        }

    }

    static async getOne(data: RequestId) {
        let result;
        try {
            const admin = await Admin.findById(data.id)
            if (!admin) {
                result = new ErrorMsgResponse('Admin does not exist')
            } else {
                result = admin?.entitize()
            }
            return result;
        } catch (error: any) {
            return new ErrorMsgResponse(error.message);
        }

    }

    static async delete(data: RequestId) {
        let result;
        try {
            const admin = await Admin.findById(data.id)

            if (!admin) {
                result = new ErrorMsgResponse('Admin does not exist')
            } else {
                await Admin.deleteOne({ _id: admin._id })
                result = new ErrorMsgResponse('Admin deleted')
            }

            return result;
        } catch (error: any) {
            return new ErrorMsgResponse(error.message);
        }
    }
}

export default AdminService