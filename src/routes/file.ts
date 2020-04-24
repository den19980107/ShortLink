import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import Grid from 'gridfs-stream';
import { getUploader, findFileByFileName } from '../common/upload';
import mongoose from 'mongoose'
import config from '../config/keys';
import { ObjectID } from 'mongodb'
import { FileModel, FileDocument, File } from '../models/File';
const router = express.Router();
const fileUploader = getUploader('file');

//init gfs   
let gfs

mongoose.connect(config.MONGODB.MONGODB_URI);
let db = mongoose.connection;


//check connection
db.once('open', function () {
    console.log("connect to mongodb");

    //init Stream
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('file');
});

// get file
router.get('/:fileId', async function (req: Request, res: Response) {
    let fileData: FileDocument = await FileModel.getFileById(req.params.fileId);
    if (fileData) {
        gfs.files.findOne({
            filename: fileData.fileName
        }, (err, file) => {
            //check if file exists
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                })
            }
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        });
    } else {
        res.status(404).json({ errors: [{ msg: "找不到檔案" }] })
    }
})

// 上傳照片
router.post('/upload', fileUploader.any(), function (req: Request, res: Response) {
    if (req.files && req.files.length > 0) {
        let files: any = req.files;
        files.forEach(async file => {
            const originalName = file.originalname
            const uploader = req.user._id
            const fileName = file.filename

            let newFile = new File;
            newFile._id = new ObjectID();
            newFile.name = originalName;
            newFile.fileName = fileName
            newFile.uploader = uploader;
            newFile.contentType = originalName.split(".")[1]
            let isSuccess = await FileModel.createFile(newFile);
            if (isSuccess) {
                res.status(200).json({ message: "新增成功", fileUrl: req.headers.origin + '/api/file/' + newFile._id })
            } else {
                res.status(500).json({ errors: [{ msg: "新增失敗" }] })
            }
        })
    }
})



export = router;
