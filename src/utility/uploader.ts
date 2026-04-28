import multer from "multer";

import path from "path";
import fs from "fs";

const uploadDir  = path.join(process.cwd(),"uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true})
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const suffix = `${Date.now()} - ${Math.round(Math.random() * 1E9)}`
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname} - ${suffix}${extension}`)
    }
});

function imageFileFilter(_req:any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if(/^image\//.test(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error("Only image uploads are allowed"));
    }
}

export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024*1024 },
    fileFilter: imageFileFilter,
})

export default upload;