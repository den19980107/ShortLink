import * as express from 'express';
import { Request, Response, NextFunction } from 'express'
import DeviceDetector from "device-detector-js";
import { ShortLinkModel, ShortLinkType } from '../models/ShortLink';
import { History, HistoryModel } from '../models/History';
import config from '../config/default';
const router = express.Router();


router.get("/:shortLinkId", async (req: Request, res: Response) => {
    const id = req.params.shortLinkId;
    let shortLink = await ShortLinkModel.getByShortLinkId(id);
    if (shortLink && shortLink.originalData) {
        res.redirect(shortLink.originalData)
    } else {
        res.redirect(`${config.clientUrl}/`);
    }
    let userAgent = req.header('user-agent')
    let userIP = getClientIp(req)
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);
    let newHistory = new History()
    newHistory.shortLinkId = id;
    newHistory.fromIP = userIP;
    newHistory.client_name = device.client.name;
    newHistory.client_type = device.client.type;
    newHistory.client_version = device.client.version;
    newHistory.device_brand = device.device.brand;
    newHistory.device_model = device.device.model;
    newHistory.device_type = device.device.type;
    newHistory.os_name = device.os.name;
    newHistory.os_platform = device.os.platform;
    newHistory.os_version = device.os.version;

    HistoryModel.createHistory(newHistory)
})

const getClientIp = (req) => {
    let x_ip = req.headers['x-forwarded-for']
    if (!x_ip) x_ip = req.connection.remoteAddress
    console.log(`user IP = ${x_ip}`)
    return x_ip
}

export = router;
