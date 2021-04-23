import './Announcements.css'
import SingleAnnouncement from './SingleAnnouncement'
import { announcementInterface } from '../../interfaces/Annoucement'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useEffect } from 'react'
import { fetchAnnouncements } from './AnnouncementsSlice'
import CreateAnnouncement from './CreateAnnouncement'



const Announcements = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAnnouncements())
    }, [dispatch])  

    const announcements: announcementInterface[] = useAppSelector(state => state.announcements.announcements)

    return (
        <div className ="container">
        <div className = "header">  
            <h2>ANNOUNCEMENTS</h2>
            </div>  
            <div className = "wrapper"><CreateAnnouncement/></div>
        <div>{announcements.map((value)=>{return <SingleAnnouncement key= {value._id} announcement={value}/>})}</div>
        </div>
    )
}   

export default Announcements;

 
