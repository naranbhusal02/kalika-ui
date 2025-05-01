import React from 'react'
import { Gallery } from '@/components/gallery'
// import { Navbar } from '@/components/Navbar'
const page = () => {
  return (
    <div>
        {/* <Navbar></Navbar> */}
        <div className='w-screen flex flex-col items-center justify-center'>

       <Gallery></Gallery> 
        </div>
    </div>
  )
}

export default page