import mongoose from "mongoose";
import { modelHelper } from "./modelHelper";

export type HistoryDocument = mongoose.Document & {
    shortLinkId: string
    fromIP: string,
    client_name: string,
    client_type: string,
    client_version: string,
    device_brand: string,
    device_model: string,
    device_type: string,
    os_name: string,
    os_platform: string,
    os_version: string,
    createdAt: Date
};

let historySchema = new mongoose.Schema({
    shortLinkId: {
        type: String,
        require: true
    },
    fromIP: {
        type: String,
        require: true
    },
    client_name: {
        type: String,
    },
    client_type: {
        type: String,
    },
    client_version: {
        type: String,
    },
    device_brand: {
        type: String,
    },
    device_model: {
        type: String,
    },
    device_type: {
        type: String,
    },
    os_name: {
        type: String,
    },
    os_platform: {
        type: String,
    },
    os_version: {
        type: String,
    }
}, { timestamps: true })


export class HistoryModel extends modelHelper {

    static async createHistory(history: HistoryDocument): Promise<boolean> {
        let newHistory = new History(history)
        return new Promise(function (resolve, reject) {
            newHistory.save(function (err) {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }

    static async getHistorysByShortLinkId(id: string): Promise<Array<HistoryDocument>> {
        let historys: Array<HistoryDocument> = await History.find({ shortLinkId: id })
        return historys
    }

}
export const History = mongoose.model<HistoryDocument>("History", historySchema);
