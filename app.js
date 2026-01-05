console.log("Web serverni boshlash")
const express = require("express"); //express paketini loyihaga yukladik
const app = express(); //expressni ishga tushirib server obyectini yaratdik.server nomi app
const http = require("http"); //Serveerni tarmoqqa ulash uchun require qilindi
const fs = require("fs"); //Kerak paytda json filellar bilan ishlash uchun chaqirildi

//MongoDBni chaqiramiz
const db = require("./server").db()//db=client.db("Reja")=> db obyecti server.js ichidan export bolgan client obyectiga tegishli obyect.Yani qalam u orqali mongodbga malumotni yaratamiz,oqiymiz,yangilaymiz va ochiramiz
const mongodb = require("mongodb")//mongodb require qilinishiga sabab mongoDbga qoshiladigan malumotga tegishli "id" raqami ustida amal bajarish uchun kerak bu idni client.db amalga oshirib bera olmaydi

// let user;//author.jsga tegishli malumotlar
// fs.readFile("database/user.json","utf8", (err,data) => {
//     if(err){
//         console.log("ERROR:",err);
//     }else {
//         user = JSON.parse(data) //parse jsondan js obyect korinishiga otkazib beradi va user ozgaruvchisiga saqlaydi.Bu malumot keyinchalik browserga jsonni ulash uchun kerak
//     }
// });


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

app.post("/create-item",(req,res) => { //app.post browser yoki client sorov yuborganda ishga tushadi
    console.log("user entered /create-item") //Agar birorta mijoz localhostga kirsa terminlada yani backend consolida log hosil boladi 
    console.log(req.body); //mijoz yuborgan postning bodysini koncol qildik. name=item malumot keldi
    const new_reja = req.body.reja; //new_reja bu mijoz yuborgan postning bodysi."reja" esa ushbu postning html <form> tegi ichida postga berilgan name name=reja
    db.collection("plans").insertOne({reja:new_reja},(err,data)=>{ //db.collection orqali mongo db reja/plansga mijoz tomonidan yuborilgan post yuklanyapti.Bu yerdagi data malumot muvafaqqiyatli qoshilganda keladigan natija obyecti
        console.log(data.ops) //data.ops bu mongodbga qoshilgan _id: va reja: dan iborat malumotlar massivi.Avval u mongodbga saqlandi va nimani saqlaganimizni korish uchun konsol qildik
        res.json(data.ops[0]); //data.ops insertOnga bogliq bolib insertOne orqali bitta malumot qoshiladi va u doim 0 indeksga ega boladi.res.json qilib browser jsga malumot yuborilganda faqat insertOne orqali mongodbga qoshilayotgan malumot faqat 0 indeksga ega bolib ops sifatida saqlanadi eskilari tashlab yuboriladi.Shu sababli res.json(data.ops[0]) element yuborildi.Shuningdek frontend kodi faqat bitta obyektga moljallab  yozilgn shu sababli faqat 0 indeks korsttildi

    //   if(err){
    //         console.log(err)
    //         res.end("something went wrong");
    //     }else{
    //         res.end("successfully added") 
    //     }
    })
   // res.json("success"); //create itemdan browserga json formatdagi javobni qaytarib yubordik
})

app.post("/deleate-item",(req,res) => { //frontend yoki browser ochirish tugmasini bosganda axios orqali post keladi va ishga tushadi
    const id = req.body.id; //ochirish tugmasiga tegishli malumotning idsini ajratib oldik.Ammo bu string korinishda.Mongodbga esa idni aniq kiritishimiz kerak boladi.
    //console.log(id)
    //res.end("done")
    db.collection("plans").deleteOne({_id: new mongodb.ObjectId(id)}, function(err,data){//plansdan ayni shu idga tegishli qatorni ochirishimiz kerak.Buning uchun require qilingan mpoongodbning Object() metodi kerak boladi.Unga yuqoridagi ajratib olgan string korinishdagi idni argument qilib kiritdik.
        res.json({state: "succes"}) //Bu habar frontend js ga korinadi.Browserda bevosita korinmaydi
    })
});


// app.get("/author",(req,res) => { //Agar user shu manzilga kirsa server author.ejs faylni olib uning ichiga 12 qatordan olingan user malumotlarini joylashtirib brouserga yuboradi
//     res.render("author", {user: user});//{user: user} author.ejs file ichida <%=user.name%> kabi kodlar yozib foydalanuvchi malumotlarini dinamik kirita olamiz
// })

app.post("/edit-item",(req,res) => {
    const data = req.body;

    //console.log(id)
    //res.end("done")
    db.collection("plans").findOneAndUpdate(
        {_id: new mongodb.ObjectId(data.id)}, 
        {$set:{reja: data.new_input}}, 
        function(err,data){
        res.json({state: "succes"})
    }
    );
});
// app.get("/author",(req,res) => { //Agar user shu manzilga kirsa server author.ejs faylni olib uning ichiga 12 qatordan olingan user malumotlarini joylashtirib brouserga yuboradi
//     res.render("author", {user: user});//{user: user} author.ejs file ichida <%=user.name%> kabi kodlar yozib foydalanuvchi malumotlarini dinamik kirita olamiz
// })

app.post("/deleate-all",(req,res) => {
    if(req.body.deleate_all){
        db.collection("plans").deleteMany(() =>{
            res.json({state: "Hamma rejalar o'chirildi"});
        })
    }
})


app.get("/", function(req,res){ //Bu kod sahifa ochilganda,sahifa yangilanganda,server qayta ishga tushib sahifa yangilanfganda ishga tushadi
    console.log("user entered /") //bu qator bizning server konsolida chiqadi.Yani qachonki biror foydalanuvchi localhostni ochganda
    db.collection("plans").find().toArray((err, data)=>{ //plans ichidagi malumotni find() topadi toArray() massiv koriniahiga olib keladi.Agar topish muvafaqqiyatli bolsa bizga mongo db datani beradi
        if(err){
            console.log(err)
            res.end("something went wrong");
        }else{
            console.log(data)
            res.render("reja", {items: data}); //server "reja" nomli ejs fileni ochadi.Uni browserga html korinisghida yuboradi.render malumotlarni htmlga aylantirib browserga korsatish.items esa dataga yani mongo db bizga array qilib qaytargan data.items=datasxzx1q
        }
    })
});

module.exports = app;
