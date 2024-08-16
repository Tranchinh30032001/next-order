import React from 'react'
import { Navbar } from './Navbar'
import { ModeToggle } from '@/components/ToogleDarkMode'
import DropDownUser from './DropDownUser'
import LocaleSwitcher from '@/components/LocaleSwitcher'

const Header = () => {
  return (
    <section className='h-[var(--height-header)] border-b-2 container' >
      <div className='flex items-center justify-between h-full' >
        <Navbar />
        <div className='flex items-center gap-4' >
          <ModeToggle />
          <DropDownUser />
          <LocaleSwitcher />
        </div>
      </div>
    </section>
  )
}

export default Header
