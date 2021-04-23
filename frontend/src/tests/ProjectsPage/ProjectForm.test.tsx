import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import ProjectForm from '../../components/ProjectsPage/ProjectForm'
import { IProjectWithGroup } from '../../interfaces/Project';

describe('ProjectForm', () => {
  const saveProject = jest.fn()
  const header = "test test"

  test('renders ProjectForm component', () => {
    render(<Provider store={store}>
            <ProjectForm saveProject={saveProject} header={header}/>
          </Provider>);
    
    expect(screen.getByText('test test')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('renders project data correctly when it is provided',() =>{
    const data: IProjectWithGroup = {
      _id: 'fsdfsdfa',
      title: 'test title',
      description: 'test description',
      linkToDemo: 'test link',
      linkToGitHub: 'test link 2', 
      group: {
        _id: 'string',
        mentor: 'string',
        groupName: 'string',
        members: []
      },
      timestamp: 4389537945
      }

    render(<Provider store={store}>
            <ProjectForm saveProject={saveProject} header={header} projectData={data}/>
          </Provider>);

  })
});