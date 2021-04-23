export interface UpdateUserData {
    taskId: string,
    userId: string,
    projectId: string
}

export interface TaskData {
    name: string,
    deadline: number,
    description: string,
    done?: boolean,
    userId?: string,
    projectId?: string
}

export interface Task {
    name: string,
    deadline: number,
    done?: boolean,
    user: {
        userId: string,
        name: string
    } | null,
    projectId?: string
}

export interface Tasks {
    [key:string]: Task
}

export interface Users {
    [key:string]: {
        firstName: string,
        lastName: string,
        role: string
    }
}

export interface TasksState {
    tasks: Tasks,
    users: Users,
    loading: boolean,
    error: boolean
}

export interface TasksInterface {
    tasks: Tasks
}

export interface AddTaskInterface {
    users: Users,
    project: string
}

export interface ChangeTaskStatus {
    taskId: string,
    projectId: string
}

export interface ParamTypes {
    projectId: string
}

export interface TaskDeleteInterface {
    id: string
}

export interface TaskPropsInterface {
    name: string,
    deadline: number,
    user?: string | null,
    id: string
}

export interface UserIconInterface {
    userName: string | null | undefined;
    taskId: string
}