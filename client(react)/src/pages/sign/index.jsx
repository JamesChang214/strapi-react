
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import { setUsers } from '../../redux/user/user.action';
import { getFromDatabase } from '../../redux/database';

import InputCom from '../../components/input'
import LoginBtn from '../../components/button/login'

const Signin = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  const [password, pwdSet] = useState('')
  const [repassword, repwdSet] = useState('')
  const [username, userSet] = useState('')
  const [email, emailSet] = useState('')

  const signin = () => {
    if (password !== repassword) return
    if (password.length === 0) return
    if (username.length === 0) return
    if (email.length === 0) return

    getFromDatabase({
      methodType: 'post',
      url: 'auth/local/register',
      data: {
        username,
        password,
        email
      }
    }).then(res => {
      history.push("/login")
    }).catch(error => {
      alert("Please correct value or Signin")
    })
  }

  const change = (data, type) => {
    switch (type) {
      case 'name':
        userSet(data.target.value)
        break;
      case 'email':
        emailSet(data.target.value)
        break;
      case 'password':
        pwdSet(data.target.value)
        break;
      default:
        repwdSet(data.target.value)
        break;
    }
  }

  return (
    <div className="login-content">
      <InputCom className="login-btn" onChange={e => change(e, "name")} title="name" inputType="text" placeholder="name" />
      <InputCom className="login-btn" onChange={e => change(e, "email")} title="email" inputType="text" placeholder="email" />
      <InputCom className="login-btn" onChange={e => change(e, "password")} title="password" inputType="password" placeholder="password" />
      <InputCom className="login-btn" onChange={e => change(e, "re-password")} title="re-password" inputType="password" placeholder="re-password" />
      <div className="login-btn-group">
        <LoginBtn title="Signin" onClick={signin} />
      </div>
    </div>
  )
}

export default Signin