console.log("Web serverni boshlash")
const express = require("express"); //express paketini loyihaga yukladik
const app = express(); //expressni ishga tushirib server obyectini yaratdik.server nomi app
const http = require("http");


//1 Kirish kode.expressga kirib kelayotgan malumotga bogliq kodlar
app.use(express.static("public")) //xar qanday browserdan kirib kelayotgan sorovlar uchun public folderi ochiq. Yani public papkasini ochiq frontend papka qildik.Keyinchalik html css bezaklarini shu folder ichiga yozamiz
app.use(express.json()) //json korinishida kirib klayotgan maumotni object holatiga ozgartirib beradi.
app.use(express.urlencoded({extended: true})) //html <form> dan keladigan malumotlarni oqish

//2 Session code


//3 Views code.express uchun traditional usulda frontend quramiz.viewni yasash uchun ejs folderdan foydalanamiz.ejsni install qilamiz

app.set("views","views"); //views folderni template papka deb belgiladik.HTML shablonlarni viewsdan izlaydi
app.set("view engine", "ejs");


//4 Routing code

app.get("/hello", function(req,res){
    res.end(`<h1>Hello world by Bekzodali<h1>`);  //res.end(`<h1 style="background: red"> <a href="http://localhost:3000/gift">Hello world by BekzodAli</a><h1>`);
});

app.get("/gift", function(req,res){
    res.end(`<h1>Siz sovgalar bolimidasiz<h1>`); //res.end(`<h1 style="background: green"> <a href="http://localhost:3000/hello">Siz sovgalar bolimidasiz</a><h1>`);
});

const server = http.createServer(app); //expressni http serverga boglash
let PORT = 3000; //server ishlaydigan port
server.listen(PORT, function(){
    console.log(`The server is running succesfully on port: ${PORT}`)
});