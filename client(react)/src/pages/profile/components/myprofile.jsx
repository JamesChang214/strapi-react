import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';

import { serverURL } from '../../../config'
import LoginBtn from '../../../components/button/login';
import { getFromDatabase } from '../../../redux/database';

const MyProfile = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(e => e.profileReducer.datas)

  let profileId = 0;
  const [id, setId] = useState(0)
  const [imgURL, setImgURL] = useState('')
  const [follow, setFollows] = useState([])
  const [mtype, setType] = useState('post')
  const detail = useRef()
  const username = useRef()
  const imgFile = useRef()

  const history = useHistory()

  useEffect(() => {
    try {
      const data = JSON.parse(sessionStorage.getItem("strapi"))

      setId(data.id)
      username.current.innerHTML = data.username

      const myProfile = profiles.filter(e => e.user.id === id)

      if (myProfile.length) {
        profileId = myProfile[0].id
        if (myProfile[0].image) setImgURL(`${serverURL}${myProfile[0].image.url}`)

        if (myProfile[0].detail) setType('put')
        if (myProfile[0].follows.length) {
          setFollows(myProfile[0].follows.filter(e => e.id !== myProfile[0].id))
        }
        detail.current.value = myProfile[0].detail
      }

    } catch (error) {
      console.error(error)
    }
  }, [profiles,])

  const updateData = (imgId = null) => {
    let url = 'profiles';

    if (mtype === 'put') url += `/${profileId}`

    let data = {
      username: username.current.value,
      detail: detail.current.value,
      user: id,
    }

    if (imgId) data.image = { id: imgId }
    // return
    getFromDatabase({
      methodType: mtype,
      url,
      data
    }).then(res => {
      // history.push('/profiles')
    }).catch(error => {
    })
  }

  const update = () => {
    const data = new FormData()

    if (!imgURL) {
      data.append('files', imgFile.current.files[0])
      getFromDatabase({
        methodType: 'post',
        url: 'upload',
        data
      }).then(res => {
        updateData(res[0].id)
      })
    } else updateData()
  }

  return (
    <div className="profile-list">
      <h1 style={{ 'textAlign': 'center' }}>My profile</h1>
      <div className="pro-img">
        {imgURL ? <img src={imgURL} className="photo" /> : (
          <>
            <input ref={imgFile} type="file" className="photo" />
          </>
        )}
        <p className="pro-username" ref={username} />
        <div className="x-center">
          <textarea className="pro-detail" ref={detail} />
        </div>
      </div>
      <div className="x-center">
        <LoginBtn title="Update" onClick={update} />
      </div>
      {follow.map((data, ind) => {
        return (
          <span>{data.username}</span>
        )
      })}
    </div>
  )
}

export default MyProfile