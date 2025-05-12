const User = require('../models/usersModel.js');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.status(200).json({ success: true, message: 'All users', data: users });
    } catch (error) {
        console.log(error);
    }
}

exports.getUserByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.find({ email: {$regex: email, $options: "i"} });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User found', data: user });
    }
    catch (error) {
        console.log(error);
    }
}

exports.getUserByRole = async (req, res) => {
    const { role } = req.query;
    try {
        const users = await User.find({ role: {$regex: role, $options: "i"} });
        if (!users) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.status(200).json({ success: true, message: 'Users found', data: users });
    }
    catch (error) {
        console.log(error);
    }
}

exports.getUserProfile = async(req, res) =>{
    const { userID } = req.user;
    try{
        const existingUser = await User.findOne({userID});
        if (!existingUser) {
			return res
				.status(404)
				.json({ success: false, message: 'No user found' });
		}
        const createdAt = existingUser.createdAt.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

        const verified = existingUser.verified;
        const username = existingUser.username;

        res.json({ createdAt, verified, username });
    } catch (err) {
        console.error('Lỗi khi lấy hồ sơ người dùng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};
