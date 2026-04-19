import { Link, useMatch } from 'react-router-dom'
import BrandLogo from '../BrandLogo/BrandLogo'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='border-b border-neutral-100 bg-white py-4 md:py-5'>
      <div className='container'>
        <nav className='flex flex-wrap items-end gap-3'>
          <Link to='/' className='shrink-0'>
            <BrandLogo variant='primary' withLink={false} />
          </Link>
          <div className='text-lg font-medium text-neutral-800 md:ml-5 md:text-xl lg:text-2xl'>
            {isRegister ? 'Đăng ký' : 'Đăng nhập'}
          </div>
        </nav>
      </div>
    </header>
  )
}
