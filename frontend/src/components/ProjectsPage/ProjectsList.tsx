import React from 'react'
import ProjectItem from './ProjectItem'
import { IProjectWithGroup } from '../../interfaces/Project'
import { LinearProgress } from '@material-ui/core'
import { useAppSelector } from '../../app/hooks'
import useStyles from './useStyles'

const ProjectsList = () => {
    const classes = useStyles()

    const projects: IProjectWithGroup[] = useAppSelector(state => state.projects.projects)
    const loading = useAppSelector(state => state.projects.loading)

    return (
        <div className={classes.projectsList}>
            {projects.length <=0 && loading ? <LinearProgress /> : projects.map(project => <ProjectItem data={project}  key={project._id}/>)}
        </div>
    )
}

export default ProjectsList