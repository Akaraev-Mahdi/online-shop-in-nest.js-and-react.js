import './DevicesStyle.css'
import { FC } from 'react'
import DevicesItems from './DevicesItems'
import { useAppSelector } from '../../hooks'

const Devices: FC = () => {

    const devices = useAppSelector(state => state.devices.Devices)
    
    return (
        <main>
            {devices?.map((device) => <DevicesItems {...device} key={device.id}/>)}
        </main>
    )
}

export default Devices