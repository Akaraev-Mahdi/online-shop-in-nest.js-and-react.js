import { FC } from "react"
import trash from '../../public/icons8-trash-24.png'
import { BasketProps, deleteDevice } from "../../store/basketSlice"
import { useAppDispatch } from "../../hooks";

const BasketItem: FC<BasketProps> = ({device}) => {

    const dispatch = useAppDispatch();

    const deleteFromBasket = () => {
        dispatch(deleteDevice(device.id))
    }

    return (
    <div className="basket-item">
        <img className="basket-page-img" src={'http://localhost:5000/' + device.img} alt="12"/>
        <div className="basket-info">
            <div className="basket-device-info">
                {device.name} / {device.brand.name} <span>{device.price}$</span>
            </div>
            <div className="basket-params">
                {device.device_info.map((info) =>
                    <div key={info.id} className="basket-param">
                        <div className="basket-title">{info.title}:</div>
                        <div className="basket-description">{info.description}</div>
                    </div>
                )}
            </div>
            <div onClick={() => deleteFromBasket()} className="basket-page-cart-btn">DELETE FROM CART <img className="basket-page-cart-icon" src={trash} alt="1"/></div>
        </div>
    </div>
    )
}
  
export default BasketItem