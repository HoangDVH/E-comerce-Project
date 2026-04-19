import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarUrl } from 'src/utils/utils'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)

  return (
    <div className='min-w-0 max-w-full rounded-xl border border-neutral-200 bg-white shadow-card md:sticky md:top-20 md:self-start'>
      <div className='flex min-w-0 items-center border-b border-neutral-200 px-4 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img src={getAvatarUrl(profile?.avatar)} alt='' className='h-full w-full object-cover' />
        </Link>
        <div className='min-w-0 flex-1 pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600' title={profile?.email}>
            {profile?.email}
          </div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <nav className='flex gap-1 overflow-x-auto px-2 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:gap-0 md:overflow-visible md:border-t md:border-neutral-100 md:px-0 md:pb-2 md:pt-1 [&::-webkit-scrollbar]:hidden'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames(
              'flex shrink-0 items-center whitespace-nowrap rounded-lg px-3 py-2.5 capitalize transition-colors md:rounded-none md:px-4 md:py-3',
              {
                'bg-orange/10 text-orange md:bg-transparent': isActive,
                'text-gray-600 hover:bg-neutral-50 md:hover:bg-transparent': !isActive
              }
            )
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames(
              'flex shrink-0 items-center whitespace-nowrap rounded-lg px-3 py-2.5 capitalize transition-colors md:mt-0 md:rounded-none md:px-4 md:py-3',
              {
                'bg-orange/10 text-orange md:bg-transparent': isActive,
                'text-gray-600 hover:bg-neutral-50 md:hover:bg-transparent': !isActive
              }
            )
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames(
              'flex shrink-0 items-center whitespace-nowrap rounded-lg px-3 py-2.5 capitalize transition-colors md:mt-0 md:rounded-none md:px-4 md:py-3',
              {
                'bg-orange/10 text-orange md:bg-transparent': isActive,
                'text-gray-600 hover:bg-neutral-50 md:hover:bg-transparent': !isActive
              }
            )
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='h-full w-full' />
          </div>
          Đơn mua
        </NavLink>
      </nav>
    </div>
  )
}
