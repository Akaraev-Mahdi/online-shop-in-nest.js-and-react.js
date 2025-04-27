import { FC, useState } from 'react'
import './HeaderStyle.css'
import profile from '../../public/profile_icon.png'
import { useAppSelector } from '../../hooks';

const Header: FC = () => {

    const basket = useAppSelector(state => state.basket.Basket);
    const [show, setShow] = useState<boolean>(false)

    return (
        <header>
            <a href="/" className="logo">DeviceStore</a>
            <div className="navbar">
                <a className="login-btn" href="/login">LOGIN</a>
                <div className="profile">
                    <img onClick={() => setShow(!show)} className="profile-icon" src={profile} alt="1"/>
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
                            <a href="/Basket">CART</a>
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