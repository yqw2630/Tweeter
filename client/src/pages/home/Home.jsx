import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import RightbarHome from '../../components/rightbar/RightbarHome'
import './home.css'

const Home = () => {
    return (
        <>
            <Topbar />
            <div className="homepage">
                <Sidebar />
                <Feed />
                <RightbarHome profile={false}/>
            </div>
        </>
    );
}

export default Home;
