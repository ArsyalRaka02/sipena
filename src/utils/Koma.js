export default {
    format(angka) {
        if (angka == null) {
            return "0";
        }

        let ori = parseFloat(angka);

        angka = parseInt(angka) + "";

        let sisaDecimal = 0;
        if (ori > angka) {
            sisaDecimal = Math.floor((ori - angka) * 100);
        }

        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        if (sisaDecimal) {
            return rupiah + sisaDecimal;
        } else {
            return rupiah ;
        }
    }
};