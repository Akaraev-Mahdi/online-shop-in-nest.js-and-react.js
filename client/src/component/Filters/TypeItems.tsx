import { FC } from 'react'
import { FiltersProps } from '../../store/filtersSlice'
import { useAppDispatch, useAppSelector } from "../../hooks"
import { changeFilter } from "../../store/filtersSlice";

const TypeItem: FC<FiltersProps> = ({name, id}) => {

    const { Filter, checkedFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();

    const changeType = (e: boolean) => {
        if(e){
            dispatch(changeFilter({typeId: id, brandId: Filter.brandId, page: Filter.page}))
        } else {
            dispatch(changeFilter({typeId: '', brandId: Filter.brandId, page: Filter.page}))
        }
    }

    return (
        <div className="items">
            <input checked={checkedFilter.type === id ? true : false} onChange={(e) => changeType(e.target.checked)} className="dropdown-chekbox" type="checkbox"/>
            <span>{name}</span>
        </div>
    )
}
  
export default TypeItem