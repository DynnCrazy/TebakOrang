var textquestion = document.getElementById("pertanyaan");

var person = [
    {
        "name": "Aditya",
        "gender": "Laki-Laki",
        "agama": "Hindu",
        "image": "",
        "fakta": ["Contoh objek", "Example"],
        "kemungkinan": ["Contoh objek", "Example"]
    }
];

let dataGlobal;

function prosesData(data) {
    console.log("Data sudah siap:", data);
    formatData();

    pertanyaan1dan2();
}

function formatData() {
    person = [];

    for(let i = 0; i < dataGlobal.length; i++) {

        var thefactka = [];
        var thefactkm = [];
        var thecharimg = null;

        // Data yang dimasukkan ke dalam fakta
        var faktaIsDead = dataGlobal[i].status.isDead;
        var faktaIsMarried = dataGlobal[i].status.isMarried;
        var faktaKindergarten = dataGlobal[i].school.kindergarten;
        var faktaElementaryschool = dataGlobal[i].school.elementaryschool;
        var faktaJuniorhighschool = dataGlobal[i].school.juniorhighschool;
        var faktaSeniorhighschool = dataGlobal[i].school.seniorhighschool;
        var faktaNamalengkap = dataGlobal[i].name;
        var faktaTempattanggallahir = dataGlobal[i].birthday;
        var faktaKewarganegaraan = dataGlobal[i].contact.address.country;

        if (dataGlobal[i].photo.length >= 1) {
            thecharimg = dataGlobal[i].photo[0];
        }

        for(let thef = 0; thef < dataGlobal[i].otherfacts.public.length; thef++) {
            var topushthedata = dataGlobal[i].otherfacts.public[thef];
            thefactka.push(topushthedata.charAt(0).toLowerCase() + topushthedata.slice(1));
        }

        for(let thex = 0; thex < dataGlobal[i].otherfacts.possible.length; thex++) {
            var topushthedata = dataGlobal[i].otherfacts.possible[thex];
            thefactka.push(topushthedata.charAt(0).toLowerCase() + topushthedata.slice(1));
        }

        if (faktaIsDead == false) {
            thefactka.push("masih hidup");
        } else {
            thefactka.push("sudah meninggal dunia");
        }

        if (faktaIsMarried == true) {
            thefactka.push("sudah menikah");
        }

        if (faktaTempattanggallahir != "" && faktaTempattanggallahir != null ) {
            var tempatnyalahir = faktaTempattanggallahir.split(",")[0];
            let tahunlahir = faktaTempattanggallahir.slice(-4);
            let tahunlahirnyaadalahangka = /^\d{4}$/.test(tahunlahir);

            // thefactka.push(`lahir di ${tempatnyalahir}`);

            if (tahunlahirnyaadalahangka == true) {
                thefactka.push(`lahir pada tahun ${tahunlahir}`);
            }
        }

        if (faktaKindergarten != "" && faktaKindergarten != null ) {
            thefactka.push(`pernah bersekolah di ${faktaKindergarten}`);
        }

        if (faktaElementaryschool != "" && faktaElementaryschool != null ) {
            thefactka.push(`pernah bersekolah di ${faktaElementaryschool}`);
        }

        if (faktaJuniorhighschool != "" && faktaJuniorhighschool != null ) {
            thefactka.push(`pernah bersekolah di ${faktaJuniorhighschool}`);
        }

        if (faktaSeniorhighschool != "" && faktaSeniorhighschool != null ) {
            thefactka.push(`pernah bersekolah di ${faktaSeniorhighschool}`);
        }

        if (dataGlobal[i].family.child.length != 0 ) {
            thefactka.push(`mempunyai anak`);
        }

        if (faktaKewarganegaraan != "" && faktaKewarganegaraan != null ) {
            thefactka.push(`memiliki kewarganegaraan ${faktaKewarganegaraan}`);
        }

        if (faktaNamalengkap.includes("Putu")) {
            thefactka.push(`didalam namanya ada kata "Putu"`);
        } else if (faktaNamalengkap.includes("Wayan")) {
            thefactka.push(`didalam namanya ada kata "Wayan"`);
        } else if (faktaNamalengkap.includes("Made")) {
            thefactka.push(`didalam namanya ada kata "Made"`);
        } else if (faktaNamalengkap.includes("Kadek")) {
            thefactka.push(`didalam namanya ada kata "Kadek"`);
        } else if (faktaNamalengkap.includes("Komang")) {
            thefactka.push(`didalam namanya ada kata "Komang"`);
        } else if (faktaNamalengkap.includes("Ketut")) {
            thefactka.push(`didalam namanya ada kata "Ketut"`);
        } else if (faktaNamalengkap.includes("Nyoman")) {
            thefactka.push(`didalam namanya ada kata "Nyoman"`);
        }

        let hurufTerakhir = faktaNamalengkap.slice(-1);
        thefactka.push(`huruf terakhir dari nama lengkapnya adalah "${hurufTerakhir}"`);

        let kataPertama = faktaNamalengkap.split(" ")[0];
        if (kataPertama == "I") {
            thefactka.push(`di nama lengkapnya awalannya ada "${kataPertama}"`);
        } else if (kataPertama == "Ni") {
            thefactka.push(`di nama lengkapnya awalannya ada "${kataPertama}"`);
        }

        person.push({
            "name": faktaNamalengkap,
            "gender": dataGlobal[i].gender,
            "agama": dataGlobal[i].religion,
            "image": thecharimg,
            "fakta": thefactka,
            "kemungkinan": thefactkm
        });
    }

    console.log(person);
}

