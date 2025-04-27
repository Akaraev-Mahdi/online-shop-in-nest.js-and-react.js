import { FC, useState } from "react"
import { LoginUser } from "../../store/usersSlice"
import './AuthStyle.css'
import { useAppDispatch } from "../../hooks"
import { useNavigate } from "react-router-dom"

const Login: FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    
    const Enter = async () => {
      let LoginObj = {
        email: email,
        password: password
      }
      const response = await dispatch(LoginUser(LoginObj))
      if(response.meta.requestStatus === "rejected"){
        alert(response.payload)
      }else{
        navigate('/')
      }
    }

    return (
      <div className="auth">
        <div>
          <h1 className="auth-title">Login</h1>
          <div className="auth-inputs">
            <input value={email} onChange={e => setEmail(e.target.value)} className="auth-input" type="text" placeholder="email"/>
            <input value={password} onChange={e => setPassword(e.target.value)} className="auth-input" type="text" placeholder="password"/>
          </div>
          <div className="auth-btns">
            <a className="auth-link" href="/Regist">Registration</a>
            <button onClick={() => Enter()} className="auth-btn">ENTER</button>
          </div>
        </div>
      </div>
    )
}
  
export default Login