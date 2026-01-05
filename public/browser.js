console.log("FrontEnd ishga tushdi")
function itemTemplate(item){
    return `<li 
      class="list-group-item list-group-item-info d-flex align-items-center justify-content-between ">
      <span class="item-text">${item.reja}</span>
      <div>
          <button data-id="${item._id}" 
          class="edit-me btn btn-secondary btn-sm mr-1">
              O'zgartirish
          </button>
           <button data-id="${item._id}" 
            class="delete-me btn btn-danger btn-sm">O'chirish</button>
      </div>
    </li>`;
}


let createField = document.getElementById("create-field") //createfield bu form tgiga orqali foydalanuvchi tomonidan kiritilgan malumot.Yani input bolgan malumotning idsi orqali ayni osha malumotni ushlab oldik.
document.getElementById("create-form").addEventListener("submit", function(e){//Malumot kiritilib enter bolganda ishga tushadigan kod.Htm formning idsi orqali uni qolga kiritdik
    e.preventDefault(); //Traditional usulda yani malumot kiritilib inter bosilganda create-item urliga otib ketishini oldi olindi.HTMLdagi actionda korsatilgan manzil ishga tushib ketishi oldi olindi.Agar buni yozmasak kiritilgan malumot browserda 2 marta paydo boladi sababi.Biri traditional usulda post boladi ikkinchisi axios orqali modern uslubda post bolib mongodbga joylashadi va app.get bolganda ikkalasi ham korinadi
    axios //axios external package bolib uni htmlga yani reja.ejs ichiga yukladik
    .post("/create-item", {reja: createField.value})//axios obyctining .post() metodi orqali foydalanuvchi yuborgan malumotni serverdagi qaysi urlga qaysi nom orqali yuborilishi kerakligini belgildik.reja bu form tegida formga berilgan name:reja ning qiymati.Createfield.value bu user tomonidan kiritilgan malumotning qiymati.Yani u kiritgan matn
    .then((response) =>{//.post() orqali serverga yuborilgan malumot muvafaqqiyatli bajarilgan bolsa server bizga kerakli malumotni yuboradi.Ayni shu malumot response va unga tegishli data obyecti hisoblanadi yani response.data.Qabul qilingan data birdaniga browserga qoshilyapti qanday qoshishni esa itemtemplate belgilab beradi
        document //document obyecti orqali reja ejs ichidagi kerakli elementni idsi orqali qolga kiritamiz
        .getElementById("item-list") //item-list bu frontentdagi form pasidan joylashuvchi ul yani jadval idsi
        .insertAdjacentHTML("beforeend", itemTemplate(response.data))//insertaAdjacentHTML bu yuqorida chaqirilgan ul jadvalining qayeridan va qaysi malumotni kiritish kerakligini belgiladi.response.data server bizga yuborgan malumot.Biz uni itemTemplate orqali browserning kerakli qismiga yuklayaopmoiz.
        //insertAdjacentHTML malumotni vaqtincha yuklaydi.Qachonki refresh bolganda app.get ishga tushadi va itemtemplate browserga yozgan malumot refreshdan song ochib ketadi va app.getdan kelgan malumot browserda paydo boladi
        createField.value = ""; //Bu qator orqali user kiritgan malumot '' ga yani bosh qiymatga tenglanyapti sababi avval kiritilgan malumot input ichida qolmasligi kerak
        createField.focus();//probelni input katagiga togirladik

    }).catch((err) => {
        console.log("Iltimos qayta urinib koring")
    });
});

document.addEventListener("click",function(e){ //Browserdagi tugma click bolsa addeventlistener ichidagi kollbak funksiya ishga ytushadi click bolgan tugma e sifatida funksiyaga argument boladi
    //deleate operatsiyasi
    if(e.target.classList.contains("delete-me")){ //Agar click bolgan tugmaning target ichidagi classlistida yani class royxatida delete-me mavjud bolsa ushbu tugma uchun quyidagi amalar ishga tushsin.contains metodi biror narsa mavjudligini tekshirib beradi
        if(confirm("Aniq o'chirmoqchimisiz?")){ //confirm foydalanuvchidan soraydi aniq ochirmoqchiligini.Xuddi alertga oxshab browser elementi.Confirm browserda "ok" va net n soraydi biz okni bosb tasdiqlasak axios ishga tushadi
            axios.post("/deleate-item", {id: e.target.getAttribute("data-id")})//axios deleate-item urlga clik bolgan listga tegishli malumotning idsini serverga yuboryapti.data-id bu reja.ejs ichida item_id: ekanligi kiritib otilgan 
            .then(response => { //delete-itemga axios orqali post bolgandan song server bizga state:success json.habarini yuboradi.
                console.log(response.data)//serverdan kelgan habar response.data orqali browser konsoliga korinadi
                    e.target.parentElement.parentElement.remove(); //va click bolgan btn joylashgan qatorni toliq browserdan avtomatik ochirib ochirib tashladik.Malumot shundoq ham databasedan ochib ketardi agar bu qatorni yozmasak browser refresh bolsagina browserdagi malumot ochib ketadi ungacha saqlanib turadi
            }).catch(err => {
                console.log("Iltimos qayta urinib koring")
            });
        }
        //     alert("Ha deb javob berildi")
        // }else{
        //      alert("Yo'q deb javob berildi")
        // }
        //alert("siz deleate tugmasini bosdingiz")
    }

    //edit operatsiyalari
    if(e.target.classList.contains("edit-me")){
        let userInput = prompt("Yangi o'zgarishni kiriting", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML ) //=> getElementsByClassName("item-text")[0]
        if(userInput){
        axios.post("/edit-item",{id: e.target.getAttribute("data-id"), new_input: userInput})
        .then((response) => {
            console.log(response.data)
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML=userInput;
        })
        .catch((err) => {
            console.log("Iltimos qaytadan urinib koring")
        });
        }
    }
});
document.getElementById("clean-all").addEventListener("click", function(){ //Hamma rejalarni ochirish tugmasini ishga tushiramiz.Bunda mongodbdagi barcha malumot ochib ketadi
    //e.preventDefault(); bu kod shart emas sababi bu btn form tegidan tashqarida va u ishga tushsa yangi url ishga tushmaydi
    axios.post("/deleate-all", { deleate_all: true}).then((response) => {
        alert(response.data.state);
        document.location.reload();
    });
});