fetch("https://datadc.netlify.app/data/person/person.json")
    .then(response => response.json())
    .then(data => {
        dataGlobal = data.people;
        prosesData(dataGlobal);
    })
    .catch(error => console.error("Terjadi kesalahan:", error));


const pertanyaan = {
    "satudua": [
        {
            "pertanyaan": "Apakah dia perempuan?",
            "id": "gender",
            "value": "Perempuan"
        },
        {
            "pertanyaan": "Apakah dia agama Hindu?",
            "id": "agama",
            "value": "Hindu"
        }
    ]
};

var pertanyaansebelumnya1 = "ABC";
var pertanyaansebelumnya2 = "DEF";
var pertanyaannowstring;
var pertanyaan12id;
var randompersonindex;
var randompersondata;
var tempdatatodelete = [];
var pertanyaannowindex = 0;
var isFind = false;

var angkaAcakSebelumnya = 99;

function getRandomInt(max) {
    if (max <= 1) return 0; // Pastikan nilai max lebih dari 1

    let angkaAcak;
    do {
        angkaAcak = Math.floor(Math.random() * max);
    } while (angkaAcak === angkaAcakSebelumnya && max > 1);

    angkaAcakSebelumnya = angkaAcak;
    return angkaAcak;
}

function pertanyaan1dan2() {
    var randomIndex = getRandomInt(pertanyaan.satudua.length);
    pertanyaan12id = randomIndex;
    var pertanyaan1and2 = pertanyaan.satudua[randomIndex].pertanyaan;

    pertanyaannowstring = pertanyaan1and2;

    textquestion.textContent = pertanyaannowstring;

    pertanyaannowindex += 1;
    console.log(pertanyaannowstring);
}

