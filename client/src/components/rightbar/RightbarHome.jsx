import { React, useEffect, useState, useContext } from 'react'
import './rightbar.css'
import CakeIcon from '@mui/icons-material/Cake'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'


export default function Rightbar(props) {
    const [friends, setFriends] = useState([])
    const [currentUserFriends, setCurrentUserFriends] = useState([])
    const {user:currentUser, dispatch} = useContext(AuthContext)

    useEffect(() => {
      const getFriendsForHomePage = async() => {
        try {
          const friendList = await axios.get('/user/friends/' + currentUser._id)
          setCurrentUserFriends(friendList.data)
        } catch(err) {
          console.log(err)
        }
      }
      getFriendsForHomePage()
    }, [])

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

    const HomeRightBar = () => {
      return (
        <div className="rightbarWrapper">
          <div className="birthdayContainer">
            <CakeIcon htmlColor="indianred" className="birthdayImg" />
            <span className="birthdayText">
              <b>QQT</b> and <b>3 other friends</b> have a birthday today
            </span>
          </div>
          <img src="assets/ad.jpg" alt="rightbar-ad" className="rightbarAd" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {currentUserFriends.map((u) => (
              <li key={u._id} className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img src={u.profilePicture} alt="rightbar-profile" className="rightbarProfileImg" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">{u.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div className="rightbar">
        <HomeRightBar/>
      </div>
    )
}
