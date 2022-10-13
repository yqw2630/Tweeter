import { React, useContext, useRef, useState } from 'react'
import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import LabelIcon from '@mui/icons-material/Label'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import CancelIcon from '@mui/icons-material/Cancel';
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Share() {
    const {user} = useContext(AuthContext)
    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async(e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('file', file, fileName)
            newPost.img = "http://localhost:8800/images/" + fileName;

            try {
                await axios.post('/upload', data)
            } catch(err) {
                console.log(err)
            }
        }

        try {
            await axios.post('/posts/', newPost)
            alert('Posted!')
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture || "/assets/person/noAvatar.png"} alt="share_img" className="shareProfileImg" />
                    <input type="text" placeholder={`What's on your mind ${user.username}?`} ref={desc} className="shareInput" />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo</span>
                            <input type="file" id="file" accept=".png,.jpeg,.jpg,.bmp,.gif" onChange={(e)=>setFile(e.target.files[0])} className="hidden"/>
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor="lightblue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
