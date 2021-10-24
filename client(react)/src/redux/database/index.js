import axios from 'axios'
import { serverURL } from '../../config'
export const getFromDatabase = async (fetchData) => {
  let jwt
  try {
    const data = JSON.parse(sessionStorage.getItem("strapi"))
    jwt = data.jwt
  } catch (error) {
  }
  const { methodType, url, data } = fetchData
  const res = await axios({ method: methodType, url: `${serverURL}/${url}`, data })
  return res.data
}