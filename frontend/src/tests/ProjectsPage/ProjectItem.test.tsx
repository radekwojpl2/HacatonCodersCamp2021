import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import ProjectItem from '../../components/ProjectsPage/ProjectItem'
import { IProjectWithGroup } from '../../interfaces/Project';

describe('ProjectItem', () => {
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

  test('renders ProjectItem component', () => {
    render(<Provider store={store}>
            <ProjectItem data={data}/>
          </Provider>);
    
    expect(screen.getByText('test title')).toBeInTheDocument();
    expect(screen.getByText('string')).toBeInTheDocument();
  });
});