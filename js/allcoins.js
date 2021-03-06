$(document).ready(async function(){
    let url = 'https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=410ac1faa58c9dce544c';
    let response1 = await fetch(url);
    let data1 = await response1.json();
    let rate = data1.USD_INR;
    var card = document.querySelector('.main');
    fetch('http://127.0.0.1:5000/getcoins?coins=100',{
        method: 'GET',
    }).then(function(response){
        return response.json();
    }).then(async function(data) {
        for(let i=0; i<data.length; i++){
            let element = data[i];
            let anchor = document.createElement('a');
            anchor.setAttribute('href', '/coin.html?uuid='+element.uuid);
            anchor.setAttribute('class', 'anchor-coin');
            let coinListItem = document.createElement('div');
            coinListItem.setAttribute('class', 'coin-list-item');
            let coinImage = document.createElement('img');
            coinImage.setAttribute('class', 'icon-img');
            coinImage.setAttribute('src', element.iconUrl);
            let coinName = document.createElement('h3');
            coinName.setAttribute('class', 'coin-name');
            coinName.style.color = element.color;
            coinName.innerHTML = element.name + " " + element.symbol;
            let coinPrice = document.createElement('h3');
            coinPrice.setAttribute('class', 'price');
            coinPrice.innerHTML = '&#8377;' + (Number(element.price) * rate);
            let currentSituation = document.createElement('div');
            currentSituation.setAttribute('class', 'current-situation');
            let icon = document.createElement('i');
            if(Number.parseFloat(element.change)<0){
                icon.setAttribute('class', 'fas fa-arrow-down');
                currentSituation.style.color = 'red';
            }
            else {
                icon.setAttribute('class', 'fas fa-arrow-up');
                currentSituation.style.color = 'green';
            }
            let h3 = document.createElement('h3');
            h3.innerHTML = element.change;
            currentSituation.appendChild(icon);
            currentSituation.appendChild(h3);
            coinListItem.appendChild(coinImage);
            coinListItem.appendChild(coinName);
            coinListItem.appendChild(coinPrice);
            coinListItem.appendChild(currentSituation);
            anchor.appendChild(coinListItem);
            card.appendChild(anchor);
        }
    });
});