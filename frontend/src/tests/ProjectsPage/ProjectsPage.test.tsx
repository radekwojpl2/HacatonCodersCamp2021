import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import ProjectsPage from '../../components/ProjectsPage/ProjectsPage'

describe('ProjectsPage', () => {
    test('renders ProjectsPage component', () => {
      render(<Provider store={store}><ProjectsPage /></Provider>);
    
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument();
    });
  });