import React from 'react'
import Image from "next/image";

const Loading = () => {
  return (
    <div className='relative w-full h-full'>
      <div className='absolute'>
        <Image
          src='/images/loading.png'
          width={384}
          height={500}
          alt="icon"
        />
      </div>
    </div>
  )
}

export default Loading