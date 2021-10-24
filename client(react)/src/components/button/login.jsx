const LoginBtn = (props) => {
  const { title, ...others } = props
  return (
    <button {...others}>{title}</button>
  )
}

export default LoginBtn