import { React, useContext } from 'react'
import './topbar.css'
import SearchIcon from '@mui/icons-material/Search'
import Face5Icon from '@mui/icons-material/Face5'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Link } from 'react-router-dom' 
import { AuthContext } from '../../context/AuthContext'

const Topbar = () => {
    const {user} = useContext(AuthContext)

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Twetter</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon" />
                    <input type="text" placeholder="Search for friend, post or video" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Face5Icon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">5</span>
                    </div>
                </div>
                <Link to={`/profile/${user._id}`}>
                    <img src={ user.profilePicture || "/assets/person/noAvatar.png"} alt="profile" className="profileImg" />
                </Link>
            </div>
        </div>
    );
}

export default Topbar;
