import React, { useState, useEffect } from 'react'
import { IProject } from '../../interfaces/Project'
import { Card, Dialog, LinearProgress, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProjectForm from './ProjectForm';
import { getSingleProject, updateProject } from './ProjectsPageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useHistory } from "react-router-dom";
import useStyles from './useStyles'

const ProjectCard: React.FC = () => {
    const classes = useStyles()

    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useAppDispatch()
    const history = useHistory()

    const { displayedProject, loading }= useAppSelector(state => state.projects)
    const path = window.location.pathname;

    const displayDate = () => {
        if (displayedProject) {
            const day = new Date(displayedProject.timestamp).getDate()
            const month = new Date(displayedProject.timestamp).getMonth() + 1
            const year = new Date(displayedProject.timestamp).getFullYear()
            return `${day < 10 ? `0` + day : day}/${month < 10 ? `0` + month : month}/${year}`
        }
    }

    const handleClick = (link: string) => {
        if (link.includes("http")) window.open(link)
        else window.open("https://" + link)
    }

    const handleClose = () => {
        setIsEditing(false)
    }

    const saveProject = (body: IProject) => {
        dispatch(updateProject({path, body}))
        setIsEditing(false)
    }

    useEffect(() => {
        dispatch(getSingleProject(path))
    }, [dispatch, path])

    return (
        <Card className={classes.projectCard}>
            <IconButton className={classes.goBackBtn} onClick={() => history.push('/projects')} ><ArrowBackIcon /></IconButton>
            <IconButton className={classes.editBtn} onClick={() => setIsEditing(true)} ><EditIcon /></IconButton>
            {isEditing &&
                <Dialog
                    open={isEditing}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    >  
                    <ProjectForm saveProject={saveProject} header="Edit project" projectData={displayedProject}/>
                </Dialog>}
                {loading || !displayedProject ? <LinearProgress /> :
                <> 
                    <h2>{displayedProject.title}</h2>
                    <p>{displayedProject.description}</p>
                    <p><span className={classes.bold} >Date:</span> {displayDate()}</p>
                    <p><span className={classes.bold} >Group:</span> {displayedProject.group.groupName}</p>
                    <p className={classes.linkItem} ><span className={classes.bold} >Demo:</span> {displayedProject.linkToDemo} <LinkIcon className={classes.link} onClick={() => handleClick(displayedProject.linkToDemo)} /></p> 
                    <p className={classes.linkItem} ><span className={classes.bold} >GitHub:</span> {displayedProject.linkToGitHub} <LinkIcon className={classes.link} onClick={() => handleClick(displayedProject.linkToGitHub)} /></p>
                </>} 
        </Card>  
    )
}

export default ProjectCard