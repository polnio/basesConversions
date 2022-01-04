var http = require('http'),
    fs = require('fs')

const MIME_TYPES = {
    html: 'text/html; charset=utf-8',
    js: 'application/javascript',
    json: 'application/json'
}

http.createServer()
.on('request', (request, response) => {
    let simpleUrl = /([\w./]+)/.exec(request.url)[1]
    let file = "./dist"+(simpleUrl == "/" ? "/index.html" : ''+simpleUrl)
    fs.readFile(file, (err, data) => {
        if(err) {
            response.writeHead(404)
            console.error(simpleUrl+" not found");
            response.end()
        }

        for(const type in MIME_TYPES) {
            if(new RegExp('.'+type+"$").test(file)) {
                response.writeHead(200, {
                    'Content-type': MIME_TYPES[type]
                })
                break
            }
        }
        response.end(data)
    })
})
.listen(3000)