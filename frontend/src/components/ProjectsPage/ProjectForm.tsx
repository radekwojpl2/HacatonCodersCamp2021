import React, { FormEvent, useState } from 'react'
import { IProjectWithGroup } from '../../interfaces/Project'
import { Button, TextField } from '@material-ui/core'
import { useAppSelector } from '../../app/hooks'
import Select from '@material-ui/core/Select';
import useStyles from './useStyles'

const ProjectForm = ({ saveProject, header, projectData }: {saveProject: Function, header: string, projectData?: IProjectWithGroup} ) => {
    const classes = useStyles()

    const groups = useAppSelector(state => state.projects.groups)
    const [form, setForm] = useState({
        title: projectData?.title || '',
        description: projectData?.description || '',
        linkToDemo: projectData?.linkToDemo || '',
        linkToGitHub: projectData?.linkToGitHub || '', 
        group: projectData?.group.groupName || ''
        })

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
        }     
    

    const handleSelectChange =  (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setForm(prev => ({
            ...prev,
            group: e.target.value as string
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const urlR = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        if (!(form.linkToDemo).match(urlR) || !(form.linkToGitHub).match(urlR)) {
            alert("Invalid link")
            return
        }
        
        const group = groups.find(group => group.groupName === form.group)!
        const body = {
            title: form.title,
            description: form.description,
            group: group._id,
            linkToDemo: form.linkToDemo,
            linkToGitHub: form.linkToGitHub
        }
        await saveProject(body) 
    }

    return (
        <div className={classes.projectsForm} >
                <h2 id="simple-modal-title">{header}</h2>
                <form onChange={handleFormChange} onSubmit={handleSubmit} className={"add-project-form"}>
                    <TextField 
                        id="title"
                        className={classes.formInput} 
                        label="Title" 
                        variant="filled" 
                        defaultValue={projectData && projectData.title}
                        required 
                        fullWidth
                        />
                    <TextField 
                        id="description" 
                        className={classes.formInput} 
                        label="Description" 
                        variant="filled" 
                        defaultValue={projectData && projectData.description}
                        required 
                        fullWidth
                        multiline={true}
                        rows={4}
                        />
                    <TextField 
                        id="linkToDemo" 
                        className={classes.formInput} 
                        label="Link to demo" 
                        variant="filled" 
                        defaultValue={projectData && projectData.linkToDemo}
                        required 
                        fullWidth
                        />
                    <TextField 
                        id="linkToGitHub"
                        className={classes.formInput}  
                        label="Link to GitHub" 
                        variant="filled"
                        defaultValue={projectData && projectData.linkToGitHub}
                        required 
                        fullWidth
                        />
                        <Select
                            value={form.group}
                            onChange={handleSelectChange}
                            labelId="demo-simple-select-filled-label"
                            label="Group"
                            id="demo-simple-select-filled"
                            className={classes.formInput} 
                            variant="filled"
                            required 
                            fullWidth
                            aria-required
                            >
                            {groups.map(group => <option value={group.groupName} key={group._id}>{group.groupName}</option>)}
                        </Select>
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
            </div>
    )
}

export default ProjectForm