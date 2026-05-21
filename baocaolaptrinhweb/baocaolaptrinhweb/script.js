document.addEventListener("DOMContentLoaded", function () {
  /* ======================================
       1. GIỎ HÀNG
    ====================================== */
  let cartCount = 0;
  const cartCountElement = document.getElementById("cart-count");

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      cartCount++;
      cartCountElement.textContent = cartCount;

      const title =
        this.closest(".product-card").querySelector(
          ".product-title",
        ).textContent;

      alert(`Đã thêm "${title}" vào giỏ hàng`);
    });
  });

  /* ======================================
       2. MODAL ĐĂNG NHẬP / ĐĂNG KÝ
    ====================================== */

  const authTrigger = document.getElementById("auth-trigger");
  const authModal = document.getElementById("auth-modal");

  const closeModal = document.getElementById("close-modal");

  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");

  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");

  // Mở popup
  authTrigger.addEventListener("click", () => authModal.classList.add("open"));

  // Đóng popup
  closeModal.addEventListener("click", () =>
    authModal.classList.remove("open"),
  );

  // Click ngoài popup tự đóng
  window.addEventListener("click", (e) => {
    if (e.target === authModal) {
      authModal.classList.remove("open");
    }
  });

  // Tab đăng nhập

  tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");

    formLogin.classList.add("active");
    formRegister.classList.remove("active");
  });

  // Tab đăng ký

  tabRegister.addEventListener("click", () => {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");

    formRegister.classList.add("active");
    formLogin.classList.remove("active");
  });

  /* ======================================
       3. TÌM KIẾM SẢN PHẨM
    ====================================== */

  const searchInput = document.getElementById("search-input");

  const searchBtn = document.getElementById("search-submit");

  const products = document.querySelectorAll(".product-card");

  function searchProducts() {
    const keyword = searchInput.value.toLowerCase().trim();

    products.forEach((product) => {
      const name = product.dataset.name.toLowerCase();

      const title = product
        .querySelector(".product-title")
        .textContent.toLowerCase();

      if (name.includes(keyword) || title.includes(keyword)) {
        product.classList.remove("hidden");
      } else {
        product.classList.add("hidden");
      }
    });
  }

  searchBtn.addEventListener("click", searchProducts);

  searchInput.addEventListener("keyup", searchProducts);

  /* ======================================
       4. LỌC THEO DANH MỤC
    ====================================== */

  const categoryBtns = document.querySelectorAll(".category-box");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.category;

      products.forEach((product) => {
        const type = product.dataset.type;

        if (type === category) {
          product.classList.remove("hidden");
        } else {
          product.classList.add("hidden");
        }
      });
    });
  });

  /* ======================================
       5. GỬI FORM
    ====================================== */

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Đăng nhập thành công");

    authModal.classList.remove("open");
  });

  formRegister.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Đăng ký thành công");

    authModal.classList.remove("open");
  });
});
