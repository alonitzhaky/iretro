import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserProfileAsync } from './profileSlice';

const Profile = () => {
    const iretroBrown = "rgb(62,56,54)";
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUserProfileAsync())

    }, [])

    const {name, email, admin, username} = useAppSelector((state) => state.profile)
    return (
        <div className='text-center'>
            <h1 style={{ color: iretroBrown }}>
                User Profile
            </h1>
            <hr />
            <h2>{name}</h2>
        </div>
    )
}

export default Profile