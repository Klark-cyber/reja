//================================callback function with setInterval()=================================================
// console.log("Jack Ma maslahatlari");
// const list = [
//     "Yaxshi talaba boling", //0-20
//     "togri boshliq tanlang va koproq xato qiling", //20-30
//     "ozingiz uchun ishlashni boshlang", //30-40
//     "siz kuchli bolgan narsalaringizni qiling", //40-50
//     "yoshlarga invistitsiya qiling", //50-60
//     "endi dam oling,foydasi yoq" //60
//     ];

// function maslahatBering(a,callback){
//     if(typeof a !=="number") callback("insert a number",null); //cahqiriladigan callback funksiyamizda 2 ta parametr bolishi kerak.
//     else if (a <= 20) callback(null, list[0]); //if shartidan keyingi qator 1 qatordan iborat shu sababli {} ni ishlatmasak ham boladi
//     else if (a > 20 && a <=30) callback(null, list[1]);
//     else if (a > 30 && a <=40) callback(null, list[2]);
//     else if (a > 40 && a <=50) callback(null, list[3]);
//     else if (a > 50 && a <=60) callback(null, list[4]);
//     else { //60 dan katta yosh uchun chiqadigan natija 64/72 qator kodlari ishga tushgandan song 3 bolib 5 soniyadan keyin ishga tushadi
//         setInterval(function(){ //SetInterval natijasida return bolayotgan natija har 5 sekundda amalga oshyapti.Natijada terminalda list[5] dan qaytgan natijahar 1 sekunnda paydo boladi
//             callback(null, list[5]);
//         }, 1000);
//     }
// }

// console.log("passed here 0");

// maslahatBering(65, (err, data) => { //err,data => yuqorida yasalgan callback funksiyaning argumentlari
//     if(err) console.log("ERROR:", err); //agar err==tru bolsa error xabari chiqadi aks holda javob: chiqadi
//     else { //Bu qatorni qisqa qilib else console.log("javob:", data); korinishida yozish ham mumkin
//         console.log("javob:", data);
//     }
// });
// console.log("passed here 1");


//====================================================Async function===========================================

// async function maslahatBering(a){ //asinxron funksiyani define qismi.Bunday funksiyalarni call qilganda try/catch dan foydalanish foydali
//     if(typeof a !=="number") throw new Error ("insert a number");  //Error nomli yangi obyekt yaratdik va unga xatolik matni kiritildi.Agar xatolik yuzaga kelsa throw ishga tushib natija .catch ichiga tushadi
//     else if (a <= 20) return list[0];
//     else if (a > 20 && a <=30) return list[1];
//     else if (a > 30 && a <=40) return list[2];
//     else if (a > 40 && a <=50) return list[3];
//     else if (a > 50 && a <=60) return list[4];
//     else {
//         //return list[5]; //asinchron funksiya ichida core modul funksiyalari (setTimeout,setInterval...) togridan togri ishlamaydi
//         return new Promise((resolve, reject) => {
//             // setTimeout(() => {
//                 setIterval(() => {
//                 resolve(list[5]);
//             },1000);
//         });
//     }
// }

// console.log("passed here 0");

// //call via then/catch. then hamda catch metodlri orqali yuqorida funksiyani ishga tushirdik
// maslahatBering(24) //ushbu holatda natija barcha sinxron amaliyotlar yakuniga yetgandan song paydo boladi.avval sinchron keyin asinchron funksiya natijalari
//     .then((data) => { //then metodi amaliyot muvafaqqiyatli bajarilgandagi natija.data maslahatBer(20) asinc funksiyasining 20 yoshga teng holatdagi return bolgan natija
//     console.log("javob:", data);
//     })
//     .catch((err) => { //catch metodi maslahatBering(20) funksiya ichiga numberdan bosshqa qiymat berilishi natijasida yuzaga keladigan xatolik.bu xatolik throw new error orqali natija qaytaradi 
//     console.log("ERROR:", err)
//     });
// console.log("passed here 1");


// call via asyn/await
// async function run(){ //yangi async funksiya hosil qildik
//    let javob = await maslahatBering(20)  //yangi ozgaruvchiga await yordamida maslahatBer funksiya natijasini yukladik.Sabab await maslahatBer funksiyadan natija kelguncha keyingi qator kodlariga otib ketishni oldini oladi.Bu orqali async fu-ya natijasiga bogliq bolgan sync fu-ya natijasida xatlik yuzaga kelishini oldini olamiz
//    console.log(javob)
//    javob = await maslahatBering(65);
//    console.log(javob);
//    javob = await maslahatBering(41);
//    console.log(javob)
// }
// run();


//================================callback functions===================================================

// console.log("Jack Ma maslahatlari");
// const list = [
//     "Yaxshi talaba boling", //0-20
//     "togri boshliq tanlang va koproq xato qiling", //20-30
//     "ozingiz uchun ishlashni boshlang", //30-40
//     "siz kuchli bolgan narsalaringizni qiling", //40-50
//     "yoshlarga invistitsiya qiling", //50-60
//     "endi dam oling,foydasi yoq" //60
//     ];

// function maslahatBering(a,callback){
//     if(typeof a !=="number") callback("insert a number",null); //cahqiriladigan callback funksiyamizda 2 ta parametr bolishi kerak.
//     else if (a <= 20) callback(null, list[0]); //if shartidan keyingi qator 1 qatordan iborat shu sababli {} ni ishlatmasak ham boladi
//     else if (a > 20 && a <=30) callback(null, list[1]);
//     else if (a > 30 && a <=40) callback(null, list[2]);
//     else if (a > 40 && a <=50) callback(null, list[3]);
//     else if (a > 50 && a <=60) callback(null, list[4]);
//     else { //60 dan katta yosh uchun chiqadigan natija 64/72 qator kodlari ishga tushgandan song 3 bolib 5 soniyadan keyin ishga tushadi
//         setTimeout(function(){
//             callback(null, list[5]);
//         }, 5000);
//     }
// }

// console.log("passed here 0");

// maslahatBering(50, (err, data) => { //err,data => yuqorida yasalgan callback funksiyaning argumentlari
//     if(err) console.log("ERROR:", err); //agar err==tru bolsa error xabari chiqadi aks holda javob: chiqadi
//     else { //Bu qatorni qisqa qilib else console.log("javob:", data); korinishida yozish ham mumkin
//         console.log("javob:", data);
//     }
// });
// console.log("passed here 1");


//==================================================A task====================================================
// A-task
// function countLetter(letter,letterText){
//     let n=0;
// for (i=0;i<letterText.length;i++){
//     if(letter==letterText[i].toLowerCase()){
//         n+=1;
//     }else{
//         continue
//     }
// }
// console.log(n)
// return n
// };
// countLetter('e',"Engineer")
