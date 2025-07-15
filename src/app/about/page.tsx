export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center sm:text-left">
        Về chúng tôi
      </h1>

      <section className="space-y-10 text-base sm:text-lg leading-relaxed text-justify">
        {/* Giới thiệu */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Chào mừng bạn đến với
            <span className="text-red-600"> Gia Dụng Nhanh</span>
          </h2>
          <p>
            <span className="text-red-600">Gia Dụng Nhanh</span> là Tổng kho sỉ,
            lẻ đồ gia dụng, đồ gia dụng thông minh hàng đầu TP. Hồ Chí Minh. Nơi
            đây chuyên cung cấp các mặt hàng đa dạng mẫu mã, chất lượng sản phẩm
            tốt và giá thành phải chăng, hợp lý.
          </p>
          <p>
            Với phương châm kinh doanh: “Sẻ chia gánh nặng việc nhà”, Tổng kho
            Gia Dụng Nhanh mong muốn mang đến những giải pháp thiết thực bằng
            những sản phẩm thông minh, tiện ích nhằm giảm thiểu gánh nặng lo
            toan nhà cửa và tiết kiệm thời gian quý báu cho các chị em nội trợ.
          </p>
        </div>

        {/* Chính sách sỉ */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Các chính sách sỉ vô cùng ưu đãi, giá tốt
          </h2>
          <p>
            Bên cạnh ưu thế về hơn 1000 mặt hàng đồ gia dụng bán chạy, Tổng kho
            sỉ miền Nam <span className="text-red-600">Gia Dụng Nhanh</span> còn
            có các chính sách sỉ vô cùng ưu đãi như: sỉ lẻ tách thùng đơn từ 1
            triệu đồng và sỉ thùng tính theo kiện hàng cho bạn dễ dàng lựa chọn.
          </p>
          <p>
            Trường hợp khách mua sỉ lẻ tách thùng đơn từ 3.000.000 đồng sẽ được
            tặng gói freeship 7km, và 10.000.000 đồng đối với sỉ thùng. Nếu
            khách nhận hàng tại kho sẽ được khấu trừ khoản freeship vào đơn
            hàng. Ngược lại, với những đơn ở xa, bạn chỉ cần trả phần chênh lệch
            giữa tổng chi phí và gói freeship 7km.
          </p>
        </div>

        {/* Trải nghiệm khách hàng */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Trải nghiệm hài lòng của bạn là niềm vinh hạnh của chúng tôi
          </h2>
          <p>
            Lấy “khách hàng làm thượng đế”, Kho gia dụng giá sỉ Gia Dụng Nhanh
            luôn mong muốn mang đến trải nghiệm nhập hàng tuyệt vời. Ngoài đào
            tạo nghiệp vụ bán hàng, chúng tôi còn chú trọng đến thái độ phục vụ
            khách hàng. Các khâu đóng đơn, chốt đơn và giao hàng đều được thực
            hiện nhanh chóng, đúng quy trình.
          </p>
          <p>
            Nếu có bất kỳ thắc mắc nào, bạn vui lòng liên hệ với chúng tôi qua
            Hotline:{" "}
            <a
              href="tel:0912241237"
              className="font-semibold text-red-600 underline hover:text-red-700"
            >
              0912.241.237
            </a>{" "}
            để được tư vấn và hỗ trợ nhiệt tình nhất nhé!
          </p>
        </div>
      </section>
    </div>
  );
}
