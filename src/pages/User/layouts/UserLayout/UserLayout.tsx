import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='bg-neutral-100 py-8 text-sm text-gray-600 md:py-12 lg:py-16'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='min-w-0 md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
