
  fetch('/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('username').textContent = data.username;
      document.getElementById('registered').textContent = data.createdAt;
      document.getElementById('verified').textContent = data.verified ? 'True' : 'False';
    })
    .catch(err => console.error('Lỗi khi lấy dữ liệu hồ sơ:', err));