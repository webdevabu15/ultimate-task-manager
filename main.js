 const form = document.getElementById('registerForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (name && email && password.length >= 6) {
        alert("Ro‘yxatdan muvaffaqiyatli o‘tdingiz!");
        localStorage.setItem("user", JSON.stringify({ name, email }));
        form.reset();
        message.classList.add("hidden");
        window.location.href = './home-page/home.html'
      } else {
        message.textContent = "Parol kamida 6 ta belgidan iborat bo‘lishi kerak";
        message.classList.remove("hidden");
      }
    });