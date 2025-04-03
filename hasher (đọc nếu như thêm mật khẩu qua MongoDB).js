//File này để băm mật khẩu bằng tay nếu như thêm tài khoản qua MongoDB chứ k phải qua màn hình register. Do login băm ngược lại mật khẩu để check nên không lưu password thô trong db như "123" được.


const bcrypt = require('bcrypt');

const password = '123';

bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;

  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;

    console.log('Hashed password:', hash); //console.log ra mật khẩu bị băm r copy vào field password trong từng document một
  });
});
