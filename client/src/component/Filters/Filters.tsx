import React, { useState } from 'react'
import './FiltersStyle.css'
import arrow from '../../public/icons8-arrow-24.png'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { changeFilter } from "../../store/filtersSlice";
import TypeItems from './TypeItems'
import BrandItems from './BrandItem'

export default React.memo(function Filters() {

    const {Filters, Filter} = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState<string>('')

    const changeOpen = (filter: string) => {
        if(filter != open){
            setOpen(filter)
        } else {
            setOpen('')
        }
    }

    return (
    <div className="filters-section">
        <div className="filter">
            <div className="filter-btn" onClick={() => changeOpen('type')}>
                TYPE
                <img className="arrow-icon" src={arrow} alt="3"/>
            </div>
            <div className={`filters-item ${open === 'type' ? 'show' : ''}`}>
                {Filters.type?.map((type) => <TypeItems {...type} key={type.id}/>)}
            </div>
        </div>
        <div className="filter">
            <div className="filter-btn" onClick={() => changeOpen('brand')}>
                BRAND
                <img className="arrow-icon" src={arrow} alt="3"/>
            </div>
            <div className={`filters-item ${open === 'brand' ? 'show' : ''}`}>
                {Filters.brand?.map((brand) => <BrandItems {...brand} key={brand.id}/>)}
            </div>
        </div>
        <div onClick={() => dispatch(changeFilter({typeId: '', brandId: '', page: Filter.page}))} className="filter">
            <div className="filter-btn">
                RESET FILTERS
            </div>
        </div>
    </div>
    )
})