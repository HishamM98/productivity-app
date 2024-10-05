export interface Project {
    id?: number,
    name: string,
    description: string,
    user_id?: number,
    status: string,
    start_date: Date,
    end_date: Date;
}