import { React, useEffect, useState, useContext } from 'react'
import './profileEdit.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'


const ProfileEdit = (props) => {
    const {user:currentUser} = useContext(AuthContext)
    const [user, setUser] = useState({
        userId: currentUser._id,
        username: currentUser.username,
        profilePicture: currentUser.profilePicture,
        coverPicture: currentUser.coverPicture,
        desc: currentUser.desc,
        city: currentUser.city,
        from: currentUser.from,
        relationship: currentUser.relationship
    })
    const [profileImg,setProfileImg] = useState(null)
    const [coverImg,setCoverImg] = useState(null)

    const changeHandler = (e) => {
        setUser(prev=> ({...prev, [e.target.name]:e.target.value}))
    }

    const submitHandler = async(e) => {
        e.preventDefault()

        if (profileImg || coverImg) {
            const data = new FormData()
            let fileName
            if (profileImg) {
                fileName = Date.now() + profileImg.name
                data.append('file', profileImg, fileName)
                setUser(prev=> ({...prev, profilePicture:"http://localhost:8800/images/" + fileName}))
                console.log(user)
            } else {
                fileName = Date.now() + coverImg.name
                data.append('file', coverImg, fileName)
                setUser(prev=> ({...prev, coverPicture:"http://localhost:8800/images/" + fileName}))
                console.log(user)
            }

            try {
                await axios.post('/upload', data)
            } catch(err) {
                console.log(err)
            }
        }

        try {
            await axios.put('/user/'+ currentUser._id, user)
            alert('User Information Updated')
        } catch(err) {
            console.log(err)
        }
    }

    console.log(user)

    return (
        <>
            <Topbar />
            <div className="profileEditPage">
                <Sidebar />
                <div className="profileEditRight">
                    <span className="profileEditTitle">Your details</span>
                    <form className="profileEditForm" onSubmit={submitHandler}>
                        <input type="text" name="username" placeholder={currentUser.username} onChange={changeHandler} className="profileEditInput profileEditTextInput" />
                        <input type="file" name="profilePicture" placeholder="profilePicture" onChange={(e)=>setProfileImg(e.target.files[0])} className="profileEditInput" />
                        <input type="file" name="coverPicture" placeholder="coverPicture" onChange={(e)=>setCoverImg(e.target.files[0])} className="profileEditInput" />
                        <input type="text" name="desc" placeholder={currentUser.desc} onChange={changeHandler} className="profileEditInput profileEditTextInput" />
                        <input type="text" name="city" placeholder={currentUser.city} onChange={changeHandler} className="profileEditInput profileEditTextInput" />
                        <input type="text" name="from" placeholder={currentUser.from} onChange={changeHandler} className="profileEditInput profileEditTextInput" />
                        <input type="text" name="relationship" placeholder={currentUser.relationship} onChange={changeHandler} className="profileEditInput profileEditTextInput" />
                        <button className="profileEditButton" type="submit">Edit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProfileEdit;
