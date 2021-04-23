import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import TasksStatus from '../../components/Tasks/taskStatus';

test('renders Task on screen', () => {
    render(<Provider store={store}>
            <TasksStatus tasks={{12345: {name: 'test task', deadline: 123456, done: false, user: {userId: '123', name:'MM MM'}}}} />
        </Provider>);
    expect(screen.getByText('test task')).toBeInTheDocument();
});
