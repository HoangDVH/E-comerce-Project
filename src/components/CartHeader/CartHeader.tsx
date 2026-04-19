import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import BrandLogo from '../BrandLogo/BrandLogo'
import NavHeader from '../NavHeader'
import SearchBar from '../SearchBar'

export default function CartHeader() {
  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-orange text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='bg-white py-6'>
        <div className='container'>
          <nav className='flex flex-col gap-3 md:flex-row md:items-center md:gap-6 md:justify-between'>
            <Link to={path.home} className='flex flex-shrink-0 items-center'>
              <BrandLogo variant='primary' withLink={false} />
              <div className='mx-4 h-6 w-[1px] bg-orange md:h-8' />
              <div className='capitalize text-orange md:text-xl'>Giỏ hàng</div>
            </Link>
            <SearchBar variant='cart' formClassName='min-w-0 flex-1 md:mt-0' />
          </nav>
        </div>
      </div>
    </div>
  )
}
