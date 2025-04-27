import { FC } from 'react'
import { useAppSelector } from '../../hooks'
import PagesItem from './PagesItem'
import './PagesStyle.css'

const Pages: FC = () => {

    const deviceCount = useAppSelector(state => state.devices.DeviceCount)

    let pageCount = Math.ceil(deviceCount / 2)
    let pages = []

    for(let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }

    return (
        <div className='pages'>
            {pages.map((page) => <PagesItem page={page} key={page}/>)}
        </div>
    )
}
  
export default Pages