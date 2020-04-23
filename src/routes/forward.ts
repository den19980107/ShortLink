import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import { UserDocument, User, UserModel } from '../models/user';
import { ShortLinkModel, ShortLinkType } from '../models/ShortLink';
const router = express.Router();


router.get("/:shortLinkId", async (req: Request, res: Response) => {
    const id = req.params.shortLinkId;
    let shortLink = await ShortLinkModel.getByShortLinkId(id);
    res.redirect(shortLink.originalData)
})

export = router;
