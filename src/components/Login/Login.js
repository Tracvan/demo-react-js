import { useFormik, validateYupSchema } from "formik";
import { useState } from "react";
import LoginService from "../../services/login.service"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const formLoginValidate = Yup.object().shape({
  email: Yup.string().email("Email is valid").required('Email is required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

function checkLogin(values, res) {
  for (let i = 0; i < res.data.length; i++) {
    if (values.email === res.data[i].email) {
      if (values.password === res.data[i].password) {
        return true;
      }
    }
  }
  return false;
}


function Login() {
  const navigate = useNavigate()
  const notify = () => toast('🦄 Login Success!');

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validateYupSchema: formLoginValidate,
    onSubmit: (values) => {

      // call api add
      LoginService.getAll()
        .then(res => {
          if (checkLogin(values, res)) {
            notify()
            setTimeout(() => {
              navigate("/users")
            }, 5000)

          } else {
            alert('Email or password is not correct')
            navigate("/login")
          }
        })
      // .catch(err => {
      //   alert("Error adding user")
      // })
    }
  })


  return (
    <div classname="col d-flex justify-content-center">
      <form className="form" onSubmit={formLogin.handleSubmit}>
        <div>
          <ToastContainer />
          <div data-mdb-input-init className="form-outline mb-4">
            <input onChange={formLogin.handleChange} name="email" type="email" id="form2Example1" className="form-control" />
            <label className="form-label" htmlFor="form2Example1">Email address</label>
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <input onChange={formLogin.handleChange} name="password" type="password" id="form2Example2" className="form-control" />
            <label className="form-label" htmlFor="form2Example2">Password</label>
          </div>
          <div className="row mb-4">
            <div classname="col d-flex justify-content-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" defaultValue id="form2Example31" defaultChecked />
                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
              </div>
            </div>
            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
          <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Sign in</button>
          <div className="text-center">
            <p>Not a member? <a href="#!">Register</a></p>
            <p>or sign up with:</p>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f" />
            </button>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google" />
            </button>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter" />
            </button>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}



export default Login