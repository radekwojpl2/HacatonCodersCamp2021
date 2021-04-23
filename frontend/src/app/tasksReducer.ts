import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../config/axios';
import { RootState } from './store';
import {UpdateUserData, TaskData, Tasks, Users, TasksState, ChangeTaskStatus } from '../interfaces/tasks';

export const initialState:TasksState = {
    // projectId: '606b6e5ff4aeb931b8ffe79e',
    tasks: {},
    users: {},
    loading: false,
    error: false
}

export const fetchTasksByProject = createAsyncThunk(
    'tasks/fetchByProjectId',
    async (projectId:string) => {
        const tasks = axios.get(`/tasks/project/${projectId}`)
        .then( response => response.data)
        .then( data => {
            let tasksList:Tasks= {};
            for (let task in data) {
                const taskId:string = data[task]._id;
                
                tasksList[taskId] = {
                    name: data[task].name,
                    deadline: data[task].deadline,
                    done: data[task].done,
                    user: data[task].user ? {userId: data[task].user._id,
                            name: `${data[task].user.firstName} ${data[task].user.lastName}`}
                            : null
                }
            }

            return tasksList
        })

        return tasks

    }
);

export const fetchUsers = createAsyncThunk(
    'tasks/fetchUsers',
    async () => {
        const users = axios.get('/authorization')
        .then( response => response.data)
        .then( data => {
            let usersList:Users= {};
            for (let user in data) {
                const userId:string = data[user]._id;
                
                usersList[userId] = {
                    firstName: data[user].firstName,
                    lastName: data[user].lastName,
                    role: data[user].role,
                }
            }

            return usersList
        })

        return users
    }
)

export const addTaskToProject = createAsyncThunk(
    'tasks/addTask',
    async (data:TaskData) => {
        console.log(data)
        const newTask = axios.post('/tasks', data)
        .then(response => {
            return {
                [response.data._id]: {
                    name: response.data.name,
                    deadline: response.data.deadline,
                    done: response.data.done,
                    user: response.data.user ? {userId: data.userId,
                        name: `${response.data.user.firstName} ${response.data.user.lastName}`}
                        : null
                } 
            }
        })
        .catch( error => console.log(error));

        return newTask
        
    }
)

export const removeTaskFromProject = createAsyncThunk(
    'tasks.removeTask',
    async (id:string) => {
        axios.delete(`/tasks/${id}`)
        .then( response => console.log(response))
        .catch(error => console.log(error))

        return id
    }
)

export const updateUser = createAsyncThunk( 
    'tasks/updateTask',
    (data: UpdateUserData, {getState}) => {
        const store = getState() as RootState;
        const taskData = store.tasks.tasks[data.taskId];
        const user = store.tasks.users[data.userId]

        const updatedTask:TaskData = {name: taskData.name,
                                            deadline: taskData.deadline,
                                            description: "some description",
                                            done: taskData.done,
                                            projectId: data.projectId, 
                                            userId: data.userId};

        axios.put(`/tasks/${data.taskId}`, updatedTask)
        .then( response => console.log(response.data))
        .catch( error => console.log(error))

        return {taskId: data.taskId,
                user: {userId: data.userId,
                        name: `${user.firstName} ${user.lastName}`}
        }
    }
);

export const changeTaskStatus = createAsyncThunk(
    'tasks/changeTaskStatus',
    (data:ChangeTaskStatus , {getState}) => {
        const store = getState() as RootState;
        const taskData = store.tasks.tasks[data.taskId];
        // const projectId = store.tasks.projectId;

        const updatedTask:TaskData = {name: taskData.name,
            deadline: taskData.deadline,
            description: "some description",
            done: !taskData.done,
            projectId: data.projectId, 
            userId:  taskData.user? taskData.user.userId : undefined};

        axios.put(`/tasks/${data.taskId}`, updatedTask)
        .then( response => console.log(response.data))
        .catch( error => console.log(error))

        return {
            taskId: data.taskId,
            done: !taskData.done
        }
    }
)

const tasksReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder.addCase(addTaskToProject.pending, (state, action) => {
            state.error = false
        });
        builder.addCase(addTaskToProject.rejected, (state, action) => {
            state.error = true;
        });
        builder.addCase(addTaskToProject.fulfilled, (state,action) => {
            state.tasks = {...state.tasks, ...action.payload}
        });
        builder.addCase(removeTaskFromProject.fulfilled, (state, action) => {
            delete state.tasks[action.payload]
        });
        builder.addCase(fetchTasksByProject.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchTasksByProject.fulfilled, (state,action) => {
            state.loading = false
            state.tasks = action.payload
        });
        builder.addCase(fetchTasksByProject.rejected, (state, action) => {
            state.error = true;
            state.loading = false
        });
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            state.loading = false
            state.users = action.payload
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.error = true;
            state.loading = false
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.tasks[action.payload.taskId].user = action.payload.user
        });
        builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
            state.tasks[action.payload.taskId].done = action.payload.done
        })
    }
})

export default tasksReducer.reducer