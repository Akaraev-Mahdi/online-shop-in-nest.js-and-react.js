import { Route, Routes } from "react-router-dom"
import Shop from "../page/Shop"
import Regist from "../page/Auth/RegistPage"
import Login from "../page/Auth/LoginPage"
import Baskets from "../page/Baskets"
import DevicePage from "../page/DevicePage"
import SuccessAuth from "../page/Auth/SuccessAuth"

function AppRouter() {
    return (
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/regist" element={<Regist/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Basket" element={<Baskets/>}/>
        <Route path="/successAuth" element={<SuccessAuth/>}/>
        <Route path={"/DevicePage" + "/:id"} element={<DevicePage/>}/>
      </Routes>
    )
  }
  
  export default AppRouter