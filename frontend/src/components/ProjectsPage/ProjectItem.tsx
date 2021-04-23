import React from 'react'
import { useHistory } from "react-router-dom";
import axios from '../../config/axios'
import { AppBar, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { IProjectWithGroup } from '../../interfaces/Project'
import { useAppDispatch } from '../../app/hooks'
import { fetchProjects } from './ProjectsPageSlice'
import useStyles from './useStyles'

const ProjectItem = ({ data } : { data: IProjectWithGroup }) => {
    const classes = useStyles()

    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleRemoveProjectClick = () => {
        const id = data._id
        axios
            .delete(`/projects/${id}`)
            .then(res => dispatch(fetchProjects()) )
            .catch(err => console.log(err))
    }

    const handleGoToProjectClick = () => {
        history.push(`/projects/${data._id}`)
    }  

    return (
        <AppBar position='relative' color='default' className={classes.projectsItem}>
            <h3>{data.title}</h3>
            <p>{data.group.groupName}</p>
            <IconButton onClick={handleRemoveProjectClick} className={classes.removeBtn}><DeleteIcon /></IconButton>
            <IconButton onClick={handleGoToProjectClick} className={classes.infoBtn}><InfoIcon /></IconButton>
        </AppBar>
    )
}

export default ProjectItem