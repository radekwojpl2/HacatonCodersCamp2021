import { IProjectWithGroup } from './../../interfaces/Project';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IGroup, IProject, IProjectsInitialState } from '../../interfaces/Project'
import axios from '../../config/axios'
  
const initialState: IProjectsInitialState = {
    projects: [],
    groups: [],
    displayedProject: undefined,
    loading: false,
    error: false
}

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        try {
            const projectsData = await axios.get('/projects').then(res => res.data)
            const groups = await axios.get('/group').then(res => res.data.result)
            const projects = projectsData.map( (project: IProject) => {
                const group = groups.find( (group: IGroup) => group._id === project.group)
                return {...project, group}
            })
            const sortedProjects = projects.sort((a: IProjectWithGroup, b: IProjectWithGroup) => b.timestamp - a.timestamp)
            return {sortedProjects, groups}
        } catch (err) {
            return err.response.data
        }
    }
  )

export const getSingleProject = createAsyncThunk(
    'projects/getSingleProject',
    async (path: string) => {
        try {
            const projectData = await axios.get(path).then(res => res.data)
            const groups = await axios.get('/group').then(res => res.data.result)
            const groupInProject = groups.find((group: IGroup) => group._id === projectData.group)
            const project = {...projectData, group: groupInProject}
            
            return {project, groups}
        } catch (err) {
            throw Error(err)
        }
    }
)

export const addNewProject = createAsyncThunk(
    'projects/addNewProject',
    async (body: IProject) => {
        try {
            const newProject = await axios.post('/projects', body).then(res => res.data.data)
            return newProject
        } catch (err) {
            throw Error(err)
        }
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id: string) => {
        try {
            const deletedProject = await axios.delete(`/projects/${id}`)
            
            return deletedProject
        } catch (err) {
            throw Error(err)
        }
    }
)

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async ({path, body}: {path: string, body: IProject}) => {
        try {
            const project = await axios.put(path, body).then(res => res.data.data)
            const group = await axios.get(`/group/${project.group}`).then(res => res.data.group)
            const updatedProject = {...project, group}

            return updatedProject
        } catch (err) {
            throw Error(err)
        }
    }
)

const ProjectsPageSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addNewProject.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(addNewProject.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(addNewProject.fulfilled, (state, action) => {
            state.projects = [action.payload, ...state.projects]
            state.loading = false;
            state.error = false
            state.displayedProject = undefined
        });
        builder.addCase(deleteProject.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.projects = state.projects.filter(project => !action.payload)
            state.displayedProject = undefined
        });
        builder.addCase(fetchProjects.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload.sortedProjects
            state.groups = action.payload.groups
            state.displayedProject = undefined
            state.loading = false;
            state.error = false
        });
        builder.addCase(getSingleProject.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(getSingleProject.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(getSingleProject.fulfilled, (state, action) => {
            state.groups = action.payload.groups
            state.displayedProject = action.payload.project
            state.loading = false;
            state.error = false
        });
        builder.addCase(updateProject.pending, (state, action) => {
            state.loading = true;
            state.error = false
        });
        builder.addCase(updateProject.rejected, (state, action) => {
            state.loading = false;
            state.error = true
        });
        builder.addCase(updateProject.fulfilled, (state, action) => {
            state.projects[state.projects.findIndex(el => el._id === action.payload._id)] = action.payload
            state.displayedProject = action.payload
            state.loading = false;
            state.error = false
        });
      }
  })

export default ProjectsPageSlice.reducer