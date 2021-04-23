import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import DeleteAnnouncement from '../../components/Announcements/DeleteAnnouncement';


test('render DeleteAnnouncement button', () => {
    render(<Provider store={store}>
                <DeleteAnnouncement id='12345' />
            </Provider>);
    expect(screen.getByRole('button')).toBeTruthy();
})

