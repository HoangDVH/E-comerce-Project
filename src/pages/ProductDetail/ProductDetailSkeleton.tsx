import Skeleton from 'src/components/Skeleton'
import { Helmet } from 'react-helmet-async'

export default function ProductDetailSkeleton() {
  return (
    <div className='bg-neutral-100 py-4 md:py-6' aria-busy='true' aria-label='Đang tải'>
      <Helmet>
        <title>Đang tải | UniMart</title>
      </Helmet>
      <div className='container'>
        <div className='rounded-xl bg-white p-4 shadow-card ring-1 ring-black/5 md:p-6'>
          <div className='grid grid-cols-12 gap-6 md:gap-9'>
            <div className='col-span-12 md:col-span-5'>
              <div className='relative w-full pt-[100%]'>
                <Skeleton className='absolute inset-0 rounded-none' />
              </div>
              <div className='mt-4 grid grid-cols-4 gap-1 sm:grid-cols-5'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className='relative w-full pt-[100%]'>
                    <Skeleton className='absolute inset-0 rounded-none' />
                  </div>
                ))}
              </div>
            </div>
            <div className='col-span-12 space-y-4 md:col-span-7'>
              <Skeleton className='h-8 w-full max-w-xl' />
              <Skeleton className='h-8 w-2/3 max-w-lg' />
              <div className='flex gap-4 pt-2'>
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-6 w-28' />
              </div>
              <Skeleton className='h-24 w-full max-w-xl rounded-lg' />
              <Skeleton className='h-10 w-44' />
              <div className='flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap'>
                <Skeleton className='h-11 w-full rounded-md sm:h-12 sm:min-w-[11rem]' />
                <Skeleton className='h-11 w-full rounded-md sm:h-12 sm:min-w-[10rem]' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='rounded-xl bg-white p-4 shadow-card ring-1 ring-black/5 md:p-6'>
            <Skeleton className='h-11 w-52 rounded-lg md:h-12' />
            <div className='mt-10 space-y-3'>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className='h-4 w-full' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
