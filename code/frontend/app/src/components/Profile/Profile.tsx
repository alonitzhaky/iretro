import React from 'react'
import { useAppSelector } from '../../app/hooks';
import { getUserProfile } from './profileSlice';

const Profile = () => {
    const iretroBrown = "rgb(62,56,54)";
    const information = useAppSelector(getUserProfile())
    return (
        <div className='text-center'>
            <h1 style={{ color: iretroBrown }}>
            User Profile
            </h1>
            <hr/>
            
        </div>
    )
}

export default Profile