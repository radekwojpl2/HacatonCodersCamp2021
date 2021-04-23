import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import AddTask from '../../components/Tasks/addTask';


test('render AddTask button', () => {
    render(<Provider store={store}>
            <AddTask users={{1234: {firstName:'AAA AAA', lastName: 'ASS', role: 'mentor'}}} project='12345' />
        </Provider>);
    expect(screen.getByRole('button')).toHaveTextContent('Add task');
});

test('click on AddTask button', () => {
    render(<Provider store={store}>
        <AddTask users={{1234: {firstName:'AAA AAA', lastName: 'ASS', role: 'mentor'}}} project='12345' />
    </Provider>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('heading')).toHaveTextContent('Add new task')
});
