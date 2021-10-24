const InputCom = (props) => {
  const { title, inputType, ...other } = props
  return (
    <div>
      <span className="login-span">{title}</span>
      <input type={inputType} {...other} />
    </div>
  )
}

export default InputCom