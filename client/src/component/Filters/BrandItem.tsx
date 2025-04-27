import { FC } from 'react'
import { FiltersProps } from '../../store/filtersSlice'
import { useAppDispatch, useAppSelector } from "../../hooks"
import { changeFilter } from "../../store/filtersSlice";

const BrandItem: FC<FiltersProps> = ({name, id}) => {

    const { Filter, checkedFilter } = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();

    const changeBrand = (e: boolean) => {
        if(e){
            dispatch(changeFilter({typeId: Filter.typeId, brandId: id, page: Filter.page}))
        } else {
            dispatch(changeFilter({typeId: Filter.typeId, brandId: '', page: Filter.page}))
        }
    }

    return (
        <div className="items">
            <input checked={checkedFilter.brand === id ? true : false} onChange={(e) => changeBrand(e.target.checked)} className="dropdown-chekbox" type="checkbox"/>
            <span>{name}</span>
        </div>
    )
}
  
export default BrandItem