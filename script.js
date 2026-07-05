// ===============================
// VARIABEL GLOBAL
// ===============================

let antrean = JSON.parse(localStorage.getItem("antrean")) || [];
let riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
let nomor = parseInt(localStorage.getItem("nomor")) || 1;

// ===============================
// SIMPAN DATA
// ===============================

function simpanData(){

    localStorage.setItem("antrean", JSON.stringify(antrean));
    localStorage.setItem("riwayat", JSON.stringify(riwayat));
    localStorage.setItem("nomor", nomor);

}

// ===============================
// TAMPILKAN ANTREAN
// ===============================

function tampilkanAntrean(){

    let tabel = document.getElementById("daftarAntrean");

    tabel.innerHTML = "";

    if(antrean.length==0){

        tabel.innerHTML = `
        <tr>
            <td colspan="4">Belum Ada Antrean</td>
        </tr>
        `;

        return;

    }

    antrean.forEach((item,index)=>{

        tabel.innerHTML += `
        <tr>

            <td>A${String(item.nomor).padStart(3,'0')}</td>

            <td>${item.nama}</td>

            <td>${item.berat} Kg</td>

            <td>${item.layanan}</td>

        </tr>
        `;

    });

}

// ===============================
// TAMBAH ANTREAN
// ===============================

function tambahAntrean(){

    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let berat = parseFloat(document.getElementById("berat").value);

    let layanan = document.getElementById("layanan");

    let metode = document.getElementById("metode").value;

    if(nama=="" || hp=="" || isNaN(berat)){

        alert("Lengkapi data terlebih dahulu");

        return;

    }

    let harga = parseInt(layanan.value);

    let total = harga*berat;

    let diskon = 0;

    if(berat>=10){

        diskon = total*0.10;

    }

    let bayar = total-diskon;

    antrean.push({

        nomor : nomor,

        nama : nama,

        hp : hp,

        berat : berat,

        layanan : layanan.options[layanan.selectedIndex].text,

        metode : metode,

        total : bayar,

        status : "Belum Dibayar"

    });

    nomor++;

    simpanData();

    tampilkanAntrean();

    alert("Pelanggan berhasil masuk antrean.");

    document.getElementById("nama").value="";
    document.getElementById("hp").value="";
    document.getElementById("berat").value="";

}

// ===============================
// LAYANI ANTREAN FIFO
// ===============================

function layaniAntrean(){

    if(antrean.length==0){

        alert("Antrean kosong");

        return;

    }

    let pelanggan = antrean.shift();

    document.getElementById("no").innerHTML =
    "A"+String(pelanggan.nomor).padStart(3,'0');

    document.getElementById("hasilNama").innerHTML =
    pelanggan.nama;

    document.getElementById("hasilHP").innerHTML =
    pelanggan.hp;

    document.getElementById("hasilBerat").innerHTML =
    pelanggan.berat+" Kg";

    document.getElementById("hasilLayanan").innerHTML =
    pelanggan.layanan;

    document.getElementById("hasilMetode").innerHTML =
    pelanggan.metode;

    document.getElementById("hasilTotal").innerHTML =
    "Rp "+pelanggan.total.toLocaleString("id-ID");

    if(pelanggan.metode=="QRIS"){

        document.getElementById("qrisBox").style.display="block";

        document.getElementById("status").className="badge bg-danger";

        document.getElementById("status").innerHTML="Menunggu Pembayaran";

    }else{

        document.getElementById("qrisBox").style.display="none";

        document.getElementById("status").className="badge bg-success";

        document.getElementById("status").innerHTML="Lunas";

        pelanggan.status="Lunas";

        riwayat.push(pelanggan);

    }

    simpanData();

    tampilkanAntrean();

    tampilkanPendapatan();

}

// ===============================
// QRIS
// ===============================

function konfirmasiQRIS(){

    document.getElementById("qrisBox").style.display="none";

    document.getElementById("status").className="badge bg-success";

    document.getElementById("status").innerHTML="Lunas";

    let transaksi={

        nomor:document.getElementById("no").innerHTML,

        nama:document.getElementById("hasilNama").innerHTML,

        hp:document.getElementById("hasilHP").innerHTML,

        berat:document.getElementById("hasilBerat").innerHTML,

        layanan:document.getElementById("hasilLayanan").innerHTML,

        metode:"QRIS",

        total:document.getElementById("hasilTotal").innerHTML,

        status:"Lunas"

    };

    riwayat.push(transaksi);

    simpanData();

    tampilkanPendapatan();

    alert("Pembayaran QRIS Berhasil");

}

// ===============================
// TOTAL PENDAPATAN
// ===============================

function tampilkanPendapatan(){

    let total=0;

    riwayat.forEach(item=>{

        if(typeof item.total==="number"){

            total += item.total;

        }else{

            total += parseInt(
                item.total.replace(/[^\d]/g,"")
            );

        }

    });

    if(document.getElementById("pendapatan")){

        document.getElementById("pendapatan").innerHTML=
        "Rp "+total.toLocaleString("id-ID");

    }

}

// ===============================
// CETAK STRUK
// ===============================

function cetakStruk(){

    window.print();

}

// ===============================
// RESET DATA
// ===============================

function resetData(){

    if(confirm("Hapus semua data?")){

        localStorage.clear();

        antrean=[];

        riwayat=[];

        nomor=1;

        tampilkanAntrean();

        tampilkanPendapatan();

    }

}

// ===============================
// LOAD
// ===============================

tampilkanAntrean();

tampilkanPendapatan();