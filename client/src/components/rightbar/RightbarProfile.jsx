import { React, useEffect, useState, useContext } from 'react'
import './rightbar.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


export default function Rightbar(props) {
    const [friends, setFriends] = useState([])
    const {user:currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.following.includes(props.user._id))

    useEffect(() => {
      const getFriendsForProfilePage = async() => {
        try {
          const friendList = await axios.get('/user/friends/' + props.user._id)
          setFriends(friendList.data)
        } catch(err) {
          console.log(err)
        }
      }
      getFriendsForProfilePage()
    }, [props.user])

    useEffect(() => {
      setFollowed(currentUser.following.includes(props.user._id))
    }, [props.user])

    const followClickHandler = async() => {
      try {
        if (followed) {
          await axios.put('/user/'+ props.user._id + '/unfollow', {userId: currentUser._id})
          dispatch({type: "UNFOLLOW", payload: props.user._id})
        } else {
          await axios.put('/user/'+ props.user._id + '/follow', {userId: currentUser._id})
          dispatch({type: "FOLLOW", payload: props.user._id})
        }
      } catch(err) {
        console.log(err)
      }
      setFollowed(!followed)
    }

    const ProfileRightBar = () => {
      return (
        <div className="rightbarWrapper">
          {
            props.user.username == currentUser.username && (
              <Link user={currentUser} to={`/profileEdit/`} style={{textDecoration: "none"}}>
                <button className="rightbarFollowButton rightbarProfileButton">
                  Edit Profile
                  <AccountBoxIcon />
                </button>
              </Link>
            )
          }
          {
            props.user.username !== currentUser.username && (
              <button className="rightbarFollowButton" onClick={followClickHandler}>
                {followed? 'Unfollow' : 'Follow'} 
                {followed? <PersonRemoveIcon /> :  <PersonAddIcon />} 
              </button>
            )
          }
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{props.user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{props.user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">{props.user.relationship == 1 ? "Single" : props.user.relationship == 2 ? "In a relationship" : "Married"}</span>
            </div>
          </div>
          <h4 className="rightbarTitle">Followings</h4>
          <div className="rightbarFollowings">
            {friends.map((f)=>{
              return (
                <Link key={f._id} to={`/profile/${f._id}`} style={{textDecoration: "none"}}>
                <div className="rightbarFollowing">
                  <img src={f.profilePicture || '/assets/person/noAvatar.png'} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName">{f.username}</span>
                </div>
                </Link>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div className="rightbar">
        <ProfileRightBar />
      </div>
    )
}
