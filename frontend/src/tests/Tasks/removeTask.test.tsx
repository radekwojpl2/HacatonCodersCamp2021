import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import RemoveTask from '../../components/Tasks/removeTask';


test('render RemoveTask button', () => {
    render(<Provider store={store}>
                <RemoveTask id='12345' />
            </Provider>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute("aria-label");
})

