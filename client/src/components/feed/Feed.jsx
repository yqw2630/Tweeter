import { React, useState, useEffect, useContext } from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed(props) {
  const [posts, setPosts] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = props.username ? 
      await axios.get(`/posts/profile/${props.username}`) :
      await axios.get(`/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
    }
    fetchPosts()
  },[props])

  return (
    <div className="feed">
        <div className="feedWrapper">
            <Share />
            {posts.map((p)=> (
              <Post key={p._id} post={p}/>
            ))}
        </div>
    </div>
  )
}
