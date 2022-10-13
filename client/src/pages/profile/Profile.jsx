import { React, useState, useEffect } from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import RightbarProfile from '../../components/rightbar/RightbarProfile'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Profile() {
   const [user, setUser] = useState({})
   const params = useParams()

   useEffect(()=>{
    const fetchUser = async () => {
        const res = await axios.get(`/user/?userId=${params.username}`)
        setUser(res.data)
    }
    fetchUser()
  },[params.username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture||"/assets/post/6.jpg"} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture||"/assets/person/noAvatar.png"} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoTitle">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username}/>
                        <RightbarProfile user={user} profile={true} />
                    </div> 
                </div>
            </div>
        </>
    )
}
