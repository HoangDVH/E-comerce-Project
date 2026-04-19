import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import CategoryStrip from './components/CategoryStrip/CategoryStrip'
import Product from './components/Product/Product'
import ProductListSkeleton, { CategoryStripSkeleton } from './components/ProductListSkeleton'
import SortProductList from './components/SortProductList'

export default function ProductList() {
  const location = useLocation()
  const [filterOpen, setFilterOpen] = useState(false)
  const queryConfig = useQueryConfig()

  useEffect(() => {
    setFilterOpen(false)
  }, [location.search])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.search])

  useEffect(() => {
    if (!filterOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [filterOpen])

  const { data: productsData, isPending: isProductsPending } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData, isPending: isCategoriesPending } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  const categories = categoriesData?.data.data || []
  const isListLoading = isProductsPending || isCategoriesPending

  return (
    <div className='bg-[#fafafa] pb-4 pt-0 lg:bg-neutral-100 lg:py-6'>
      <Helmet>
        <title>Trang chủ | UniMart</title>
        <meta name='description' content='Trang chủ UniMart — cửa hàng điện tử demo' />
      </Helmet>

      {isListLoading && <CategoryStripSkeleton className='lg:hidden' />}

      {!isListLoading && productsData && categories.length > 0 && (
        <CategoryStrip categories={categories} queryConfig={queryConfig} className='lg:hidden' />
      )}

      <div className='container pt-3 lg:pt-0'>
        {isListLoading && <ProductListSkeleton />}

        {!isListLoading && productsData && (
          <>
            <div className='grid grid-cols-12 items-start gap-4 lg:gap-6'>
              <aside className='hidden lg:col-span-3 lg:block'>
                <AsideFilter queryConfig={queryConfig} categories={categories} />
              </aside>

              <div className='col-span-12 min-w-0 lg:col-span-9'>
                <button
                  type='button'
                  className='mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2.5 text-sm font-medium text-neutral-800 shadow-sm lg:hidden'
                  onClick={() => setFilterOpen(true)}
                >
                  <svg className='h-5 w-5 text-orange' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M7 12h10M10 18h4' />
                  </svg>
                  Bộ lọc tìm kiếm
                </button>

                <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />

                {productsData.data.data.products.length === 0 ? (
                  <div className='mt-4 rounded-xl border border-neutral-100 bg-white py-16 text-center shadow-card'>
                    <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100 text-neutral-400'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='h-12 w-12'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                        />
                      </svg>
                    </div>
                    <p className='text-base font-medium text-neutral-800'>Không có sản phẩm</p>
                    <p className='mt-2 px-6 text-sm text-neutral-500'>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
                  </div>
                ) : (
                  <>
                    <div className='mt-2 grid grid-cols-2 gap-1 sm:gap-2 md:grid-cols-3 lg:mt-4 lg:grid-cols-4 xl:grid-cols-5'>
                      {productsData.data.data.products.map((product) => (
                        <div className='col-span-1' key={product._id}>
                          <Product product={product} />
                        </div>
                      ))}
                    </div>

                    <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
                  </>
                )}
              </div>
            </div>

            {/* Bottom sheet — bộ lọc kiểu Shopee mobile */}
            {filterOpen && (
              <>
                <div
                  role='presentation'
                  className='fixed inset-0 z-[100] bg-black/45 lg:hidden'
                  onClick={() => setFilterOpen(false)}
                />
                <div className='fixed inset-x-0 bottom-0 z-[101] flex max-h-[90vh] flex-col rounded-t-2xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,.12)] lg:hidden'>
                  <div className='flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-3'>
                    <span className='text-base font-semibold text-neutral-900'>Bộ lọc</span>
                    <button
                      type='button'
                      className='rounded-full p-2 text-neutral-500 hover:bg-neutral-100'
                      onClick={() => setFilterOpen(false)}
                      aria-label='Đóng'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='h-6 w-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </button>
                  </div>
                  <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2'>
                    <AsideFilter queryConfig={queryConfig} categories={categories} />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
