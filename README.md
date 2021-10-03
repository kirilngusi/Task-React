

Tạo 1 react app mô phỏng login, register.

Bạn clone API server này: https://github.com/auth0-blog/nodejs-jwt-authentication-sample
- Chạy node server.js
- Server này bao gồm các API như trong README.md. Yêu cầu bạn đọc docs để hiểu API

App bao gồm các trang sau:
- Trang Login tại path  /login: Bao gồm 1 form nhập username, password, submit
- Trang Register tại path /register: Bao gồm 1 form nhập username, password, confirm password, submit. Bonus: firstname, lastname, address, ... tùy bạn (Bạn lưu thông tin bonus ở field extra trong api)
- Trang Home (protected)tại path / : Nếu user chưa login, sẽ redirect về /login. Trang này hiển thị thông tin từ API api/protected/random-quote. 
- Trang Profile (protected) tại path /profile: Nếu user chưa login, sẽ redirect về /login. Trang này hiển thị thông tin người dùng, hoặc hiển thị cái gì bạn thích lúc register (trong api có trường extra) Có nút logout, sẽ xóa user trong redux và token trong localStorage, sau đó redirect về /login

Yêu cầu: 
- Sử dụng react-router. Biết cách tạo ProtectedRoute Component.
- Sử dụng axios gọi APIs.
- Các component có trạng thái Loading khi gọi API
- Biết sử dụng Authorization header để tạo request tới protected API route
- Sử dụng redux (thunk hay saga tùy bạn) để lưu thông tin user.
- Sử dụng localStorage để lưu access_token và id_token

Yêu cầu bonus (advanced tasks):
- Set up project sử dụng sass + bootstrap/ materialUI/ antD tùy bạn
- Set up project sử dụng i18n một cách đơn giản. Sử dụng cho các label của app. Các label có thể chuyển qua các ngôn ngữ khác nhau. Có 1 dropdown để chuyển ngôn ngữ ở Navbar
- Host project + API trên Github, heroku hoặc AWS
