export interface DashboardRes {
    userProjectsCount: number;
    userTasksCount: number;
    userTasksStatusCount: UserTasksStatusCount[];
    userProjectsStatusCount: UserProjectsStatusCount[];
    userProjectsDeadlineCount: number;
    userTasksDeadlineCount: number;
}

export interface DashboardData {
    projectCount: number;
    taskCount: number;
    projectsDeadlineCount: number;
    tasksDeadlineCount: number;
    pendingProjects: number;
    startedProjects: number;
    completedProjects: number;
    pendingTasks: number;
    startedTasks: number;
    completedTasks: number;
}

export interface UserTasksStatusCount {
    status: string;
    count: number;
}

export interface UserProjectsStatusCount {
    status: string;
    count: number;
}
