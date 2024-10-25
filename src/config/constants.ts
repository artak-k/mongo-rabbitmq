export const actions = {
    adminCreate: "admin-create",
    adminUpdate: "admin-update",
    adminDelete: "admin-delete",
    adminGet: "admin-get",
    adminGetAll: "admin-get-all"
} as const;

export const prefixes = {
    admin: "admin"
} as const;

export const taskType = {
    regular: "regular",
    fullSync: "full-sync"
 } as const

 export const taskStages = {
    pending: "pending",
    inProgress: "in-progress",
    completed: "completed",
    cancelled: "cancelled"
 } as const