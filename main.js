import {auth} from 'firebase'

  // Register formni tutib olish
  const form = document.getElementById('registerForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || password.length < 6) {
      message.textContent = "Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.";
      message.classList.remove("hidden");
      return;
    }

    // Firebase bilan ro'yxatdan o'tkazish
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        // Foydalanuvchi nomini yangilash (ixtiyoriy, ammo foydali)
        return user.updateProfile({ displayName: name }).then(() => {
          alert("✅ Ro‘yxatdan o‘tish muvaffaqiyatli!");
          window.location.href = './home-page/home.html';
        });
      })
      .catch(error => {
        message.textContent = "❌ " + error.message;
        message.classList.remove("hidden");
      });
  });
