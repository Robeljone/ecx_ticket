import React, { useState } from 'react';
import axios from 'axios';
function Login() {
    const [uname, setUname] = useState("")
    const [passw, setPassw] = useState("")
    const login = async () => {
        const data = [uname, passw]
        const resp = await axios.post('http://10.3.5.115:5000/login', data)
        if (resp) {
            localStorage.setItem('session', JSON.stringify(resp.data))
        }
        else {
            alert('Login Error')
        }
    }
    return (
        <div className="hold-transition login-page">
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Tech Support Admin</p>
                    <form onSubmit={login}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="User Name" value={uname} onChange={(e) => (setUname(e.target.value))} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" value={passw} onChange={(e) => (setPassw(e.target.value))} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block">Login In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
