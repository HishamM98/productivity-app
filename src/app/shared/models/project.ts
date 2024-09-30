import { StatusEnum } from "./enums/status.enum";

export interface Project {
    id?: number,
    name: string,
    description: string,
    user_id?: number,
    status: StatusEnum,
    start_date: Date,
    end_date: Date;
}