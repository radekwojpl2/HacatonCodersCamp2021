import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios'

interface ITodo {
    id?: string,
    date: Date,
    checked: boolean,
    value: string
}

interface IInitialState {
    todos: ITodo[],
    loading: boolean,
    error: boolean
}

const initialState: IInitialState = {
    todos: [],
    loading: false,
    error: false
}

export const getAllTodos = createAsyncThunk(
    'todos/getAllTodos',
    async () => {
        try {
            const todos = await axios.get('https://hackathon-nest.herokuapp.com/todo').then(res => res.data)
            // console.log(todos)
            const sorted = todos.sort((a: ITodo, b: ITodo) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            return sorted
        } catch (err) {
            return err.response.data
        }
    }
)

export const addTodos = createAsyncThunk(
    'todos/addTodos',
    async (todos: ITodo[]) => {
        try {
            const data = todos.map( async(todo: ITodo) => {
                const el = await axios.post('https://hackathon-nest.herokuapp.com/todo', todo).then(res => res.data)
                return el
            })
            return data
        } catch (err) {
            return err.response.data
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (todo: [string, {}]) => {
        try {
            const updated = await axios.patch('https://hackathon-nest.herokuapp.com/todo/' + todo[0], todo[1]).then(res => res.data)
            return updated
        } catch (err) {
            return err.response.data
        }
    }
)

const ToDoPageSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllTodos.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(getAllTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(getAllTodos.fulfilled, (state, action) => {
            state.todos = action.payload
            state.loading = false;
            state.error = false
        });
        builder.addCase(addTodos.fulfilled, (state, action) => {
            window.location.reload()
        });
      }
  })

export default ToDoPageSlice.reducer