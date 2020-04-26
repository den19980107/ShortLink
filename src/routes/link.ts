import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { UserDocument, User, UserModel } from '../models/user';
import { ShortLinkModel, ShortLinkType } from '../models/ShortLink';
import { HistoryModel } from '../models/History';
const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
    let { url, type } = req.body;
    let result;
    switch (type) {
        case ShortLinkType.url:
            result = await ShortLinkModel.createShortLink(ShortLinkType.url, req.user.id, url);
            break;
        case ShortLinkType.file:
            result = await ShortLinkModel.createShortLink(ShortLinkType.file, req.user.id, url);
            break;
        case ShortLinkType.email:
            result = await ShortLinkModel.createShortLink(ShortLinkType.email, req.user.id, url);
            break;
        case ShortLinkType.image:
            result = await ShortLinkModel.createShortLink(ShortLinkType.image, req.user.id, url);
            break;
        case ShortLinkType.video:
            result = await ShortLinkModel.createShortLink(ShortLinkType.video, req.user.id, url);
            break;
        case ShortLinkType.location:
            result = await ShortLinkModel.createShortLink(ShortLinkType.location, req.user.id, url);
            break;
        case ShortLinkType.phoneNumber:
            result = await ShortLinkModel.createShortLink(ShortLinkType.phoneNumber, req.user.id, url);
            break;
    }
    if (result) {
        res.status(200).json({ message: "success", data: result })
    } else {
        res.status(500).json({ message: "error" })
    }
})

router.get("/reports/:id", async (req: Request, res: Response) => {
    let shortLinkId = req.params.id;
    let historys = await HistoryModel.getHistorysByShortLinkId(shortLinkId);
    console.log(historys);
    if (historys) {
        res.status(200).json({ message: "success", data: historys })
    } else {
        res.status(500).json({ message: "error" })
    }
})

export = router;
