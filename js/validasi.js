document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const judulCatatan = form.elements.judul;
    const isiCatatan = form.elements.isi_catatan;

    const handleFocus = (event, message) => {
        const getAria = event.target.getAttribute('aria-describedby');
        const ariaElement = getAria ? document.getElementById(getAria) : null;

        if (ariaElement) {
            ariaElement.classList.replace('hidden', 'visible');
            event.target.setCustomValidity(message);
        }
    };

    judulCatatan.addEventListener('focus', (event) => handleFocus(event, 'Judul Wajib Diisi!'));
    isiCatatan.addEventListener('focus', (event) => handleFocus(event, 'Isi catatan tidak boleh kosong!'));

    const handleValidation = (event, minLength, maxLength, emptyMessage, minLengthMessage, maxLengthMessage) => {
        event.target.setCustomValidity('');

        if (event.target.validity.valueMissing) {
            event.target.setCustomValidity(emptyMessage);
        } else if (event.target.validity.tooShort) {
            event.target.setCustomValidity(minLengthMessage);
        } else if (event.target.validity.tooLong) {
            event.target.setCustomValidity(maxLengthMessage);
        }
    };

    const validasiJudul = (event) => handleValidation(event, 6, 50, 'Judul wajib diisi!', 'Judul minimal 6 karakter!', 'Judul maksimal 50 karakter!');
    const validasiIsi = (event) => handleValidation(event, 10, null, 'Isi catatan tidak boleh kosong!', 'Isi catatan minimal 10 karakter!', '');

    judulCatatan.addEventListener('change', validasiJudul);
    judulCatatan.addEventListener('invalid', validasiJudul);
    isiCatatan.addEventListener('change', validasiIsi);
    isiCatatan.addEventListener('invalid', validasiIsi);

    const handleBlur = (event, validMessage) => {
        const isValid = event.target.validity.valid;
        const errorMessage = event.target.validationMessage;

        const getAria = event.target.getAttribute('aria-describedby');
        const ariaElement = getAria ? document.getElementById(getAria) : null;

        if (ariaElement) {
            ariaElement.setAttribute('style', `color: ${isValid ? 'green' : 'red'};`);
            ariaElement.textContent = isValid ? validMessage : errorMessage;
        }
    };

    judulCatatan.addEventListener('blur', (event) => handleBlur(event, 'Judul Valid!'));
    isiCatatan.addEventListener('blur', (event) => handleBlur(event, 'Isi catatan valid!'));

    const charCount = document.getElementById('sisa-karakter');
    const maxChars = 50;

    judulCatatan.addEventListener('input', () => {
        const remainingChars = maxChars - judulCatatan.value.length;
        charCount.textContent = `Sisa Karakter : ${remainingChars} `;
    });

    const charCount2 = document.getElementById('sisa-karakter-isi');
    const minChars = 10;

    isiCatatan.addEventListener('input', () => {
        const remainingChars = minChars - isiCatatan.value.length;
        charCount2.textContent = remainingChars <= 0 ? `` : `Kurang ${remainingChars} karakter lagi`;
    });

    form.addEventListener('submit', (event) => event.preventDefault());


});
