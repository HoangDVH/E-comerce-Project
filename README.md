# UniMart

Ứng dụng thương mại điện tử phía client, xây bằng **React 18 + TypeScript + Vite**. Dữ liệu lấy từ **REST API** công khai; giao diện có **i18n** (Việt / Anh), lọc & sắp xếp sản phẩm, giỏ hàng và khu vực tài khoản người dùng.

---

## Yêu cầu môi trường

- **Node.js** 18+ (khuyến nghị LTS)
- **npm** (hoặc `pnpm` / `yarn` tương đương)

---

## Cài đặt và chạy

```bash
# Cài dependency
npm install

# Chạy dev (mặc định port 3000 — xem vite.config.ts)
npm run dev

# Build production
npm run build

# Xem preview bản build
npm run preview
```

Trình duyệt mở: `http://localhost:3000` (theo `server.port` trong `vite.config.ts`).

---

## Scripts có sẵn

| Script | Mô tả |
|--------|--------|
| `npm run dev` | Vite dev server |
| `npm run build` | Build tối ưu production vào `dist/` |
| `npm run preview` | Phục vụ thư mục `dist/` để kiểm tra build |
| `npm run lint` | ESLint 9 (flat config) trên `src/` |
| `npm run lint:fix` | ESLint --fix |
| `npm run prettier` | Kiểm tra định dạng Prettier |
| `npm run prettier:fix` | Ghi đè định dạng |
| `npm run test` | Vitest (watch) |
| `npm run coverage` | Vitest + báo cáo coverage |

---

## Cấu trúc thư mục `src/` (chính)

```
src/
├── apis/              # Gọi HTTP (axios): auth, category, product, purchase, user
├── assets/
├── components/        # Component dùng chung (Button, Header, Pagination, Popover, …)
├── constants/         # path routes, config, enum HTTP, purchase status, …
├── contexts/          # AppContext — auth, profile, extendedPurchases (giỏ)
├── hooks/             # useQueryConfig, useSearchProducts, …
├── i18n/              # Khởi tạo i18next + import JSON locale
├── layouts/           # MainLayout, RegisterLayout, CartLayout
├── locales/
│   ├── en/            # home.json, product.json
│   └── vi/
├── msw/               # Handler MSW — chỉ dùng trong Vitest (vitest.setup.js)
├── pages/
│   ├── Cart/
│   ├── Login/, Register/
│   ├── ProductList/   # Danh mục, AsideFilter, SortProductList, …
│   ├── ProductDetail/
│   ├── User/           # Profile, ChangePassword, HistoryPurchase + UserLayout
│   └── NotFound/
├── types/
├── utils/              # auth (JWT/localStorage), rules (yup), format, …
├── App.tsx             # Toast, HelmetProvider, ErrorBoundary, ReactQueryDevtools
├── main.tsx            # QueryClient, BrowserRouter, AppProvider
└── useRouteElements.tsx # Định nghĩa route (lazy + Suspense)
```

**Alias import:** `src/...` được map trong `vite.config.ts` (`resolve.alias`).

---

## Định tuyến (khớp `src/constants/path.ts` và `useRouteElements.tsx`)

| Đường dẫn | Mô tả | Ghi chú |
|-----------|--------|---------|
| `/` | Trang chủ — danh sách sản phẩm (`ProductList`) | `MainLayout` |
| `/:nameId` | Chi tiết sản phẩm (`ProductDetail`) | Tham số động |
| `/login` | Đăng nhập | Chỉ guest — `RejectedRoute` |
| `/register` | Đăng ký | Chỉ guest |
| `/cart` | Giỏ hàng | Cần đăng nhập — `ProtectedRoute` |
| `/user/profile` | Hồ sơ | `ProtectedRoute` + `UserLayout` |
| `/user/password` | Đổi mật khẩu | |
| `/user/purchase` | Lịch sử mua hàng | |
| `*` | 404 (`NotFound`) | |

- **`ProtectedRoute`:** có token → render `<Outlet />`; không → chuyển `/login`.
- **`RejectedRoute`:** đã đăng nhập thì từ `/login` / `/register` chuyển về `/`.

Các trang chính được **`lazy()`** và bọc **`Suspense`** để tách chunk.

---

## API backend

- URL gốc được khai báo tại **`src/constants/config.ts`**:

  `baseUrl: 'https://api-ecom.duthanhduoc.com/'`

- Đổi API (self-hosted / mock) bằng cách sửa `baseUrl` trong file đó và build lại.

---

## Đa ngôn ngữ (i18n)

- Thư viện: **i18next** + **react-i18next** (`src/i18n/i18n.ts`).
- Namespace: **`home`**, **`product`**.
- File JSON: `src/locales/vi/*.json`, `src/locales/en/*.json`.
- Mặc định ngôn ngữ: **`vi`**, fallback: **`vi`**.

---

## State & dữ liệu

- **TanStack Query (React Query v5):** fetch sản phẩm, danh mục, giỏ, user, v.v. (`QueryClient` trong `main.tsx`, `refetchOnWindowFocus: false`, `retry: 0`).
- **React Hook Form + Yup:** form đăng nhập, đăng ký, profile, giá lọc, …
- **AppContext:** trạng thái đăng nhập, profile, mở rộng line items giỏ; token/profile lấy từ localStorage (`src/utils/auth.ts`).

---

## UI / style

- **Tailwind CSS** (`tailwind.config`, `postcss.config`, `src/index.css`).
- Một số animation / trợ năng: **Framer Motion**, **@floating-ui/react**.
- Meta từng trang: **react-helmet-async** (`Helmet` trong các page).

---

## Kiểm thử

- **Vitest** + **jsdom**, cấu hình trong `vite.config.ts` (`test.environment`, `vitest.setup.js`).
- **MSW** (`src/msw/*.msw.ts`) chỉ được bật trong **`vitest.setup.js`** (`setupServer`) — **không** chạy trong dev/prod của app.

```bash
npm run test
npm run coverage
```

---

## Demo (tùy deploy)

Ứng dụng có thể deploy tĩnh sau `npm run build` (thư mục `dist/`). Liên kết demo công khai phụ thuộc nơi bạn host (ví dụ Vercel / Netlify); cập nhật URL vào README khi có.

---

## Ghi chú phát triển

- **ESLint:** cấu hình flat `eslint.config.js` (ESLint 9). Không dùng `eslint --ext` trong script — chỉ cần `eslint src/`.
- **Prettier** có plugin Tailwind sắp xếp class (xem `package.json`).

---

## Tóm tắt stack (từ `package.json`)

React 18, TypeScript, Vite 5, React Router 6, TanStack Query 5, Axios, React Hook Form, Yup, i18next, Tailwind CSS, Vitest, MSW (test), React Toastify, lodash, immer, dompurify, html-to-text (xem đầy đủ trong `package.json`).

---

## License / nguồn

Dự án học tập / portfolio; fork từ bài toán clone Shopee — điều chỉnh mô tả và link repo nếu bạn fork riêng.
