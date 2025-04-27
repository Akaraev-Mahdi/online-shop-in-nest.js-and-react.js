import { FC, useEffect } from "react"
import {useParams} from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { fetchOneDevice } from "../store/devicesSlice"
import Device from "../component/DevicePage/Device"

const DevicePage: FC = () => {

  const dispatch = useAppDispatch();

  const {id} = useParams()
  useEffect(() => {
    dispatch(fetchOneDevice(id!))
  }, [])

  return (
    <Device/>
  )
}
  
export default DevicePage