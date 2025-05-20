import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [data,setData] = useState({
        email : "",
        password : ""
    });

    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log("handle Submit event is fired")

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()
        console.log(dataApi);

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }
    
  return (
        <div className='min-h-[calc(100vh-4rem)] h-full w-full bg-slate-500 flex items-center justify-center rounded'>
            <div className='bg-white p-5 w-full max-w-sm rounded'>

                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons'/>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-200 p-2 mt-1'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-slate-200'
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-200 p-2 flex mt-1'>

                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-slate-200'/>

                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>

                            </div>
                            
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>
                        </div>

                        <button type='submit' className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full mx-auto block mt-6'>Login</button>
                    </form>

                    <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>
        </div>
  )
}

export default Login;