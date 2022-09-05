document.addEventListener('DOMContentLoaded', () => {
    //고객문의 국가선택 select
    const selectDrop = document.querySelector('#sel02');

    fetch('https://restcountries.com/v2/all').then(res => {
        return res.json();
    }).then(data => {
        let output = "";
        data.forEach(country => {
            output += `<option value ="${country.name}">${country.name}</option>`;
        })

        selectDrop.innerHTML = output;
    }).catch(err => {
        console.log(err);
    })
});