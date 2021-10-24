// import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getFromDatabase } from '../../redux/database';
import { setProfile } from '../../redux/profile/profile.action'

import ProfileList from './components/profileList';
import MyProfile from './components/myprofile';

import './profile.scss'

const ProfilePage = () => {
  const dispatch = useDispatch();

  getFromDatabase({
    methodType: 'get',
    url: 'profiles',
    data: {}
  }).then(res => {
    dispatch(setProfile(res))
  }).catch(error => {
    console.error(error)
  })

  return (
    <div className="profile">
      <ProfileList />
      <MyProfile />
    </div>
  )
}

export default ProfilePage