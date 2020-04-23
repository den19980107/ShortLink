import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { resolve, reject } from "bluebird";
import { modelHelper } from "./modelHelper";
export type FileDocument = mongoose.Document & {
    name: string
    uploader: string,
    fileName: string,
    contentType: string
};

let fileSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    // 上傳者id
    uploader: {
        type: String,
        require: true
    },
    fileName: {
        type: String,
        require: true
    },
    contentType: {
        type: String,
        required: true
    }
}, { timestamps: true })


export class FileModel extends modelHelper {
    /**
     * 建立檔案
     * @param file 
     */
    static async createFile(file: FileDocument): Promise<boolean> {
        let newFile = new File(file)
        return new Promise(function (resolve, reject) {
            newFile.save(function (err) {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }

    static async getFileById(id: string): Promise<FileDocument> {
        let file: FileDocument = await FileModel.getById(id, File)
        return file
    }

}
export const File = mongoose.model<FileDocument>("File", fileSchema);
