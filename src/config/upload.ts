import path from 'path';
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';

    tempFolder: string;

    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    },

    config: {
        disk: {};
        aws: {
            buket: string;
        }

    }
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tempFolder: tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: path.resolve(__dirname, tmpFolder),
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;

                return callback(null, filename);
            },
        }),
    },

    config: {
        disk: {},
        aws: {
            buket: 'app-gobarber',
        }

    }
} as IUploadConfig;