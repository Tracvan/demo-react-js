import UserSearch from "../UserSearch/UserSearch";
import {useEffect, useState} from "react";
import Star from "./Star/Star";
import {Link} from "react-router-dom";
import UserService from "../../../services/user.service";
import React from "react";
import '../../../../src/App.css'

function UserList() {

    const [users, setUsers] = useState([]);
    const [reRender, setReRender] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        //call api
        UserService.getAllUsers()
            .then(res => {
                const data = res.data;
                setUsers(data)
                setListUsersFilter(data)
                setShowSpinner(false)
            })
    }, [reRender])

    const [listUsersFilter, setListUsersFilter] = useState(users);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            setShowSpinner(true)
            // call api delete
            UserService.deleteUser(id)
                .then(res => {
                    console.log("Delete success")
                    setReRender(!reRender);
                    setShowSpinner(false)
                })

        }
    }


    const changeStart = (indexUser, newStar) => {
        users[indexUser].rate = newStar + 1;
        setUsers([...users]);
    }

    const handleSearch = (keyword) => {
        //tim kiem user theo ten
        let usersF = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].name.toLowerCase().includes(keyword.toLowerCase())) {
                usersF.push(users[i]);
            }
        }

        // const userFilter = users.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
        setListUsersFilter(usersF);
    }

    return (
        <>
            <div className="card mt-2">
                <div className="card-header">
                    <div className="row">
                        <div className="col"> User List
                            <Link to={`/users/create`}>
                                <button className="btn btn-primary">Add User</button>
                            </Link>
                        </div>
                        <div className="col">
                            <UserSearch search={handleSearch}/>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                <div className="d-flex justify-content-center">
                    { showSpinner && (
                         <div className="overlay">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                    )}
                     </div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User ID</th>

                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Dob</th>
                            <th scope="col">Rate</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {listUsersFilter.map((user, index) => (
                            <tr key={"tr" + index}>
                                <th scope="row">{index + 1}</th>
                                <th scope="row">{'UserID-' + user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dob}</td>
                                <td>
                                    <Star name="Luan" indexUser={index} totalStar={user.rate} ratingStar={changeStart}/>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Delete
                                    </button>
                                    <Link to={`/users/${user.id}/edit`}>
                                        <button className={"btn btn-primary"}>Edit</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                   
                </div>

            </div>
        </>
    )
}

export default UserList;