function filterJawaban(jwb) {
    if (findingPerson()) {
        return;
    } else {
        if (pertanyaannowindex < 3) {

            if (jwb === "y") {
                console.log("Jawaban: Iya");
                var idpersoninjson = pertanyaan.satudua[pertanyaan12id].id;
                var valuepersoninjson = pertanyaan.satudua[pertanyaan12id].value;

                for (let i = person.length - 1; i >= 0; i--) {
                    var idnya = person[i][idpersoninjson];

                    if (idnya != valuepersoninjson) {
                        tempdatatodelete.push(i);
                    }
                }

            } else {
                console.log("Jawaban: Tidak");
                var idpersoninjson = pertanyaan.satudua[pertanyaan12id].id;
                var valuepersoninjson = pertanyaan.satudua[pertanyaan12id].value;

                for (let i = person.length - 1; i >= 0; i--) {
                    var idnya = person[i][idpersoninjson];

                    if (idnya == valuepersoninjson) {
                        tempdatatodelete.push(i);
                    }
                }
            }

            if (pertanyaan["satudua"].length > 1) {
                pertanyaan["satudua"].splice(pertanyaan12id, 1);
            } else {
                pertanyaan["satudua"] = [];
            }

            eliminationPeople();

            if (pertanyaannowindex == 1) {
                pertanyaan1dan2();
            } else {
                createQuestion();
            }

        } else if (pertanyaannowindex >= 3) {
            if (jwb === "y") {
                console.log("Jawaban: Iya");
                for (let i = person.length - 1; i >= 0; i--) {

                    let a = person[i].fakta;
                    let b = person[i].kemungkinan;
                    let x = person[randompersonindex].fakta[randompersondata];

                    if (a.includes(x) || b.includes(x)) {
                        console.log(`Mengamankan ${person[i].name}`);

                        /*
                        person = person.map(p => ({
                            ...p,
                            fakta: p.fakta.filter(f => f !== x)
                        }));
                        */

                    } else {
                        tempdatatodelete.push(i);
                    }
        
                }

            } else {
                console.log("Jawaban: Tidak");
                for (let i = person.length - 1; i >= 0; i--) {

                    let a = person[i].fakta;
                    let b = person[i].kemungkinan;
                    let x = person[randompersonindex].fakta[randompersondata];

                    if (a.includes(x) || b.includes(x)) {
                        tempdatatodelete.push(i);
                    } else {
                        console.log(`Mengamankan ${person[i].name}`);
                     
                        /*
                        person = person.map(p => ({
                            ...p,
                            fakta: p.fakta.filter(f => f !== x)
                        }));
                        */

                    }

                }

            }

            
            eliminationPeople();

        createQuestion();

        }
    }
}

function createQuestion() {
    if (findingPerson()) {
        return;
    } else {
        if (person.length === 0) {
            console.log("Tidak ada orang yang cocok dengan jawaban!");
            return;
        }
        
        randompersonindex = getRandomInt(person.length);
        
        if (person[randompersonindex].fakta.length === 0) {
            console.log(`Karakter ${person[randompersonindex].name} tidak memiliki fakta tersisa.`);
            return;
        }
        
        randompersondata = getRandomInt(person[randompersonindex].fakta.length);

        var stringofquestuion = person[randompersonindex].fakta[randompersondata];

        pertanyaannowstring = "Apakah karaktermu ini " + stringofquestuion + "?";

        
        if (pertanyaansebelumnya1 === pertanyaannowstring) {
            createQuestion();
            return;
        }

        // pertanyaansebelumnya2 = pertanyaansebelumnya1;
        pertanyaansebelumnya1 = pertanyaannowstring;

        textquestion.textContent = pertanyaannowstring;

        pertanyaannowindex += 1;
        console.log(pertanyaannowstring);
        console.log(person);
    }
}

function eliminationPeople() {
    if (tempdatatodelete.length != 0) {
        person = person.filter((_, index) => !tempdatatodelete.includes(index));
        console.log(person);

        tempdatatodelete = [];

        if (findingPerson()) {
            console.log(`SAYA MEMIKIRKAN: ${person[0].name}`);

            document.getElementById("btn-iya").textContent = "Benar";
            document.getElementById("btn-tidak").textContent = "Salah";

            isFind = true;

            if  (person[0].image != null) {
                document.getElementById('forimg').innerHTML = `<img src="${person[0].image}" style="width: 200px; height: 200px; object-fit: cover; object-position: center 10%; border-radius: 6px" alt="Image">`;
            }

            textquestion.textContent = `SAYA MEMIKIRKAN:\n${person[0].name}`;
        }
    } 
}

function findingPerson() {
    if (person.length <= 1) {
        return true;
    } else {
        return false;
    }
}

function clickiya() {
    if (isFind == true) {
        document.getElementById("btn-tidak").style.display = "none";
        document.getElementById("btn-iya").textContent = "Coba Lagi";
        isFind = "tryagain";
    } else if (isFind == "tryagain") {
        window.location.href = "index.html";
    } else {
        filterJawaban("y");
    }
}

function clicktidak() {
    if (isFind == true) {
        alert("Jika karakter tebakanmu tidak ada, tidak ditemukan atau jawabannya salah, mohon untuk tambahkan data melalui link yang sudah disedikan di halaman paling bawah. Jangan lupakan juga cantumkan nama karakternya ya!");
    } else {
        filterJawaban("n");
    }
}