export interface IProject {
    _id: string,
    title: string,
    description: string,
    group: string,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}

export interface IProjectWithGroup {
    _id: string,
    title: string,
    description: string,
    group: IGroup,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}

export interface IGroup {
    _id: string,
    mentor: string,
    groupName: string,
    members: [],
}

export interface IAddProject {
    shouldDisplayAddProject: boolean,
    setShouldDisplayAddProject: (isTrue: boolean) => void
}

export interface IProjectsInitialState {
    projects: IProjectWithGroup[],
    groups: IGroup[],
    displayedProject: IProjectWithGroup | undefined,
    loading: Boolean,
    error: Boolean
}