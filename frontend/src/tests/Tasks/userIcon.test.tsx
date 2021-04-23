import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import UserIcon from '../../components/Tasks/userIcon';


test('renders UserIcon with user', () => {
    render(<Provider store={store}>
            <UserIcon userName='AAA AAA' taskId='12345' />
        </Provider>);
    expect(screen.getByRole('button')).toHaveTextContent('AAA AAA');
});

test('renders UserIcon without user', () => {
    render(<Provider store={store}>
            <UserIcon userName='' taskId='12345' />
        </Provider>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label');
});

test('open dialog box', () => {
    render(<Provider store={store}>
                <UserIcon userName='' taskId='12345' />
            </Provider>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('heading')).toHaveTextContent('Select user')
})


