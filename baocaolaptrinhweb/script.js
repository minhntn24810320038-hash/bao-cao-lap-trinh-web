document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. LOGIC GIỎ HÀNG BẤM NÚT ---
    let cartCount = 0;
    const cartCountElement = document.getElementById("cart-count");
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            cartCount++;
            cartCountElement.textContent = cartCount;
            const title = this.closest(".product-card").querySelector(".product-title").textContent;
            alert(`Đã thêm "${title}" vào giỏ hàng!`);
        });
    });

    // --- 2. LOGIC MODAL ĐĂNG NHẬP / ĐĂNG KÝ ---
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
    closeModal.addEventListener("click", () => authModal.classList.remove("open"));
    // Click ra ngoài popup tự đóng
    window.addEventListener("click", (e) => {
        if (e.target ===