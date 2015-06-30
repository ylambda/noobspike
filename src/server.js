import express from 'express';
import React from "react";
import ReactApp from "./client/components/App.jsx";

let App = React.createFactory(ReactApp);

let app = express();
app.use('/static', express.static(__dirname+'/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

app.get('/', (req, res) => {
    let reactHtml = React.renderToString(App({}));
    res.render('index.ejs', { reactHtml });
});

app.listen(8000, () => {console.log("Server listening on port 8000");});
