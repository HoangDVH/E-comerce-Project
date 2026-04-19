import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className='flex min-h-[70vh] w-full flex-col items-center justify-center bg-neutral-50 px-4 py-16'>
      <div className='relative text-center'>
        <h1 className='text-7xl font-extrabold tracking-widest text-neutral-800 sm:text-9xl'>404</h1>
        <div className='absolute -right-2 top-0 rotate-12 rounded-md bg-orange px-3 py-1 text-xs font-medium text-white shadow sm:text-sm'>
          Không tìm thấy trang
        </div>
      </div>
      <p className='mt-6 max-w-md text-center text-neutral-600'>Trang bạn tìm không tồn tại hoặc đã được chuyển đi.</p>
      <Link
        to='/'
        className='mt-8 inline-flex min-w-[10rem] items-center justify-center rounded-lg bg-orange px-8 py-3 text-sm font-medium text-white shadow-card transition-colors hover:bg-orange/90'
      >
        Về trang chủ
      </Link>
    </main>
  )
}
