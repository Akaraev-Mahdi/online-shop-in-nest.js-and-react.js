import React from 'react'
import { FiltersProps } from '../../store/filtersSlice'
import { useAppDispatch, useAppSelector } from "../../hooks"
import { changeFilter } from "../../store/filtersSlice";

export default React.memo(function BrandItem ({name, id}: FiltersProps) {

    const { setFilter, checkedFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();

    const changeBrand = (e: boolean) => {
        if(e){
            dispatch(changeFilter({
                typeId: setFilter.typeId, 
                brandId: id, 
                page: setFilter.page
            }))
        } else {
            dispatch(changeFilter({
                typeId: setFilter.typeId, 
                brandId: '', 
                page: setFilter.page
            }))
        }
    }

    return (
        <div className="items">
            <input checked={checkedFilter.brand === id ? true : false} onChange={(e) => changeBrand(e.target.checked)} className="dropdown-chekbox" type="checkbox"/>
            <span>{name}</span>
        </div>
    )
})