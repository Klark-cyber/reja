console.log("FrontEnd ishga tushdi")
function itemTemplate(item){
    return `<li 
      class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
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
    e.preventDefault(); //Traditional usulda yani malumot kiritilib inter bosilganda create-item urliga otib ketishini oldi olindi.HTMLdagi actionda korsatilgan manzil ishga tushib ketishi oldi olindi

    axios //axios external package bolib uni htmlga yani reja.ejs ichiga yukladik
    .post("/create-item", {reja: createField.value})//axios obyctining .post() metodi orqali foydalanuvchi yuborgan malumotni serverdagi qaysi urlga qaysi nom orqali yuborilishi kerakligini belgildik.reja bu form tegida formga berilgan name:reja ning qiymati.Createfield.value bu user tomonidan kiritilgan malumotning qiymati.Yani u kiritgan matn
    .then((response) =>{//.post() orqali serverga yuborilgan malumot muvafaqqiyatli bajarilgan bolsa server bizga kerakli malumotni yuboradi.Ayni shu malumot response va unga tegishli data obyecti hisoblanadi yani response.data
        document //document obyecti orqali reja ejs ichidagi kerakli elementni idsi orqali qolga kiritamiz
        .getElementById("item-list") //item-list bu frontentdagi form pasidan joylashuvchi ul yani jadval idsi
        .insertAdjacentHTML("beforeend", itemTemplate(response.data))//insertaAdjacentHTML bu yuqorida chaqirilgan ul jadvalining qayeridan va qaysi malumotni kiritish kerakligini belgiladi.response.data server bizga yuborgan malumot.Biz uni itemTemplate orqali browserning kerakli qismiga yuklayaopmoiz
        createField.value = ""; //Bu qator orqali user kiritgan malumot '' ga yani bosh qiymatga tenglanyapti sababi avval kiritilgan malumot input ichida qolmasligi kerak
        createField.focus();//probelni input katagiga togirladik
    })
    .catch((err) => {
        console.log("Iltimos qayta urinib koring")
    });
});

document.addEventListener("click",function(e){
    //deleate operatsiyasi
    if(e.target.classList.contains("delete-me")){
        if(confirm("Aniq o'chirmoqchimisiz?")){
            axios.post("/deleate-item", {id: e.target.getAttribute("data-id")})
            .then(response => {
                console.log(response.data)
                e.target.parentElement.parentElement.remove();
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
        alert("siz edit tugmasini bosdingiz")
    }
})