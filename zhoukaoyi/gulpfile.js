var gulp = require("gulp");
var server = require("gulp-webserver");
var fs = require("fs");
var path = require("path");
gulp.task("server", function() {
    console.log(1)
    gulp.src("./src")
        .pipe(server({
            port: 8000,
            middleware: function(req, res, next) {
                if (req.url = "/favicon.ico") {
                    return;
                }
                var pathname = require("url").parse(req.url).pathname;
                console.log(pathname)
                pathname = pathname == "/" ? "/index.html" : pathname;
                if (pathname == "/index.html") {
                    res.end(fs.readFileSync(path.join(__dirname, "src", "index.html")));
                } else {
                    var ext = path.extname(pathname);
                    if (ext) {
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    } else if (pathname == "/api/getData") {
                        res.end(fs.readFileSync(path.join(__dirname, "src/data", "data.json")))
                    } else {
                        res.end("not found")
                    }
                }
            }
        }))
})