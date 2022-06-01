import {Route, Routes} from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Home from "./components/Home";
import Account from "./components/Account"

function App() {
  //const user = localStorage.getItem("token")
  return (
      <Routes>
        <Route path="/" exact element={<Home/>}/>}
        <Route path="/signup" exact element={<Signup/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/account" exact element={<Account/>}/>
      </Routes>
  )
}

export default App;
