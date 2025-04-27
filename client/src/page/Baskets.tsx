import { FC, useEffect } from "react"
import Basket from "../component/Basket/Basket";
import { fetchBasket } from "../store/basketSlice";
import { useAppDispatch } from "../hooks";

const Baskets: FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBasket())
  }, []);
  
  return (
    <Basket/>
  )
}
  
export default Baskets