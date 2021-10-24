import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ProfileCard from "../../../components/card/profile"

const ProfileList = () => {
  const profiles = useSelector(e => e.profileReducer.datas)
  const [otherProfiles, setProfiles] = useState([])
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    try {
      const { id } = JSON.parse(sessionStorage.getItem("strapi"))
      setUserId(id)
      setProfiles(profiles.filter(e => {
        if (!e.user) return false
        return e.user.id !== id
      }))
    } catch (error) {
      console.error(error)
    }
  }, [profiles])

  return (
    <div className="follow">
      {otherProfiles.map((data, ind) => {
        console.log(data)

        return <ProfileCard key={ind} data={{ ...data, userId, profiles }} />
      })}
    </div>
  )
}

export default ProfileList