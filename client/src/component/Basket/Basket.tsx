import { FC } from "react"
import BasketItem from "./BasketItem"
import { useAppSelector } from "../../hooks";
import './BasketStyle.css'

const Basket: FC = () => {

    const {Basket} = useAppSelector(state => state.basket);
    const isAuth = localStorage.getItem("token")

    return (
      <>
        <div className="basket-page-title">Basket<span>{Basket?.length} item</span></div>
        {Basket?.map((basket) => <BasketItem {...basket} key={basket.device.id}/>)}
        {isAuth === null ? <div className="warning-note-basket">Вы должны войти, или зарегистрироватся и активировать почту.</div> : ""}
      </>
    )
}
  
export default Basket