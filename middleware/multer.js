const multer = require('multer');

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'upload/avatar');
// 	},
// 	filename: (req, file, cb) => {
// 		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
// 		cb(null, file.fieldname + '-' + uniqueSuffix);
// 	},
// });

const storage = multer.memoryStorage();
const filterName = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image.jpeg'
	) {
		cb(null, true);
	} else {
		cb(
			{
				message: 'Only .png, .jpg and .jpeg format allowed!',
			},
			false
		);
	}
};

const upload = multer({
	dest: '/upload/avatar',
	storage,
	fileFilter: filterName,
	limits: {
		fileSize: '1024000',
	},
});

module.exports = upload;
