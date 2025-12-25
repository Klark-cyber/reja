console.log("Web serverni boshlash")
const express = require("express"); //express paketini loyihaga yukladik
const app = express(); //expressni ishga tushirib server obyectini yaratdik.server nomi app
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json","utf8", (err,data) => {
    if(err){
        console.log("ERROR:",err);
    }else {
        user = JSON.parse(data) //parse jsondan obyect korinishiga otkazib beradi
    }
});


//1 Kirish kode.expressga kirib kelayotgan malumotga bogliq kodlar
app.use(express.static("public")) //xar qanday browserdan kirib kelayotgan sorovlar uchun public folderi ochiq. Yani public papkasini ochiq frontend papka qildik.Keyinchalik html css bezaklarini shu folder ichiga yozamiz
app.use(express.json()) //json korinishida kirib klayotgan maumotni object holatiga ozgartirib beradi.
app.use(express.urlencoded({extended: true})) //html <form> dan keladigan malumotlarni oqish.Yani server tushunadigan code korinishiga ogirish

//2 Session code


//3 Views code.express uchun traditional usulda frontend quramiz.viewni yasash uchun ejs folderdan foydalanamiz.ejsni install qilamiz

app.set("views","views"); //views folderni template papka deb belgiladik.HTML shablonlarni viewsdan izlaydi
app.set("view engine", "ejs");


//4 Routing code
app.post("/create-item",(req,res) => {
    console.log(req.body); //kelgan malumotning bodysini koncol qildik. natija: { item: 'this is great!' } shaklidagi name=item malumot keldi
    res.json({test: "success"}); //create itemdan browserga json formatdagi javobni qaytarib yubordik
})

app.get("/author",(req,res) => {
    res.render("author", {user: user});
})

app.get("/", function(req,res){
    res.render("harid"); //render malumotlarni htmlga aylantirib browserga korsatish
});

const server = http.createServer(app); //expressni http serverga boglash
let PORT = 3000; //server ishlaydigan port
server.listen(PORT, function(){
    console.log(`The server is running succesfully on port: ${PORT}`)
});