export default function Footer() {
  return (
    <footer className='mt-auto border-t border-neutral-200 bg-neutral-100 py-12 md:py-16'>
      <div className='container'>
        <div className='text-center text-sm leading-relaxed text-neutral-700'>
          © {new Date().getFullYear()} UniMart. Tất cả các quyền được bảo lưu.
        </div>
        <div className='mt-10 border-t border-neutral-200 pt-8 text-center text-xs text-neutral-600 md:text-sm'>
          <div>UniMart — cửa hàng demo cho học tập</div>
          <div className='mt-6'>
            Địa chỉ, hotline và thông tin pháp nhân trong phần này chỉ là ví dụ cho giao diện; không áp dụng thực tế.
          </div>
        </div>
      </div>
    </footer>
  )
}
