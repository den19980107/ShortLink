const mode = process.env.NODE_ENV || 'development'
let serverUrl, clientUrl
if (mode == 'development') {
    serverUrl = "http://localhost:5000"
    clientUrl = "http://localhost:3000"
} else if (mode == "production") {
    serverUrl = "http://shrinklink.ga"
    clientUrl = "http://shrinklink.ga"
}

type config = {
    mode: string,
    serverUrl: string,
    clientUrl: string
}

const config: config = {
    mode: mode,
    serverUrl: serverUrl,
    clientUrl: clientUrl
}


export default config

