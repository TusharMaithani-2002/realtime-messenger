'use client';

import clsx from "clsx";
import Link from "next/link";

function DesktopItem({label,icon:Icon,href,active,onClick}) {

  const handleClick = () => {
    if(onClick) return onClick();
  }
  return (
    <li onClick={handleClick} className=''>
      <Link href = {href} className={clsx(
        `
        group
        gap-x-3
        flex
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-black
        hover:bg-gray-100
        `,active && 'bg-gray-100 text-black'
      )}>
        <Icon className='h-6 w-6 shrink-0' />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem