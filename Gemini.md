# MONSHOES Website Documentation

## Giới thiệu
MONSHOES là một ứng dụng cửa hàng giày thể thao được xây dựng với Next.js 15 và Tailwind CSS. Dự án dùng bộ dữ liệu sản phẩm tĩnh để hiển thị danh sách, tìm kiếm, trang chi tiết sản phẩm, giỏ hàng và thanh toán mẫu.

## Công nghệ chính
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Sonner (toast notifications)
- Lucide React (icons)
- Framer Motion (animations)
- Radix UI components
- next-themes (dark mode)
- react-hook-form, zod (form validation)

## Cấu trúc chính
- `app/layout.tsx` - root layout toàn cục, bọc toàn bộ app bằng `ThemeProvider`, `AuthProvider`, `CartProvider`
- `app/page.tsx` - trang chủ với banner, sản phẩm nổi bật, lợi ích và footer
- `app/products/page.tsx` - route `/products`, hiển thị trang danh sách sản phẩm
- `app/products/[id]/page.tsx` - route chi tiết sản phẩm theo id
- `app/search/page.tsx` - trang tìm kiếm sản phẩm theo query `q`
- `app/contact/page.tsx` - trang liên hệ với form và thông tin
- `components/` - chứa các thành phần UI tái sử dụng và modal
- `contexts/` - quản lý state toàn cục (auth, cart)
- `data/products.ts` - dữ liệu sản phẩm mẫu

## Design Patterns & Architecture
### Provider Pattern
- `AuthProvider` và `CartProvider` cung cấp state toàn cục
- Sử dụng `useAuth` và `useCart` hooks để truy cập state
- localStorage persistence cho auth và cart data

### useReducer Pattern
- Cart state sử dụng useReducer cho complex state management
- Actions: ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART
- Size-based cart items với validation

### Component Composition
- Reusable UI components với Radix UI primitives
- Custom hooks cho logic phức tạp
- Skeleton loading states cho better UX

## UI/UX Improvements
### Dark Mode Support
- Theme toggle button trong navbar
- System theme detection
- Smooth theme transitions

### Responsive Design
- Mobile-first approach
- Drawer navigation cho mobile menu
- Sheet component cho mobile filters
- Adaptive grid layouts

### Animations & Interactions
- Framer Motion cho smooth animations
- Hover effects và micro-interactions
- Loading states với skeleton components
- Scroll-to-top button

### Form Enhancements
- Proper form validation với react-hook-form
- Loading states cho form submission
- Toast notifications cho user feedback
- Accessible form controls

### Mobile Experience
- Touch-friendly buttons và controls
- Swipe gestures (future enhancement)
- Optimized mobile layouts
- Fast loading với proper image optimization

## Trang và tính năng
### Trang chủ
- `app/page.tsx` sử dụng `Navbar`, `Hero`, `FeaturedProducts`, `Benefits`, `Footer`
- 3D shoe model với Three.js integration
- Featured products grid với animations
- Benefits section với interactive icons

### Trang danh sách sản phẩm
- `app/products/allproducts.tsx`
- Responsive sidebar filters (desktop) / sheet filters (mobile)
- Price, brand, size filters với checkboxes
- Sort options và pagination
- Grid layout với hover effects

### Trang chi tiết sản phẩm
- `app/products/[id]/ProductDetails.tsx`
- Image gallery với thumbnail navigation
- Size và quantity selectors
- Add to cart với validation
- Product benefits và shipping info

### Trang liên hệ
- `app/contact/page.tsx`
- Contact form với validation
- FAQ section với expandable details
- Support information cards
- Responsive layout

### Authentication System
- Login/Register modal với form validation
- Persistent auth state với localStorage
- Protected routes (future enhancement)
- User menu với logout functionality

## Performance Optimizations
- Image optimization với Next.js Image component
- Code splitting và lazy loading
- Bundle analysis và optimization
- Caching strategies

## Accessibility
- Semantic HTML structure
- ARIA labels và roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Future Enhancements
- [ ] Search autocomplete với debouncing
- [ ] Product reviews và ratings system
- [ ] Wishlist functionality
- [ ] Order history và tracking
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] PWA capabilities
- [ ] Multi-language support
### CartContext
- `contexts/cart-context.tsx`
- `addToCart(productId, size)`
- `removeFromCart(productId)`
- `updateQuantity(productId, quantity)`
- `clearCart()`
- `getCartTotal()` và `getCartItems()`
- Tính tổng tiền dựa trên giá chuỗi trong `data/products.ts`

### CheckoutModal
- `components/checkout-modal.tsx`
- Hiển thị giỏ hàng hiện có và tổng tiền
- Tạo form thông tin giao hàng mẫu
- Nút thanh toán rõ ràng nhưng chỉ hiển thị toast thành công và xóa giỏ hàng
- Có xác nhận xóa sản phẩm nhỏ

## Xác thực mẫu
### AuthModal
- `components/auth-modal.tsx`
- UI đăng nhập/đăng ký với tab
- Có form email, mật khẩu, tên người dùng
- Hiển thị thông báo đăng ký thành công
- Không có backend xác thực thực thụ

## Component và layout chính
- `components/navbar.tsx` - thanh điều hướng chính, có tìm kiếm, nút giỏ hàng và đăng nhập
- `components/navbar_login.tsx` - phiên bản navbar cho trang login/search (sử dụng trong một số route)
- `components/footer.tsx` - footer chung
- `components/hero.tsx` - banner landing page
- `components/featured-products.tsx` - hiển thị sản phẩm nổi bật
- `components/benefits.tsx` - hiển thị lợi ích cửa hàng

## Dữ liệu sản phẩm
- `data/products.ts` lưu dữ liệu tĩnh dạng array
- Mỗi sản phẩm có: `id`, `name`, `price`, `originalPrice`, `rating`, `reviews`, `image`, `gallery`, `discount`, `new`, `stock`, `description`, `features`
- Hình ảnh sản phẩm tham chiếu từ `data/product-images.ts`

## Chạy dự án
1. Cài đặt dependencies: `pnpm install`
2. Chạy dev server: `pnpm dev`
3. Truy cập: `http://localhost:3000`

## Ghi chú quan trọng
- Ứng dụng hiện hoạt động với dữ liệu tĩnh, không có API backend thực tế
- Đăng nhập/đăng ký đã được nâng cấp thành phiên client-side sử dụng `AuthProvider` và lưu session vào `localStorage`
- Giỏ hàng đã hỗ trợ lưu trạng thái qua `localStorage` bằng `CartProvider` và `cart-context`
- Thanh toán vẫn xử lý mẫu bằng toast và xóa giỏ hàng, chưa thực hiện thanh toán thật
- Bộ lọc kích thước hiện đã hoạt động với dữ liệu `sizes` cho mỗi sản phẩm
- Mobile menu hiện có Drawer để điều hướng trên thiết bị nhỏ

## Thiết kế và pattern
- Sử dụng pattern Provider + Hook với `AuthProvider`/`useAuth` và `CartProvider`/`useCart`
- Cấu trúc quản lý trạng thái tách biệt bằng context, giúp mở rộng dễ dàng và tái sử dụng
- Lưu trữ client-side dùng abstraction `lib/storage.ts` để quản lý `localStorage`
- UI responsive sử dụng Drawer cho menu mobile và menu trạng thái người dùng

## Hướng phát triển tiếp
- Thêm API backend / database cho sản phẩm và đơn hàng
- Hoàn thiện xác thực người dùng server-side hoặc OAuth
- Kết nối giỏ hàng với backend để đồng bộ nhiều thiết bị
- Thêm filter size theo dữ liệu tồn kho thực tế
- Cải thiện điều hướng mobile và menu sidebar tối ưu UX
