import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks";
import cart from '../../public/icons8-cart-30.png'
import trash from '../../public/icons8-trash-24.png'
import './DevicePageStyle.css'
import { addOneDevice, deleteDevice } from "../../store/basketSlice";

const Device: FC = () => {

  const device = useAppSelector(state => state.devices.Device);
  const basket = useAppSelector(state => state.basket.Basket)
  const inBasket = basket.some(basket => basket.deviceId === device.id)

  const dispatch = useAppDispatch();

  const addDeviceFromBasket = () => {
      dispatch(addOneDevice(device.id))
  }

  const deleteFromDevice = () => {
      dispatch(deleteDevice(device.id))
  }

  return (
    <div className="DevicePage">
        <div className="upper-base-container">
            <img src={'http://localhost:5000/' + device?.img} alt='6' className="device-page-img"/>
            <div className="lower-base-container">
                <div className="base-info">
                    {device?.name} / {device?.brand.name} <br/> <span>{device?.price} $</span>
                </div>
                {
                inBasket ? <div onClick={() => deleteFromDevice()} className="device-page-cart-btn">DELETE CART<img className="device-page-cart-icon" src={trash} alt="2"/></div> :
                <div onClick={() => addDeviceFromBasket()} className="device-page-cart-btn">ADD TO CART<img className="device-page-cart-icon" src={cart} alt="2"/></div>
                }
            </div>
        </div>
        <div className="params">
          {device?.device_info.map((info) =>
            <div key={info.id} className="param">
                <div className="title">{info.title}:</div>
                <div className="description">{info.description}</div>
            </div>
          )}
        </div>
    </div>
  )
}
  
export default Device