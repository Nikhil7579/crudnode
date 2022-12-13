import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [data,updateData] = useState({firstname:'',email:'',password:''})
    const navigate = useNavigate();
    const onChangedata = (e) => {
        updateData({...data,[e.target.name]:e.target.value})

    }
    console.log(data)
    const submit = (e) => {
        e.preventDefault()
        console.log(data)
        // var res = await axios.post('http://localhost:3000/signup',)
        axios({
            url:'http://localhost:3000/signup',
            method:'post',
            headers: {
          'Content-Type': 'application/json'
        },
            data : {
                firstname:data.firstname,
                email:data.email,
                password:data.password
            }
        }).then((res)=>{
            console.log(res)
            if(res.status===201)
            {
                navigate('/home')
            }

        }).catch((err)=>{
            console.log(err)

        })

    }
  return (
    <div>
        <div className="container z-depth-1 my-5 p-5">

<section>

  <h3 className="font-weight-normal text-center dark-grey-text my-4 pb-2">Start Using MDBootstrap Now!</h3>
  <div className="row d-flex justify-content-center">
  <form  onSubmit={submit}>

    <div className="col-md-6 col-lg-3 mb-4">

      <div className="md-form md-outline form-lg">
        <input type="text" id="form1" className="form-control form-control-lg" name='firstname' value={data.firstname} onChange={onChangedata} />
        <label htmlFor="form1">Name</label>
      </div>
      
    </div>
    
    <div className="col-md-6 col-lg-3 mb-4">
      
      <div className="md-form md-outline form-lg">
        <input type="email" id="form2" className="form-control form-control-lg" name='email' value={data.email} onChange={onChangedata} />
        <label htmlFor="form2">Email</label>
      </div>
      
    </div>
    
    <div className="col-md-6 col-lg-3 mb-4">
      
      <div className="md-form md-outline form-lg">
        <input type="password" id="form3" className="form-control form-control-lg" name='password' value={data.password} onChange={onChangedata} />
        <label htmlFor="form3">Password</label>
      </div>
      
    </div>
    
    <div className="col-md-6 col-lg-3 mb-4">
      
      <button className="btn btn-block btn-primary my-4">Sign up</button>
      
    </div>
    </form>

  </div>

</section>

</div>
    </div>
  )
}

export default Signup