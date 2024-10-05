export interface Task {
    id?: number;
    title: string;
    description: string;
    user_id?: number;
    project_id?: number;
    project_name?: string;
    status: string;
    priority: string;
    due_date: Date;
}