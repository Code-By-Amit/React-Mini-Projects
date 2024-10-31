import React from 'react'

export const NavBar = () => {
  return (
     <nav className="flex bg-violet-900 justify-between text-white py-2">
      
            <div className="logo">
                <span className='font-bold text-xl mx-8'>iTask</span>
            </div>
            <ul className='flex gap-9 mx-9'>
                <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
            </ul>
        
     </nav>
  )
}
