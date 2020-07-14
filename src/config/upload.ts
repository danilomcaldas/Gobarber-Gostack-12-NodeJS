import path from 'path';
import crypto from 'crypto'
import multer from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default{
    directory : tmpFolder,

    storage : multer.diskStorage({
        destination : path.resolve(__dirname, tmpFolder),
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        },
    }),
};