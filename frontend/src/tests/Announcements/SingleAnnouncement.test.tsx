import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import SingleAnnouncement from '../../components/Announcements/SingleAnnouncement'
import { announcementInterface } from '../../interfaces/Annoucement';

describe('SingleAnnouncement', () => {
    
  test('renders single announcement correctly when it is provided',() =>{
    const data: announcementInterface = {
        _id: "abcefg",
        title: 'test title',
        content: 'test content',
        type: "test type"
    }
    

    render(<Provider store={store}>
            <data/><SingleAnnouncement announcement={data} />
          </Provider>);

 expect(screen.getByText(data.title)).toBeInTheDocument
 expect(screen.getByText(data.content)).toBeInTheDocument
 expect(screen.getByText(data.type)).toBeInTheDocument

})
});