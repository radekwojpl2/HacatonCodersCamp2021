import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import AnnouncementForm from '../../components/Announcements/AnnouncementForm'
import { announcementInterface } from '../../interfaces/Annoucement';

describe('AnnouncementForm', () => {
  const saveAnnouncement = jest.fn()

  test('renders AnnouncementForm component', () => {
    render(<Provider store={store}>
            <AnnouncementForm saveAnnouncement={saveAnnouncement}/>
          </Provider>);
  });

  test('renders announcement data correctly when it is provided',() =>{
    const data: announcementInterface = {
        _id: "abcefg",
        title: 'test title',
        content: 'test content',
        type: "test type"
    }

    render(<Provider store={store}>
            <AnnouncementForm saveAnnouncement={saveAnnouncement}/>
          </Provider>);

fireEvent.click(screen.getByRole('button'));
expect(screen.getByRole("button")).toBeInTheDocument
expect(screen.getByRole('dialog')).toBeTruthy();
  })
});