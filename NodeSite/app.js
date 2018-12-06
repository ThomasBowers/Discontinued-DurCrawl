var http = require('http');
var fs = require('fs');

const hostname = "127.0.0.1"
const port = 3000;

const server = http.createServer(function(request, response) {  
		const request_url = request.url
		var resource_url = "."
		var content_type = {"Content-Type" : "text/html"}

		var extension = request_url.split('.').pop()

		if (request_url == "/") {
			resource_url += "/index.html"

		} else if (request_url.includes("create?")) {
			var query = request_url.split('?')[1]
			var colleges_to_include = request_url.split('?')[1].split('&')
			colleges_to_include = colleges_to_include.splice(0, colleges_to_include.length - 1)

			console.log(colleges_to_include)


		} else {
			resource_url += request_url
		}

		switch (extension) {
			case "jpg": {
				content_type["Content-Type"] = "image/jpg"
				break
			}

			case "png": {
				content_type["Content-Type"] = "image/png"
				break
			}

			case "js": {
				content_type["Content-Type"] = "text/javascript"
				break
			}

			case "css": {
				content_type["Content-Type"] = "text/css"
				break
			}
		}

        response.writeHeader(200, content_type);
        var contents = fs.readFileSync(resource_url);
        response.write(contents)
        response.end(); 
    }).listen(port, hostname);
