import React from 'react'
import { Dialog } from '@material-ui/core'
import { useAppDispatch } from '../../app/hooks'
import { addNewProject } from './ProjectsPageSlice'
import ProjectForm from './ProjectForm'
import { IProject, IAddProject } from '../../interfaces/Project'

const AddProject = ({ shouldDisplayAddProject, setShouldDisplayAddProject }: IAddProject) => {
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setShouldDisplayAddProject(false);
    }

    const saveProject =  (body: IProject) => {
        dispatch(addNewProject(body))
        setShouldDisplayAddProject(false)
    }

    return (
        <Dialog
            open={shouldDisplayAddProject}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        > 
            <ProjectForm saveProject={saveProject} header="Add new project" />
        </Dialog>
    )
}

export default AddProject