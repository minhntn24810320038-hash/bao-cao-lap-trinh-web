document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // DỮ LIỆU GIỎ HÀNG (MẢNG CHỨA SẢN PHẨM)
  // ==========================================
  let cartArray = [];

  const cartCountEl = document.getElementById("cart-count");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartTrigger = document.getElementById("cart-trigger");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotalPriceEl = document.getElementById("cart-total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  // --- Hàm cập nhật và vẽ lại giao diện Giỏ hàng ---
  function updateCartUI() {
    // 1. Tính tổng số lượng sản phẩm để hiển thị lên Navbar
    let totalQty = cartArray.reduce((total, item) => total + item.quantity, 0);
    cartCountEl.textContent = totalQty;

    // 2. Xóa danh sách cũ đi để vẽ lại
    cartItemsList.innerHTML = "";

    if (cartArray.length === 0) {
      cartItemsList.innerHTML =
        '<p class="empty-cart-msg">Giỏ hàng của bạn đang trống.</p>';
      cartTotalPriceEl.textContent = "0 đ";
      return;
    }

    // 3. Lặp qua mảng để tạo HTML cho từng sản phẩm
    let totalPrice = 0;
    cartArray.forEach((item) => {
      totalPrice += item.price * item.quantity;

      const itemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" class="cart-item-img" />
          <div class="cart-item-details">
            <p class="cart-item-title">${item.title}</p>
            <p class="cart-item-price">${(item.price * item.quantity).toLocaleString("vi-VN")} đ</p>
            <div class="cart-item-qty-box">
              <button class="qty-btn decrease-qty">-</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn increase-qty">+</button>
            </div>
          </div>
          <button class="remove-item-btn">×</button>
        </div>
      `;
      cartItemsList.insertAdjacentHTML("beforeend", itemHTML);
    });

    // Định dạng hiển thị tổng tiền VND
    cartTotalPriceEl.textContent = totalPrice.toLocaleString("vi-VN") + " đ";

    // Gán lại sự kiện cho các nút tăng/giảm/xóa vừa mới được tạo ra
    addCartEvents();
  }

  // --- Hàm gán sự kiện cho các nút TRONG giỏ hàng ---
  function addCartEvents() {
    // Nút Tăng Số Lượng (+)
    document.querySelectorAll(".increase-qty").forEach((btn) => {
      btn.onclick = (e) => {
        const id = e.target.closest(".cart-item").getAttribute("data-id");
        const product = cartArray.find((item) => item.id === id);
        if (product) product.quantity++;
        updateCartUI();
      };
    });

    // Nút Giảm Số Lượng (-)
    document.querySelectorAll(".decrease-qty").forEach((btn) => {
      btn.onclick = (e) => {
        const id = e.target.closest(".cart-item").getAttribute("data-id");
        const product = cartArray.find((item) => item.id === id);
        if (product) {
          product.quantity--;
          if (product.quantity <= 0) {
            // Nếu giảm về 0 thì xóa luôn sản phẩm khỏi giỏ hàng
            cartArray = cartArray.filter((item) => item.id !== id);
          }
        }
        updateCartUI();
      };
    });

    // Nút Xóa hẳn sản phẩm (dấu ×)
    document.querySelectorAll(".remove-item-btn").forEach((btn) => {
      btn.onclick = (e) => {
        const id = e.target.closest(".cart-item").getAttribute("data-id");
        cartArray = cartArray.filter((item) => item.id !== id);
        updateCartUI();
      };
    });
  }

  // --- Sự kiện click nút "Thêm vào giỏ" ở danh sách sản phẩm ngoài trang ---
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.onclick = () => {
      const card = btn.closest(".product-card");
      const id = card.getAttribute("data-id");
      const price = parseInt(card.getAttribute("data-price"));
      const title = card.querySelector(".product-title").textContent;
      const image = card
        .querySelector(".product-image img")
        .getAttribute("src");

      // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
      const existingProduct = cartArray.find((item) => item.id === id);

      if (existingProduct) {
        existingProduct.quantity++; // Có rồi thì cộng dồn số lượng
      } else {
        // Chưa có thì push đối tượng mới vào mảng
        cartArray.push({ id, title, price, image, quantity: 1 });
      }

      updateCartUI();

      // Tự động mở Sidebar giỏ hàng ra để khách xem luôn
      cartSidebar.classList.add("open");
    };
  });

  // --- Mở / Đóng Sidebar Giỏ Hàng ---
  cartTrigger.onclick = () => {
    cartSidebar.classList.add("open");
  };

  closeCartBtn.onclick = () => {
    cartSidebar.classList.remove("open");
  };

  // Click ra ngoài vùng trắng giỏ hàng để đóng
  cartSidebar.onclick = (e) => {
    if (e.target === cartSidebar) {
      cartSidebar.classList.remove("open");
    }
  };

  // Nút thanh toán giả lập
  checkoutBtn.onclick = () => {
    if (cartArray.length === 0) {
      alert("Giỏ hàng đang trống, không thể thanh toán!");
    } else {
      alert(
        "Cảm ơn bạn đã mua sắm tại T.M.H Menswear! Đơn hàng đang được xử lý.",
      );
      cartArray = [];
      updateCartUI();
      cartSidebar.classList.remove("open");
    }
  };

  // ==========================================
  // MODAL LOGIN / REGISTER (GIỮ NGUYÊN)
  // ==========================================
  const modal = document.getElementById("auth-modal");
  const openBtn = document.getElementById("auth-trigger");
  const closeBtn = document.getElementById("close-modal");

  const loginBtn = document.getElementById("tab-login");
  const registerBtn = document.getElementById("tab-register");
  const loginForm = document.getElementById("form-login");
  const registerForm = document.getElementById("form-register");

  function setInitialTab() {
    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  }

  openBtn.onclick = () => {
    setInitialTab();
    modal.classList.add("open");
  };

  closeBtn.onclick = () => {
    modal.classList.remove("open");
  };

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  loginBtn.onclick = () => {
    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  };

  registerBtn.onclick = () => {
    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
  };

  // Đăng ký tài khoản
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const pass = registerForm.querySelector('input[type="password"]').value;

    const user = { name, email, pass };
    localStorage.setItem("tmhUser", JSON.stringify(user));
    alert("Đăng ký thành công");
    registerForm.reset();
    loginBtn.click();
  });

  // Đăng nhập tài khoản
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const pass = loginForm.querySelector('input[type="password"]').value;
    let saved = JSON.parse(localStorage.getItem("tmhUser"));

    if (!saved) {
      alert("Chưa có tài khoản");
      return;
    }

    if (email === saved.email && pass === saved.pass) {
      alert("Xin chào " + saved.name);
      modal.classList.remove("open");
      openBtn.innerHTML = "👤 " + saved.name;
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  }); // ==========================================
  // XỬ LÝ TỰ ĐỘNG ĐỔI ẢNH NỀN BANNER (SLIDESHOW)
  // ==========================================
  const slides = document.querySelectorAll(".hero-banner .slide");
  let currentSlideIndex = 0;
  const slideIntervalTime = 4000; // Thời gian chuyển ảnh: 4000ms = 4 giây

  function nextSlide() {
    // 1. Gỡ bỏ class 'active' của ảnh hiện tại để ẩn nó đi
    slides[currentSlideIndex].classList.remove("active");

    // 2. Tăng chỉ số index lên 1, nếu vượt quá số lượng ảnh thì quay về 0
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;

    // 3. Thêm class 'active' vào ảnh tiếp theo để nó hiện lên mượt mà
    slides[currentSlideIndex].classList.add("active");
  }

  // Thiết lập bộ đếm thời gian tự động lặp lại liên tục
  setInterval(nextSlide, slideIntervalTime);
});
