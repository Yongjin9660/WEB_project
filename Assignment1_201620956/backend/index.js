var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var cur_path = path.resolve('../fs');
var file_name = "";
var file_content = "";

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
        fs.readFile("../frontend/template.html", function(err, tmpl){
            if(err) console.log(err);
            fs.readdir(cur_path, function(err ,data){
                if(err) console.log(err);
                var list = "";
                var temp = "";
                data.forEach(function(element){
                    var t_path = path.join(cur_path, element);
                    try{
                        const stat = fs.statSync(t_path);
                        if(stat.isDirectory() === true){
                            temp = "<tr class=\"dir\">";
                            temp += "<th onclick='changeDir(this);'>"+ element + "</th>";
                            temp += "<th><button onclick=\'DeleteDir(\"" + element + "\");\'>delete</button></th>";
                            temp += "<th><button onclick=\'Rename(\"" + element + "\");\'>rename</button></th>";
                            if(stat.size === 0) temp += "<th> - </th>";
                            else temp += "<th>"+ stat.size + " B</th>";
                            temp += "<th>"+ stat.mtime.toLocaleDateString() + "</th>";
                            temp += "</tr>";
                            list += temp;
                        }else{
                            temp = "<tr class=\"fil\">";
                            temp += "<th onclick='readFile(this);'>"+ element + "</th>";
                            temp += "<th><button onclick=\'DeleteFile(\"" + element + "\");\'>delete</button></th>";
                            temp += "<th><button onclick=\'Rename(\"" + element + "\");\'>rename</button></th>";
                            if(stat.size === 0) temp += "<th> - </th>";
                            else temp += "<th>"+ stat.size + " B</th>";
                            temp += "<th>"+ stat.mtime.toLocaleDateString() + "</th>";
                            temp += "</tr>";
                            list += temp;
                        }
                    }catch(err){
                        console.log(err);
                    }
                });
                var html = tmpl.toString().replace('<tr>%</tr>', list);
                html = html.replace('?', file_name);
                html = html.replace('$', file_content);
                response.writeHead(200);
                response.end(html);
            });
        });
    }else if(pathname === '/editfile'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            console.log(post);
            var title = post.title;
            var description = post.description;
            var f_path = path.join(cur_path, title);
            fs.writeFile(f_path, description, function(err){
                if(err) console.log(err);
            })
        });
        response.writeHead(302, {Location: `/`});
        response.end();

    }else if(pathname === '/cd'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var dir_name = post.dir_name;
            cur_path = path.join(cur_path, dir_name);
        });
        response.writeHead(302, {Location: `/`});
        response.end();

    }else if(pathname === '/readfile'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            file_name = post.file_name;
            var file_path = path.join(cur_path, file_name);
            fs.readFile(file_path, 'utf8', function(err, data){
                console.log(file_path);
                file_content = data;
                response.writeHead(302, {Location: `http://localhost:3000/`});
                response.end();
            });
        });
    }else if(pathname === '/mkdir'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var dirPath = path.join(cur_path, title);
            fs.mkdir(dirPath, function(err){
                if(err) console.log(err);
            })
        });
        response.writeHead(302, {Location: `/`});
        response.end();
    }else if(pathname === '/rmdir'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var dirname = post.dir_name;
            var dirPath = path.join(cur_path, dirname);
            fs.rmdir(dirPath, function(err){
                if(err) console.log(err);
            })
        });
        response.writeHead(302, {Location: `/`});
        response.end();
    }else if(pathname === '/rmFile'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var file_name = post.file_name;
            var file_Path = path.join(cur_path, file_name);
            fs.unlink(file_Path, function(err){
                if(err) console.log(err);
            })
        });
        response.writeHead(302, {Location: `/`});
        response.end();
    }else if(pathname === '/rename'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var dirname = post.dir_name;
            fs.rename(dirPath, function(err){
                if(err) console.log(err);
            })
        });
        response.writeHead(302, {Location: `/`});
        response.end();
    }else{
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);