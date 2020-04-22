import mongoose from "mongoose";
import shortid from 'shortid';
import { modelHelper } from "./modelHelper";

export enum ShortLinkType {
    url = "url",
    image = "image",
    file = "file",
    video = "video",
    location = "location",
    phoneNumber = "phoneNumber",
    email = "email"
}
export type ShortLinkDocument = mongoose.Document & {
    _id: string,
    type: ShortLinkType,
    originalData: string
};

let shortLinkSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    type: {
        type: String
    },
    originalData: {
        type: String
    }
}, { timestamps: true })



export class ShortLinkModel extends modelHelper {

    static async createShortLink(type: ShortLinkType, originalData?: string): Promise<ShortLinkModel> {

        let newShortLink = new ShortLink({
            type: type,
            originalData: originalData
        });

        let result = await newShortLink.save();
        if (result == newShortLink) {
            return result
        } else {
            return false
        }

    }

}
export const ShortLink = mongoose.model<ShortLinkDocument>("ShortLink", shortLinkSchema);
