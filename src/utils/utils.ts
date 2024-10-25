import bcrypt from "bcrypt";
import { IAdmin } from '../modules/admin/admin.interface'
import crypto from 'crypto'


export const generateUuid = () => {
    return Math.ceil((Math.random()*Number.MAX_SAFE_INTEGER)).toString() + Number.MAX_SAFE_INTEGER + Date.now();
}

export function generateHash(data: any) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

export const hashPassword = async (password: string, salt = 8) => {
    return await bcrypt.hash(password, salt);
}

export const verify = async (password: string, admin: IAdmin) => {
    return await bcrypt.compare(password, admin.password);
}
