import React from 'react'
import './userList.css'

export default function UserList(props) {
  return (
    <li className="sidebarFriend">
        <img src={props.user.profilePicture} alt="friend_img" className="sidebarProfileImg" />
        <span className="sidebarFriendName">{props.user.username}</span>
    </li>
  )
}
