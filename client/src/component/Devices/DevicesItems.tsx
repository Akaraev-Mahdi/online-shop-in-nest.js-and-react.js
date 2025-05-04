import { FC } from 'react'
import cart from '../../public/icons8-cart-30.png'
import trash from '../../public/icons8-trash-24.png'
import { DeviceProps } from '../../store/devicesSlice'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { addOneDevice, deleteDevice } from '../../store/basketSlice'

const DevicesItems: FC<DeviceProps> = ({id, img, name, price, brand, type, device_info}) => {

    const {Basket} = useAppSelector(state => state.basket)
    const inBasket = Basket.some(basket => basket.deviceId === id)

    const dispatch = useAppDispatch();

    let navigate = useNavigate()

    const addDeviceFromBasket = () => {
        const device = {id, img, name, price, brand, type, device_info}
        dispatch(addOneDevice(device))
    }

    const deleteFromDevice = () => {
        dispatch(deleteDevice(id))
    }

    return (
        <div className="product">
            <img onClick={() => navigate('DevicePage/' + id)} src={'http://localhost:5000/' + img} alt='6' className="product-img"/>
            <div className="product-info"> <span>{price} $</span> <br/> {brand.name} / {name}</div>
            {
                inBasket ? <div onClick={() => deleteFromDevice()} className="product-cart-btn">DELETE CART<img className="cart-icon" src={trash} alt="2"/></div> :
                <div onClick={() => addDeviceFromBasket()} className="product-cart-btn">ADD TO CART<img className="cart-icon" src={cart} alt="2"/></div>
            }
        </div>
    )
}
  
export default DevicesItems