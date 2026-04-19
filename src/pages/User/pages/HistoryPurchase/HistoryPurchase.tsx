import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames(
        'flex min-w-[6.5rem] shrink-0 flex-1 items-center justify-center whitespace-nowrap border-b-2 bg-white px-3 py-3 text-center text-sm sm:min-w-0 sm:px-4 sm:py-4 sm:text-base',
        {
          'border-b-orange font-medium text-orange': status === tab.status,
          'border-b-transparent text-neutral-700 hover:text-orange': status !== tab.status
        }
      )}
    >
      {tab.name}
    </Link>
  ))

  return (
    <div className='overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-card'>
      <div className='sticky top-0 z-[1] -mx-px flex overflow-x-auto border-b border-neutral-100 bg-white shadow-sm [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 [&::-webkit-scrollbar]:hidden'>
        {purchaseTabsLink}
      </div>
      <div className='p-3 sm:p-4 md:p-6'>
        {purchasesInCart?.map((purchase) => (
          <div
            key={purchase._id}
            className='mt-3 rounded-lg border border-neutral-100 bg-neutral-50/80 p-4 text-gray-800 first:mt-0 sm:p-5'
          >
            <Link
              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
              className='flex flex-col gap-3 sm:flex-row sm:items-start'
            >
              <div className='flex shrink-0 gap-3 sm:gap-4'>
                <img
                  className='h-20 w-20 rounded-md object-cover sm:h-24 sm:w-24'
                  src={purchase.product.image}
                  alt={purchase.product.name}
                />
                <div className='min-w-0 flex-1 sm:hidden'>
                  <div className='line-clamp-2 font-medium'>{purchase.product.name}</div>
                  <div className='mt-2 text-sm text-neutral-500'>x{purchase.buy_count}</div>
                </div>
              </div>
              <div className='hidden min-w-0 flex-1 overflow-hidden sm:block'>
                <div className='truncate font-medium'>{purchase.product.name}</div>
                <div className='mt-3 text-sm text-neutral-500'>x{purchase.buy_count}</div>
              </div>
              <div className='flex shrink-0 flex-col items-start gap-1 text-right sm:ml-auto sm:items-end'>
                <span className='text-sm text-neutral-400 line-through'>
                  ₫{formatCurrency(purchase.product.price_before_discount)}
                </span>
                <span className='text-lg font-medium text-orange'>₫{formatCurrency(purchase.product.price)}</span>
              </div>
            </Link>
            <div className='mt-4 flex flex-col border-t border-neutral-200 pt-4 sm:flex-row sm:items-center sm:justify-end'>
              <div className='text-sm text-neutral-600 sm:mr-4'>Tổng giá tiền</div>
              <div className='text-xl font-semibold text-orange'>
                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
