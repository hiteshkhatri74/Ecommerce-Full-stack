import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>

        <span className='text-green-500 font-bold text-xl'>✔️</span>
        <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>

        <Link 
           to={'/order'} 
           className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:text-white hover:bg-green-600'
        >
            See Order
        </Link>
        
    </div>
    </div>
  )
}

export default Success