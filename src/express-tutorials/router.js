module.exports = function (app) {
    app.get('/', (req, res) => {
        //console.log(req.url);
        //console.log(req.files);
        let body = 'hello express';
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', body.length);
        res.send(body);
    });

    app.get('/user', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.send('<h1>user page</h1>');
    });

    app.get('/admin', (req, res) => {
        res.send('admin page');
    });

    app.get('/api', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.send({
            name: "张三",
            age: 40
        });
    });

    app.get('/template', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(__dirname + '/views/template.html');
    });
}