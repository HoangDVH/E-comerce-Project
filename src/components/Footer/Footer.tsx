export default function Footer() {
  return (
    <footer className='mt-auto border-t border-neutral-200 bg-neutral-100 py-12 md:py-16'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div className='text-sm leading-relaxed text-neutral-700'>
              © {new Date().getFullYear()} Shopee Clone. Tất cả các quyền được bảo lưu.
            </div>
          </div>
          <div className='lg:col-span-2'>
            <div className='text-sm leading-relaxed text-neutral-600'>
              Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
              Colombia Chile Poland
            </div>
          </div>
        </div>
        <div className='mt-10 border-t border-neutral-200 pt-8 text-center text-xs text-neutral-600 md:text-sm'>
          <div>Công ty TNHH Shopee</div>
          <div className='mt-6'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}
