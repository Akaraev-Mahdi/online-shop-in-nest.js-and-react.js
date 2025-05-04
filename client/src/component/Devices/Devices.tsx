import React from 'react'
import DevicesItems from './DevicesItems'
import { useAppSelector } from '../../hooks'
import './DevicesStyle.css'

export default React.memo(function Devices () {

    const devices = useAppSelector(state => state.devices.Devices)
    
    return (
        <main>
            {devices?.map((device) => <DevicesItems {...device} key={device.id}/>)}
        </main>
    )
})