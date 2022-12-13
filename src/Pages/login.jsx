import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, updateData] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const onChangedata = (e) => {
        updateData({ ...data, [e.target.name]: e.target.value })

    }
    console.log(data)
    const submit = (e) => {
        e.preventDefault()
        console.log(data)
        // var res = await axios.post('http://localhost:3000/signup',)
        axios({
            url: 'http://localhost:3000/login',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                email: data.email,
                password: data.password
            }
        }).then((res) => {
            console.log(res)
            // if (res.status === 201) {
            //     navigate('/home')
            // }

        }).catch((err) => {
            console.log(err)

        })

    }
    return (
        <div>
            <section>

                <h3 className="font-weight-normal text-center dark-grey-text my-4 pb-2">Start Using MDBootstrap Now!</h3>

                <div className="row d-flex justify-content-center">
                    <form onSubmit={submit}>
                        <div className="col-md-6 col-lg-3 mb-4">

                            <div className="md-form md-outline form-lg">
                                <input type="email" id="form2" className="form-control form-control-lg" name='email' onChange={onChangedata} value={data.email} />
                                <label for="form2">Email</label>
                            </div>

                        </div>

                        <div className="col-md-6 col-lg-3 mb-4">

                            <div className="md-form md-outline form-lg">
                                <input type="password" id="form3" className="form-control form-control-lg" name='password' onChange={onChangedata} value={data.password} />
                                <label for="form3">Password</label>
                            </div>

                        </div>

                        <div className="col-md-6 col-lg-3 mb-4">

                            <button className="btn btn-block btn-primary my-4">Login</button>

                        </div>
                    </form>
                </div>

            </section>  
        </div>
    )
}

export default Login