import React from 'react'

function Cards() {
  return (
    <div className='container mt-10'>
      <div className="row flex justify-around align-center" >
        
      <div className='card bg-slate-300 rounded-md p-1  '>
            <div className='img-area w-40 mb-1'>
                <img src="https://img.freepik.com/premium-vector/red-apple-vector-healthy-sweet-fruit_68708-3076.jpg" className='rounded-md' alt="" />
            </div>
            <div className='text-area text-center  rounded-md m-3'>
                <p className='text-lg font-semibold text-red-600'>Red Apple</p>
                <p className=''>₹ 100 /-kg</p>
            </div>

        </div>
        <div className='card bg-slate-300 rounded-md p-1  '>
            <div className='img-area w-40 mb-1'>
                <img src="https://img.freepik.com/premium-vector/red-apple-vector-healthy-sweet-fruit_68708-3076.jpg" className='rounded-md' alt="" />
            </div>
            <div className='text-area text-center  rounded-md m-3'>
                <p className='text-lg font-semibold text-red-600'>Red Apple</p>
                <p className=''>₹ 100 /-kg</p>
            </div>

        </div>
        <div className='card bg-slate-300 rounded-md p-1  '>
            <div className='img-area w-40 mb-1'>
                <img src="https://img.freepik.com/premium-vector/red-apple-vector-healthy-sweet-fruit_68708-3076.jpg" className='rounded-md' alt="" />
            </div>
            <div className='text-area text-center  rounded-md m-3'>
                <p className='text-lg font-semibold text-red-600'>Red Apple</p>
                <p className=''>₹ 100 /-kg</p>
            </div>
        </div>

        </div>

    </div>
  )
}

export default Cards
