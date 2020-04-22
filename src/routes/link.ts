import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { UserDocument, User, UserModel } from '../models/user';
import { ShortLinkModel, ShortLinkType } from '../models/ShortLink';
const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
    let { url } = req.body;
    let result = await ShortLinkModel.createShortLink(ShortLinkType.url, url);
    if (result) {
        res.status(200).json({ message: "success", data: result })
    } else {
        res.status(500).json({ message: "error" })
    }
})

export = router;
