document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. TỰ ĐỘNG ĐỔI ẢNH NỀN HERO BANNER (SLIDESHOW)
  // ==========================================
  const slides = document.querySelectorAll(".hero .slide");
  let currentSlideIndex = 0;
  const slideIntervalTime = 4000;

  function nextSlide() {
    slides[currentSlideIndex].classList.remove("active");
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add("active");
  }

  if (slides.length > 0) {
    setInterval(nextSlide, slideIntervalTime);
  }

  // ==========================================
  // 2. LOGIC ĐIỀU KHIỂN SIDEBAR GIỎ HÀNG
  // ==========================================
  let cartArray = [];

  const cartCountEl = document.getElementById("cart-count");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartTrigger = document.getElementById("cart-trigger");
  const closeCartBtn = document.getElementById("close-cart");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotalPriceEl = document.getElementById("cart-total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  function updateCartUI() {
    let totalQty = cartArray.reduce((total, item) => total + item.quantity, 0);
    cartCountEl.textContent = totalQty;
    cartItemsList.innerHTML = "";

    if (cartArray.length === 0) {
      cartItemsList.innerHTML =
        '<p class="empty-cart-msg">Giỏ hàng của bạn đang trống.</p>';
      cartTotalPriceEl.textContent = "0 đ";
      return;
    }

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

    cartTotalPriceEl.textContent = totalPrice.toLocaleString("vi-VN") + " đ";
    bindCartEvents();
  }

  function bindCartEvents() {
    document.querySelectorAll(".increase-qty").forEach((btn) => {
      btn.onclick = (e) => {
        const id = e.target.closest(".cart-item").getAttribute("data-id");
        const product = cartArray.find((item) => item.id === id);
        if (product) product.quantity++;
        updateCartUI();
      };
    });

    document.querySelectorAll(".decrease-qty").forEach((btn) => {
      btn.onclick = (e) => {
        const id = e.target.closest(".cart-item").getAttribute("data-id");
        const product = cartArray.find((item) => item.id === id);
        if (product) {
          product.quantity--;
          if (product.quantity <= 0) {
            cartArray = cartArray.filter((item) => item.id !== id);
          }
        }
        updateCartUI();
      };
    });

    document.querySelectorAll(".remove-item-btn").forEach((btn) => {
      btn.onclick = (e) => {
        const id = e.target.closest(".cart-item").getAttribute("data-id");
        cartArray = cartArray.filter((item) => item.id !== id);
        updateCartUI();
      };
    });
  }

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.onclick = () => {
      const card = btn.closest(".product-card");
      const id = card.getAttribute("data-id");
      const price = parseInt(card.getAttribute("data-price"));
      const title = card.querySelector(".product-title").textContent;
      const image = card
        .querySelector(".product-image img")
        .getAttribute("src");

      const existingProduct = cartArray.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cartArray.push({ id, title, price, image, quantity: 1 });
      }

      updateCartUI();
      cartSidebar.classList.add("open");
    };
  });

  if (cartTrigger) {
    cartTrigger.onclick = () => {
      cartSidebar.classList.add("open");
    };
  }
  if (closeCartBtn) {
    closeCartBtn.onclick = () => {
      cartSidebar.classList.remove("open");
    };
  }
  if (cartSidebar) {
    cartSidebar.onclick = (e) => {
      if (e.target === cartSidebar) cartSidebar.classList.remove("open");
    };
  }

  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (cartArray.length === 0) {
        alert("Giỏ hàng đang trống!");
      } else {
        alert("Đơn hàng sơ mi của bạn đang được hệ thống xử lý!");
        cartArray = [];
        updateCartUI();
        cartSidebar.classList.remove("open");
      }
    };
  }
});
