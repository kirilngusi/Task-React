Xây dựng ứng dụng theo dõi tỷ giá các đồng coin theo thời gian thực sử dụng Websocket, Chart.js

Task level 1: Xây dựng 1 bảng, hiển thị các giao dịch theo thời gian thực
- Tự nghiên cứu cách kết nối tới một Websocket server
- Đọc document và sử dụng Websocket API này để subscribe các giao dịch (trades) mới từ channel Trade Streams, theo dõi tỷ giá của đồng BTCUSDT: https://binance-docs.github.io/apidocs/spot/en/#trade-streams
- Liên tục hiển thị tối đa 20 trades gần nhất trên 1 bảng. Nếu quá 20 trades bạn phải xóa các trades cũ và hiển thị trades mới
- Hiển thị các thông tin bao gồm: Trade ID, Price, Quantity, -Buyer ID, Seller ID, Trade time
- Lưu ý:
  • Bài tập này kiểm tra kỹ năng xử lý state và tối ưu sử dụng state của bạn. Đồng thời bổ sung cho bạn kiến thức về Websocket API.
  • Chỉ cần sử dụng thư viện đáp ứng yêu cầu bài tập này (K cần sử dụng redux, router, ...)
  • Nhớ unsubscribe websocket event khi component unmount để tránh request về khi không cần thiết
