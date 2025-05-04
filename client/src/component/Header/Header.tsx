import { FC, useState } from 'react'
import './HeaderStyle.css'
import profile from '../../public/profile_icon.png'
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {

    const basket = useAppSelector(state => state.basket.Basket);
    const [show, setShow] = useState<boolean>(false)
    const navigate = useNavigate()

    return (
        <header>
            <a onClick={() => navigate('/')} className="logo">DeviceStore</a>
            <div className="navbar">
                <a className="login-btn" onClick={() => navigate('/login')}>LOGIN</a>
                <div onClick={() => setShow(!show)} className="profile">
                    <img className="profile-icon" src={profile} alt="1"/>
                    {
                        basket.length !== 0 ? 
                        <div className="notify">{basket.length}</div> :
                        ""
                    }
                </div>
                {   show ? 
                    <div className='profile_info'>
                        {localStorage.getItem('token') !== null ? "dexter" : "NOT REGIST"}
                        <hr/>
                        <div className="profile_info_cart">
                            <a onClick={() => navigate('/Basket')}>CART</a>
                            {
                                basket.length !== 0 ?
                                <div className="profile_info_cart_notify"></div> :
                                ""
                            }
                        </div>
                    </div> :
                    ""
                }
            </div>
        </header>
    )
}

export default Header