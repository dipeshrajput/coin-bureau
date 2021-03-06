const ctx = document.getElementById('myChart');
$(document).ready(async function(){
    let url = 'https://free.currconv.com/api/v7/convert?q=USD_INR&compact=ultra&apiKey=410ac1faa58c9dce544c';
    let response1 = await fetch(url);
    let data1 = await response1.json();
    let rate = data1.USD_INR;
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('uuid');
    fetch('http://127.0.0.1:5000/getcoindetail?uuid='+myParam,{
        method: 'GET',
    }).then(function(response){
        return response.json();
    }).then(async function(data) {
        let img, name, price, change, alltimehigh, dateofAlltimehigh, marketCap, website, description;
        img = document.getElementById('coinIcon');
        name = document.getElementById('name');
        price = document.getElementById('price');
        change = document.getElementById('current-situation');
        description = document.getElementById('description');
        alltimehigh = document.getElementById('all-time-high');
        dateofAlltimehigh = document.getElementById('all-time-high-timestamp');
        marketCap = document.getElementById('market-cap');
        website = document.getElementById('website');
        img.setAttribute('src', data.iconUrl);
        name.innerHTML = data.name + " - " + data.symbol;
        name.style.color = data.color;
        price.style.color = data.color;
        price.innerHTML = '&#8377; ' + (Number.parseFloat(data.price) * rate);
        if(Number.parseFloat(data.change) > 0){
            change.innerHTML = '&#8593; ' + data.change;
            change.style.color = 'green';
        }
        else{
            change.innerHTML = '&#8595; ' + data.change;
            change.style.color = 'red';
        }
        alltimehigh.innerHTML = 'All time high: &#8377 ' + (Number.parseFloat(data.allTimeHigh.price) * rate);
        dateofAlltimehigh.innerHTML = new Date(data.allTimeHigh.timestamp)*1000.toDateString();
        marketCap.innerHTML = 'Market Cap: &#8377 ' + (Number.parseFloat(data.marketCap) * rate);
        website.setAttribute('href', data.websiteUrl);
        description.innerHTML = data.description;
        let plotarray = data.sparkline.map(function(item){
            return Number.parseFloat(item)*rate;
        });
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: plotarray,
                datasets: [{
                    label: data.name,
                    backgroundColor: data.color,
                    borderColor: data.color,
                    data: plotarray,
                }]
            },
        });
    });
});