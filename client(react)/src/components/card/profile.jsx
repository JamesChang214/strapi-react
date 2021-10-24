import { useDispatch } from "react-redux"
import { serverURL } from "../../config"
import { getFromDatabase } from "../../redux/database"

import { setProfile } from "../../redux/profile/profile.action"

const ProfileCard = ({ data }) => {
  const { detail, image, user, follows, userId, profiles } = data
  console.log(data)
  const dispatch = useDispatch()

  const clickLike = (type) => {
    const follow = []
    follows.map(data => {
      follow.push(data.id)
    })
    if (type === 'unlike') {
      const index = follow.indexOf(userId)
      follow.splice(index, 1)
    } else {
      follow.push(userId)
    }

    console.log(data.id)
    getFromDatabase({
      methodType: 'put',
      url: `profiles/${data.id}`,
      data: {
        follows: follow
      }
    }).then(res => {

      // const index = profiles.indexOf({id: res.id})
      let index
      profiles.map((data, ind) => {
        if (data.id === res.id) index = ind
        return
      })
      console.log(index)
      let buffer = [...profiles]
      buffer.splice(index, 1)
      buffer.push(res)
      dispatch(setProfile(buffer))
    }).catch(error => {
      alert("Please correct value or Signin")
    })
  }
  return (
    <div className="pro-card">
      {image.url ? <img src={`${serverURL}${image.url}`}></img> : (
        <span>empty</span>
      )}
      <div className="pc-username">{user.username}</div>
      <div className="pc-detail">{detail}</div>
      <div className="pc-follow">
        <p>follow</p>
        {follows.map((data, indx) => {
          return <span key={indx}>{data.username}, </span>
        })}
      </div>
      {follows.filter(e => e.id === userId).length ? <button onClick={() => clickLike('unlike')}>unlike</button> : (
        <button onClick={() => clickLike('like')}>like</button>
      )}
    </div>
  )
}

export default ProfileCard