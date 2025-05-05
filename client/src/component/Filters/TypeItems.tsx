import React from 'react'
import { FiltersProps } from '../../store/filtersSlice'
import { useAppDispatch, useAppSelector } from "../../hooks"
import { changeFilter } from "../../store/filtersSlice";

export default React.memo(function TypeItem ({name, id}: FiltersProps) {

    const { setFilter, checkedFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();

    const changeType = (e: boolean) => {
        if(e){
            dispatch(changeFilter({
                typeId: id, 
                brandId: setFilter.brandId, 
                page: setFilter.page
            }))
        } else {
            dispatch(changeFilter({
                typeId: '', 
                brandId: setFilter.brandId, 
                page: setFilter.page
            }))
        }
    }

    return (
        <div className="items">
            <input checked={checkedFilter.type === id ? true : false} onChange={(e) => changeType(e.target.checked)} className="dropdown-chekbox" type="checkbox"/>
            <span>{name}</span>
        </div>
    )
})