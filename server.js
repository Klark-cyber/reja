const http = require("http"); //Serveerni tarmoqqa ulash uchun require qilindi
const mongodb = require("mongodb")

let db;
const connectionString = "mongodb+srv://jamshidshukuraliyev8066_db_user:hgUP31iSjZvDJYV8@cluster0.udz7uhh.mongodb.net/"

mongodb.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, (err, client) => {
    if(err) console.log("ERROR on connection MongoDB")
    else {
     console.log("MongoDb connection succed")
     module.exports = client;
     const app = require("./app"); //app ni app.js filedan import qildik
     const server = http.createServer(app); //expressni http serverga boglash
let PORT = 3000; //server ishlaydigan port
server.listen(PORT, function(){ //Server uygonadi.listen metodi serverni korsatilgan portga ulab uni tinglash holatiga otkazadi.Endi keladigan sorovlar shu manzilga keladi
    console.log(`The server is running succesfully on port: ${PORT}, http://localhost:${PORT}`)
});   
    }
});


