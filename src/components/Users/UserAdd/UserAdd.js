import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Suspense, useState } from "react";
import UserService from "../../../services/user.service";

const formAddValidate = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email("Email is valid").required('Email is required')
});

function UserAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // tao doi tuong formik
    const formAdd = useFormik({
        initialValues: {
            id: "",
            name: "",
            dob: "",
            rate: ""
        },
        validationSchema: formAddValidate,
        onSubmit: (values) => {
            setLoading(true);
            // call api add
            UserService.addUser(values).then(res => {
                setLoading(false);
                navigate("/users");
            }).catch(err => {
                alert("Error adding user")
            })
        }
    })

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h4>Add User</h4>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={formAdd.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input name="name" onChange={formAdd.handleChange} type="text" className="form-control" />
                            {formAdd.errors.name && <p className={"text-danger"}>{formAdd.errors.name}</p>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input name="email" onChange={formAdd.handleChange} type="text" className="form-control" />
                            {formAdd.errors.email && <p className={"text-danger"}>{formAdd.errors.email}</p>}

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Birthday</label>
                            <input type="date" onChange={formAdd.handleChange} value={formAdd.values.dob} name="dob"
                                className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rate</label>
                            <input type="text" value={formAdd.values.rate} onChange={formAdd.handleChange} name="rate"
                                className="form-control" />
                        </div>

                        <div className="mb-3">
                            {!loading ? (
                                <button type="submit" className="btn btn-primary">Save</button>
                            ) : (
                                <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                        aria-hidden="true"></span>
                                    <span className="sr-only">Loading...</span>
                                </button>
                            )}
                            <Link to={"/users"}>
                                <button className="btn btn-info">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default UserAdd;