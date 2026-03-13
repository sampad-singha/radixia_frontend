import { UAParser } from "ua-parser-js"

export function parseUserAgent(ua: string) {

    const parser = new UAParser(ua)
    const r = parser.getResult()

    const browser = r.browser.name || "Unknown"
    const browserVersion = r.browser.version?.split(".")[0] || ""

    const os = r.os.name || ""
    const osVersion = r.os.version || ""

    const device = r.device.type || "desktop"

    return {
        browser,
        browserVersion,
        os,
        osVersion,
        device
    }

}