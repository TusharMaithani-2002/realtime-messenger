'use client';

import Image from "next/image";

function Avatar({user}) {

  return (
    <div className="relative">
        <div className="inline-block
        relative
        rounded-full
        overflow-hidden
        h-9
        w-9
        md:h-11
        md:w-11
        ">
            <Image 
             alt="avatar"
             src={user?.image || '/images/placeholder.jpg'}
             fill 
            /> 
        </div>
    </div>
  )
}

export default Avatar