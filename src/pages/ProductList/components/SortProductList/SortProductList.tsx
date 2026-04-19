import classNames from 'classnames'
import { sortBy, order as orderConstant } from 'src/constants/product'
import { ProductListConfig } from 'src/types/product.type'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import path from 'src/constants/path'
import omit from 'lodash/omit'
interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  const btn = (active: boolean) =>
    classNames(
      'h-8 shrink-0 rounded-md px-3 text-center text-xs capitalize transition-colors sm:h-9 sm:text-sm md:min-w-[5.5rem] md:px-4',
      {
        'bg-orange text-white hover:bg-orange/80': active,
        'bg-neutral-50 text-neutral-800 hover:bg-neutral-100 lg:bg-white': !active
      }
    )

  return (
    <div className='rounded-none bg-white shadow-sm ring-1 ring-black/[0.04] lg:rounded-lg lg:bg-white/90 lg:shadow-card lg:backdrop-blur-sm lg:ring-black/5'>
      <div className='flex flex-wrap items-center justify-between gap-y-3 py-2.5 px-2 lg:flex-nowrap lg:justify-between lg:gap-3 lg:py-4 lg:px-3'>
        <div className='flex max-w-full flex-1 items-center gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden'>
          <span className='hidden shrink-0 text-sm text-neutral-600 lg:inline'>Sắp xếp theo</span>
          <button
            className={btn(isActiveSortBy(sortBy.view))}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button className={btn(isActiveSortBy(sortBy.createdAt))} onClick={() => handleSort(sortBy.createdAt)}>
            Mới nhất
          </button>
          <button className={btn(isActiveSortBy(sortBy.sold))} onClick={() => handleSort(sortBy.sold)}>
            Bán chạy
          </button>
          <select
            className={classNames(
              'h-8 min-w-[7.25rem] shrink-0 rounded-md px-2 text-left text-xs capitalize outline-none sm:min-w-[10rem] sm:text-sm md:h-9 md:px-4',
              {
                'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
                'bg-neutral-50 text-neutral-800 lg:bg-white': !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              Giá
            </option>
            <option value={orderConstant.asc} className='bg-white text-black'>
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className='bg-white text-black'>
              Giá: Cao đến thấp
            </option>
          </select>
        </div>

        <div className='flex w-full shrink-0 items-center justify-end gap-2 border-t border-neutral-100 pt-2.5 sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0 lg:pt-0'>
          <div className='text-sm'>
            <span className='text-orange'>{page}</span>
            <span className='text-neutral-600'>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm rounded-bl-sm bg-white/60  shadow hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 w-9  items-center justify-center rounded-tl-sm rounded-bl-sm bg-white  shadow hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
