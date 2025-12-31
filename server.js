console.log("Web serverni boshlash")
const express = require("express"); //express paketini loyihaga yukladik
const app = express(); //expressni ishga tushirib server obyectini yaratdik.server nomi app
const http = require("http"); //Serveerni tarmoqqa ulash uchun require qilindi
const fs = require("fs"); //Kerak paytda json filellar bilan ishlash uchun chaqirildi

let user;
fs.readFile("database/user.json","utf8", (err,data) => {
    if(err){
        console.log("ERROR:",err);
    }else {
        user = JSON.parse(data) //parse jsondan js obyect korinishiga otkazib beradi va user ozgaruvchisiga saqlaydi.Bu malumot keyinchalik browserga jsonni ulash uchun kerak
    }
});


//1 Kirish kode.expressga kirib kelayotgan malumotga bogliq kodlar
app.use(express.static("public")) //xar qanday browserdan kirib kelayotgan sorovlar uchun public folderi ochiq. Yani public papkasini ochiq frontend papka qildik.Keyinchalik html css bezaklarini shu folder ichiga yuklaymiz.Static Rasmlar va CSS filellar public papkasidan olishga ruxsat beradi
app.use(express.json()) //json korinishida kirib klayotgan maumotni object holatiga ozgartirib beradi.
app.use(express.urlencoded({extended: true})) //html <form> dan yoki frontenddan keladigan malumotlarni oqish.Yani server tushunadigan code korinishiga ogirish

//2 Session code


//3 Views code.express uchun traditional usulda frontend quramiz.viewni yasash uchun ejs folderdan foydalanamiz.ejsni install qilamiz
//Serverga html sahifalarini qayerdan olish kerakligini aytdik.Barcha dizayn fayllari views papkasi ichida va u ejs formatida ekanligi belgilandi
app.set("views","views"); //views folderni template papka deb belgiladik.HTML shablonlarni viewsdan izlaydi.yani browserga yuboriladigan frontend filellar shu yerda yaratiladi 
app.set("view engine", "ejs"); //res.render qilib kerakli fileni yozganimizda .ejs deb yozishni oldi olindi


//4 Routing(yonalishlar) code.Foydalanuvchi brouzerda turli manzillarga kirganda nima sodir bolishi.
app.post("/create-item",(req,res) => {
    console.log(req.body); //kelgan malumotning bodysini koncol qildik. natija: { item: 'this is great!' } shaklidagi name=item malumot keldi
    res.json({test: "success"}); //create itemdan browserga json formatdagi javobni qaytarib yubordik
})

app.get("/author",(req,res) => { //Agar user shu manzilga kirsa server author.ejs faylni olib uning ichiga 12 qatordan olingan user malumotlarini joylashtirib brouserga yuboradi
    res.render("author", {user: user});//{user: user} author.ejs file ichida <%=user.name%> kabi kodlar yozib foydalanuvchi malumotlarini dinamik kirita olamiz
})

app.get("/", function(req,res){
    res.render("reja"); //render malumotlarni htmlga aylantirib browserga korsatish
});

const server = http.createServer(app); //expressni http serverga boglash
let PORT = 3000; //server ishlaydigan port
server.listen(PORT, function(){ //Server uygonadi.listen metodi serverni korsatilgan portga ulab uni tinglash holatiga otkazadi.Endi keladigan sorovlar shu manzilga keladi
    console.log(`The server is running succesfully on port: ${PORT}, http://localhost:${PORT}`)
});