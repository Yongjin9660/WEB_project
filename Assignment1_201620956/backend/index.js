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
            if(err){ console.log("HTML load Error!"); }
            
            fs.readdir(cur_path, function(err ,data){
                if(err){ console.log("cur_path load Error!"); }
                var list = "<ul style=\"list-style: none;\">";
                
                data.forEach(function(element){
                    list += "<li onclick='readFile(this);'>"+ element + "</li>";
                });

                // for(var i=0 ; i < data.length ; i++){
                //     list += `<li onclick='readFile(this);'>${data[i]}</li>`;
                // }
                list += "</ul>";
                var html = tmpl.toString().replace('<ul>%</ul>', list);
                html = html.replace('?', file_name);
                html = html.replace('$', file_content);
                response.writeHead(200);
                response.end(html);

            });
            
        });
    }else if(pathname === '/editfile'){

        response.writeHead(302, {Location: `/`});
        response.end();

    }else if(pathname === '/cd'){

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

    }else if(pathname === '/rmFile'){

    }else if(pathname === '/rename'){

    }else{
        response.writeHead(404);
        response.end('Not found');
    }
});

app.listen(3000);