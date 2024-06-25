
import './App.css';
import UserList from "./components/Users/UserList/UserList";
import {Route, Routes} from "react-router-dom";
import Master from "./pages/Master/Master";
import UserAdd from "./components/Users/UserAdd/UserAdd";
import UserEdit from "./components/Users/UserEdit/UserEdit";
import Login from './components/Login/Login';

function App() {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Master/>} >
                    <Route path={"/users"} element={<UserList/>} />
                    <Route path={"/users/create"} element={<UserAdd/>} />
                    <Route path={"/users/:id/edit"} element={<UserEdit/>} />

                    <Route path={'/login'} element={<Login/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
