import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks"
import { changeFilter } from "../../store/filtersSlice";

type PageProps = {
  page: number
}

const PagesItem: FC<PageProps> = (props: {page: number}) => {

  const filter = useAppSelector(state => state.filters.Filter)
  const dispatch = useAppDispatch();

  const switchPage = () => {
    dispatch(changeFilter({typeId: filter.typeId, brandId: filter.brandId, page: props.page}))
  }

  return (
    <div onClick={() => switchPage()} className={`page ${props.page == filter.page ? 'active' : ''}`}>{props.page}</div>
  )
}
  
export default PagesItem
