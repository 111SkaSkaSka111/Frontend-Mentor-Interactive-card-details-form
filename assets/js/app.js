document.addEventListener("DOMContentLoaded", function () {
    const submit = document.getElementById("submit");

    const iCardHolderName = document.getElementById("cardholder");
    const iCardNumber = document.getElementById("cardnumber");
    const expMonth = document.getElementById("expmonth");
    const expYear = document.getElementById("expyear");
    const cvc = document.getElementById("cvc");

    const cardName = document.querySelector(".card___name");
    const cardNumber = document.querySelector(".card__number");
    const cardExp = document.querySelector(".card___expdate");
    const cardCvc = document.querySelector(".card__cvc");

    const falseCardNumber = document.getElementById("false_cardnumber");
    const falseExp = document.getElementById("false_exp");
    const falseCvc = document.getElementById("false_cvc");
    const card = document.getElementById("card");
    const complete = document.querySelector(".complete");

    submit.addEventListener("click", function (e) {
        e.preventDefault();

        // Panggil fungsi untuk melakukan validasi dan menampilkan kartu
        validateAndDisplayCard();
    });

    // ------------------------------------------function---------------------------------------------\\

    // Fungsi untuk melakukan validasi dan menampilkan kartu
    function validateAndDisplayCard() {
        // Ambil iCardHolderName.value
        const holderName = iCardHolderName.value;
        // Masukkan iCardHolderName.value ke cardName
        cardName.textContent = holderName;

        // Ambil iCardNumber.value
        const cardNum = iCardNumber.value;
        // Cek value max 16 char dan number only
        if (validateCardNumber(cardNum)) {
            // Jika benar, tampilkan nomor kartu yang valid
            displayValidCardNumber(cardNum);
        } else {
            // Jika salah atau value kosong, tampilkan pesan kesalahan
            displayInvalidCardNumber();
            // Tambahkan kelas "active" pada input yang tidak valid
            iCardNumber.classList.add("active");
        }

        // Ambil expMonth.value dan expYear.value
        const month = expMonth.value;
        const year = expYear.value;
        // Validasi dan tampilkan expMonth dan expYear
        validateAndDisplayExpDate(month, year);

        // Ambil cvc.value
        const cvcValue = cvc.value;
        // Validasi dan tampilkan cvc
        validateAndDisplayCvc(cvcValue);

        // Set tampilan card dan complete
        if (isAllValid()) {
            // Jika semua valid, tampilkan tampilan kartu
            displayCardView();
        } else {
            // Jika ada yang tidak valid, tampilkan tampilan selesai
            displayCompleteView();
        }
    }

    // ------------------------------------------function on function---------------------------------------------\\

    // Fungsi untuk validasi nomor kartu kredit
    function validateCardNumber(cardNum) {
        return /^\d{16}$/.test(cardNum);
    }

    // Fungsi untuk menampilkan nomor kartu yang valid
    function displayValidCardNumber(cardNum) {
        // Format dan tampilkan nomor kartu dengan spasi setiap 4 karakter
        const formattedCardNum = cardNum.replace(/(.{4})/g, "$1 ");
        cardNumber.textContent = formattedCardNum.trim();
        falseCardNumber.classList.remove("active");
    }

    // Fungsi untuk menampilkan pesan kesalahan nomor kartu
    function displayInvalidCardNumber() {
        falseCardNumber.classList.add("active");
    }

    // Fungsi untuk validasi dan menampilkan tanggal kedaluwarsa
    function validateAndDisplayExpDate(month, year) {
        // Ubah input bulan menjadi angka
        const numericMonth = parseInt(month, 10);

        if (numericMonth >= 1 && numericMonth <= 12 && year !== "") {
            // Jika input bulan valid (1-12) dan tahun tidak kosong
            // Gabungkan dan tampilkan expMonth dan expYear
            cardExp.textContent = `${numericMonth}/${year}`;
            falseExp.classList.remove("active");
            // Hapus kelas "active" jika valid
            expMonth.classList.remove("active");
            expYear.classList.remove("active");
        } else {
            // Jika salah satu input tidak valid, tampilkan pesan kesalahan
            falseExp.classList.add("active");

            // Tambahkan kelas "active" pada expMonth atau expYear yang kosong
            if (month === "") {
                expMonth.classList.add("active");
            } else {
                expMonth.classList.remove("active");
            }

            if (year === "") {
                expYear.classList.add("active");
            } else {
                expYear.classList.remove("active");
            }
        }
    }

    // Fungsi untuk validasi dan menampilkan CVC
    function validateAndDisplayCvc(cvcValue) {
        if (cvcValue === "") {
            // Jika value kosong, tampilkan pesan kesalahan
            falseCvc.classList.add("active");
            cvc.classList.add("active");
        } else {
            // Jika valid, tampilkan nilai CVC
            cardCvc.textContent = cvcValue;
            falseCvc.classList.remove("active");
        }
    }

    // Fungsi untuk mengecek apakah semua input valid
    function isAllValid() {
        return !falseCardNumber.classList.contains("active") && !falseExp.classList.contains("active") && !falseCvc.classList.contains("active");
    }

    // Fungsi untuk menampilkan tampilan kartu
    function displayCardView() {
        card.style.display = "none";
        complete.style.display = "block";
    }

    // Fungsi untuk menampilkan tampilan selesai
    function displayCompleteView() {
        card.style.display = "flex";
        complete.style.display = "none";
    }
});
