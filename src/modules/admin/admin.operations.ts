import { actions } from "../../config/constants";
import AdminService from "./admin.service";

export default {
    [actions.adminUpdate]: (data: any) => AdminService.updateInfo( data),
    [actions.adminDelete]: (data: any) => AdminService.delete( data),
    [actions.adminCreate]: (data: any) => AdminService.create( data),
    [actions.adminGet]: (data: any) => AdminService.getOne( data),
    [actions.adminGetAll]: (data: any) => AdminService.getAll(data),
  }