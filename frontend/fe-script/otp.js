document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.otp-input');
  inputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/g, ''); 
      if (input.value.length && idx < inputs.length - 1) {
        inputs[idx + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && idx > 0) {
        inputs[idx - 1].focus();
      }
    });
  });
});

window.onload = () => {
    const token = getCookie("Authorization");
    const userInfo = JSON.parse(atob(token.split('.')[1]));
    const email = userInfo.email;

    fetch('/api/auth/send-verification-code', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log("OTP đã được gửi thành công");
        } else {
            console.log("Lỗi gửi OTP:", data.message);
        }
    })
    .catch(error => {
        console.error(error);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  const verifyButton = document.getElementById('verify-btn');
  if (verifyButton) { 
    verifyButton.addEventListener('click', function (e) {
      e.preventDefault();

      const token = getCookie("Authorization");
      const userInfo = JSON.parse(atob(token.split('.')[1]));
      const email = userInfo.email;
      const otp = Array.from(document.querySelectorAll('.otp-input')).map(input => input.value).join('');

      fetch('/api/auth/verify-code', {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, providedCode: otp })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Xác thực thành công!');
          window.location.href = "/html/profile.html";
        } else {
          alert('Lỗi xác thực OTP: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Lỗi khi xác thực OTP:', error);
      });
    });
  } else {
    console.error('Phần tử verify-btn không tồn tại!');
  }
});


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
