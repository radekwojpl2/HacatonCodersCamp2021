import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import TaskItem from '../../components/Tasks/taskItem';

test('click on Task', () => {
    render(<Provider store={store}>
        <TaskItem name='test task' deadline= {123456} user='MM MM' id='1234' />
    </Provider>);
    expect(screen.getByText('test task')).toBeInTheDocument();
    expect(screen.getByText('Deadline: 1.01.1970')).toBeInTheDocument();
})
