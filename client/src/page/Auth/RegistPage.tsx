import { FC, useState } from "react"
import './AuthStyle.css'
import { useAppDispatch } from "../../hooks"
import { RegistUser } from "../../store/usersSlice"

const Regist: FC = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch();

    const Enter = async () => {

        let registObj = {
            username: username,
            email: email,
            password: password
        }

        const response = await dispatch(RegistUser(registObj))
        if(response.meta.requestStatus === "rejected"){
            alert(response.payload)
        }else{
            alert("Мы отправили вам письмо на почту, потвердите почту.")
        }
    }

    return (
      <div className="auth">
          <div>
              <h1 className="auth-title">Registration</h1>
              <div className="auth-inputs">
                  <input value={username} onChange={e => setUsername(e.target.value)} className="auth-input" type="text" placeholder="name"/>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="auth-input" type="text" placeholder="email"/>
                  <input value={password} onChange={e => setPassword(e.target.value)} className="auth-input" type="text" placeholder="password"/>
              </div>
              <div className="auth-btns">
                  <a className="auth-link" href="/login">login</a>
                  <button onClick={() => Enter()} className="auth-btn">ENTER</button>
              </div>
          </div>
      </div>
    )
}
  
export default Regist