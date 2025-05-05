import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchFilters } from '../store/filtersSlice';
import Filters from "../component/Filters/Filters"
import Devices from '../component/Devices/Devices';
import { fetchDevice } from '../store/devicesSlice';
import Pages from '../component/Pages/Pages';
import { fetchBasket } from '../store/basketSlice';

const Shop: FC = () => {

  const filter = useAppSelector(state => state.filters.setFilter)
  const {error} = useAppSelector(state => state.basket)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilters())
    dispatch(fetchBasket())
  }, [])

  useEffect(() => {
    dispatch(fetchDevice(filter))
  }, [filter])

  return (
    <>
      <Filters/>
      <Devices/>
      {error !== 'fulfilled' ? <div className="warning-note-basket">{error}</div> : ""}
      <Pages/>
    </>
  )
}
  
export default Shop