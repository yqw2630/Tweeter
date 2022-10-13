import { React, useEffect, useState, useContext } from 'react'
import './sidebar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import GroupIcon from '@mui/icons-material/Group'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import HelpIcon from '@mui/icons-material/Help'
import WorkIcon from '@mui/icons-material/Work'
import EventIcon from '@mui/icons-material/Event'
import SchoolIcon from '@mui/icons-material/School'
import UserList from '../userList/UserList'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [allUsers, setAllUsers] = useState([])
    const [friends, setFriends] = useState([])
    const {user:currentUser} = useContext(AuthContext)

    useEffect(() => {
        const getFriends = async() => {
          try {
            const friendList = await axios.get('/user/friends/' + currentUser._id)
            setFriends(friendList.data)
          } catch(err) {
            console.log(err)
          }
        }
        getFriends()
      }, [])

      useEffect(() => {
        const getUsers = async() => {
          try {
            const userList = await axios.get('/user/all')
            setAllUsers(userList.data)
          } catch(err) {
            console.log(err)
          }
        }
        getUsers()
      }, [])

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeedIcon htmlColor="Teal" className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatBubbleIcon htmlColor="lightgreen" className="sidebarIcon" />
                        <span className="sidebarListItemText">Chat</span>
                    </li>
                    <li className="sidebarListItem">
                        <OndemandVideoIcon htmlColor="red" className="sidebarIcon" />
                        <span className="sidebarListItemText">Video</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon htmlColor="aqua" className="sidebarIcon" />
                        <span className="sidebarListItemText">Group</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon htmlColor="indianred" className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmark</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpIcon htmlColor="lightblue" className="sidebarIcon" />
                        <span className="sidebarListItemText">Help</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkIcon htmlColor="burlywood" className="sidebarIcon" />
                        <span className="sidebarListItemText">Job</span>
                    </li>
                    <li className="sidebarListItem">
                        <EventIcon className="sidebarIcon" />
                        <span className="sidebarListItemText">Event</span>
                    </li>
                    <li className="sidebarListItem">
                        <SchoolIcon htmlColor="violet" className="sidebarIcon" />
                        <span className="sidebarListItemText">Course</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {allUsers.map((u)=> (
                        <Link key={u._id} to={`/profile/${u._id}`} style={{textDecoration: "none"}}>
                            <UserList key={u._id} user={u}/>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
