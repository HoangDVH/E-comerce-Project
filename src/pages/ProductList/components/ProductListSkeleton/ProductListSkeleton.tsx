import Skeleton from 'src/components/Skeleton'
import classNames from 'classnames'

function ProductCardSkeleton() {
  return (
    <div className='overflow-hidden rounded-md bg-white shadow-card ring-1 ring-black/[0.06] sm:rounded-lg'>
      <div className='relative w-full pt-[100%]'>
        <Skeleton className='absolute inset-0 rounded-none' />
      </div>
      <div className='space-y-2 p-1.5 sm:p-2'>
        <Skeleton className='h-3 w-full' />
        <Skeleton className='h-3 w-4/5' />
        <div className='mt-3 flex gap-2'>
          <Skeleton className='h-4 w-14' />
          <Skeleton className='h-4 w-16' />
        </div>
        <div className='mt-3 flex justify-end gap-2'>
          <Skeleton className='h-4 w-20' />
        </div>
      </div>
    </div>
  )
}

function CategoryStripSkeleton({ className }: { className?: string }) {
  return (
    <div className={classNames('border-b border-neutral-100 bg-white', className)}>
      <div className='container'>
        <div className='-mx-4 flex gap-2 overflow-hidden px-4 py-3'>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className='h-8 w-20 shrink-0 rounded-full sm:w-24' />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProductListSkeleton() {
  const placeholders = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className='grid grid-cols-12 items-start gap-4 lg:gap-6' aria-busy='true' aria-label='Đang tải'>
      <aside className='hidden lg:col-span-3 lg:block'>
        <div className='rounded-xl border border-neutral-100 bg-white p-4 shadow-card lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none'>
          <div className='space-y-3 py-4'>
            <Skeleton className='h-5 w-3/4' />
            <div className='my-3 h-px bg-neutral-200' />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className='h-4 w-full max-w-[12rem]' />
            ))}
            <div className='my-3 h-px bg-neutral-200' />
            <Skeleton className='h-4 w-28' />
            <div className='flex gap-2'>
              <Skeleton className='h-9 flex-1' />
              <Skeleton className='h-9 w-6 shrink-0' />
              <Skeleton className='h-9 flex-1' />
            </div>
            <Skeleton className='h-9 w-full' />
          </div>
        </div>
      </aside>

      <div className='col-span-12 min-w-0 lg:col-span-9'>
        <Skeleton className='mb-3 flex h-11 w-full rounded-lg lg:hidden' />
        <Skeleton className='mb-2 h-[3.25rem] w-full rounded-none sm:h-14 lg:rounded-lg' />
        <div className='mt-2 grid grid-cols-2 gap-1 sm:gap-2 md:grid-cols-3 lg:mt-4 lg:grid-cols-4 xl:grid-cols-5'>
          {placeholders.map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
        <div className='mt-6 flex justify-center gap-2'>
          <Skeleton className='h-9 w-9 rounded' />
          <Skeleton className='h-9 w-9 rounded' />
          <Skeleton className='h-9 w-9 rounded' />
        </div>
      </div>
    </div>
  )
}

export { CategoryStripSkeleton, ProductCardSkeleton }
