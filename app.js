const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
	//This is the static way to routing. Each route is built with a set of if and else..if conditions.

	/*const htmlPath = path.join(__dirname, '/public')
	if (req.url === '/') {
		res.setHeader('Content-Type', 'text/html')
		fs.readFile(path.join(htmlPath, 'index.html'), 'utf8', (err, data) => {
			if (err) throw err
			res.end(data)
		})
	} else if (req.url === '/about') {
		res.setHeader('Content-Type', 'text/html')
		fs.readFile(path.join(htmlPath, 'about.html'), 'utf8', (err, data) => {
			if (err) throw err
			res.end(data)
		})
	} else if (req.url === '/api/movies') {
		let movies = [
			{ name: 'Movie McMovie', runtime: 134 },
			{ name: 'Movie Movever', runtime: 165 },
			{ name: 'Short Movie', runtime: 129 },
			{ name: 'Mover whover', runtime: 142 },
		]
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(movies))
	} else {
		res.end('The page you requested does not exist.')
	}*/

	//Generating file paths for different requests dynamically
	let filePath = path.join(__dirname, '/public', req.url === '/' ? 'index.html' : req.url)
	
	// Extension of file
	let ext = path.extname(filePath)

	// Default content type
	let contentType = 'text/html'

	// Check ext and set content type accordingly
	switch(ext){
		case '.js':
			contentType = 'text/javascript'
			break
		case '.css':
			contentType = 'text/css'
			break
		case '.json':
			contentType = 'application/json'
			break
		case '.png':
			contentType = 'image/png'
			break
		case '.jpg':
			contentType = 'text/jpg'
			break
	}
	
	// Read File
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			if (err.code === 'ENOENT') {
				// This means page not found
				fs.readFile(path.join(__dirname, '/public', '404.html'), 'utf8', (err, data) => {
					if (err) throw err
					res.setHeader('Content-Type', 'text/html')
					res.end(data)	
				})
			} else {
				// Most possibly server error
				res.writeHead(500)
				res.end(`Server error: ${err.code}`)

			}
		} else {
			// No errors
			res.setHeader('Content-Type', contentType)
			res.end(data)
		}
	})

})

const PORT = process.env.PORT || 9090

server.listen(PORT, () => {
	console.log(`Server running on ${PORT}...`)
})