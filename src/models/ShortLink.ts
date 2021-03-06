import mongoose from "mongoose";
import shortid from 'shortid';
import { modelHelper } from "./modelHelper";
import { ObjectID } from 'mongodb';

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
    title: string,
    type: ShortLinkType,
    createBy: string,
    originalData: string
};

let shortLinkSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    title: {
        type: String
    },
    createBy: {
        type: String
    },
    type: {
        type: String
    },
    originalData: {
        type: String
    }
}, { timestamps: true })



export class ShortLinkModel extends modelHelper {

    static async createShortLink(type: ShortLinkType, userId: string, originalData?: string, title?: string): Promise<ShortLinkModel> {

        let newShortLink = new ShortLink({
            type: type,
            createBy: userId,
            originalData: originalData,
            title: title
        });

        let result = await newShortLink.save();
        if (result == newShortLink) {
            return result
        } else {
            return false
        }

    }

    static async getByShortLinkId(id: string): Promise<ShortLinkDocument> {
        let shortLink = await this.getById(id, ShortLink);
        return shortLink;
    }

    static async getByUserId(id: string): Promise<Array<ShortLinkDocument>> {
        let shortLinks = await ShortLink.find({
            createBy: id
        })
        return shortLinks
    }
}
export const ShortLink = mongoose.model<ShortLinkDocument>("ShortLink", shortLinkSchema);
