import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import AddProject from '../../components/ProjectsPage/AddProject'

describe('ProjectsPage', () => {
    test('renders ProjectsPage component', () => {
        const shouldDisplayAddProject = true
        const setShouldDisplayAddProject = jest.fn()
        render(<Provider store={store}><AddProject  shouldDisplayAddProject={shouldDisplayAddProject} setShouldDisplayAddProject={setShouldDisplayAddProject}/></Provider>);
        
        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeInTheDocument();
    });
  });