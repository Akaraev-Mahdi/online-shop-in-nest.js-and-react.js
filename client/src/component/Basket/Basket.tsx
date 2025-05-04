import { FC } from "react"
import BasketItem from "./BasketItem"
import { useAppSelector } from "../../hooks";
import './BasketStyle.css'

const Basket: FC = () => {

    const {Basket, error} = useAppSelector(state => state.basket);

    return (
      <>
        <div className="basket-page-title">Basket<span>{Basket?.length} item</span></div>
        {Basket?.map((basket) => <BasketItem {...basket} key={basket.device.id}/>)}
        {error !== 'fulfilled' ? <div className="warning-note-basket">{error}</div> : ""}
      </>
    )
}
  
export default Basket