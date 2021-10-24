import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import { setUsers } from '../../redux/user/user.action';
import { getFromDatabase } from '../../redux/database';

import InputCom from '../../components/input'
import LoginBtn from '../../components/button/login'

import './login.scss'

const Login = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const [password, pwdSet] = useState('')
  const [identifier, userSet] = useState('')

  const login = () => {
    if (!password) {
      alert("input password !")
      return
    }

    if (!identifier) {
      alert("input identifier !")
      return
    }

    getFromDatabase({
      methodType: 'post',
      url: 'auth/local',
      data: {
        identifier,
        password,
      }
    }).then(res => {
      const { jwt, user: { id, username } } = res

      sessionStorage.setItem("strapi", JSON.stringify({ jwt, id, username }))
      
      dispatch(setUsers({ jwt, id, username }))
      history.push("/profile")
    }).catch(error => {
      alert("Please correct value or Signin")
    })
  }

  const signin = () => {
    history.push("/signin")
  }

  const change = (data, type) => {
    type === "email" ? userSet(data.target.value) : pwdSet(data.target.value)
  }

  return (
    <div className="login-content">
      <InputCom className="login-btn" onChange={e => change(e, "email")} title="email" inputType="text" placeholder="email" />
      <InputCom className="login-btn" onChange={e => change(e, "password")} title="password" inputType="password" placeholder="password" />
      <div className="login-btn-group">
        <LoginBtn title="Login" onClick={login} />
        <LoginBtn title="Signin" onClick={signin} />
      </div>
    </div>
  )
}

export default Login