Task level 3: Hiển thị sự thay đổi của đồng tiền trên line chart sử dụng chart.js một cách đơn giản (https://www.chartjs.org/docs/latest/)
- install 2 packages này: react-chartjs-2, chart.js  (https://github.com/reactchartjs/react-chartjs-2)
- Nghiên cứu cách sử dụng Linechart của chartjs
- Đầu tiền cần tạo 1 cái chart cơ bản bằng linechart với data cố định trước:
  • Biết cách set Max, min cho trục X.
  • Biết cách set label cho trục Y
  • Biết cách thay đổi data cho chart bằng state
- Sau đó ghép data từ trades vào:
  • Trục X là price. Max X là Math.max(trades) * 1.001, Min X là  Math.max(trades) * 0.999
  • Trục Y là datetime của giao dịch: dưới dạng "hh:mm:ss"
  • Chỉ Update data cho chart sau mỗi 2s. (Không update liên tục, vì sẽ bị trùng Y label) (Bạn phải sử dụng setInterval và clearInterval sao cho hợp lý)

- Một số gợi ý:
  • Bạn truyền trades vào prop cho component Chart. Rồi xử lý array trade trong component Chart
  • setInterval trong useEffect, rồi lưu intervalId vào trong state. Rồi clearInterval sử dụng intervalId đó
  • Có 1 array khác để lưu  data sẽ đc hiển thị trên chart. Mỗi 2s push giá trị gần nhất từ trades props vào array này.
