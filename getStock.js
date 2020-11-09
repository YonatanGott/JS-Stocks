const serverBase = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com';

document.getElementById("btn").addEventListener('click', showSpinner);

function showSpinner() {
    let spinner = document.getElementById("spinner");
    spinner.classList.add('show');
    setTimeout(function () { spinner.classList.remove('show') }, 600);
    getStock()
}

async function getStock(){
    let stocksBase = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=';
    let stockHead = '&limit=10&exchange=NASDAQ'
    let query = document.getElementById("search").value;
    let stockSearch = stocksBase+query+stockHead;
    let res = await fetch(stockSearch);
    let data = await res.json();
    let resArray = [];
    for ( let i = 0; i < data.length; i++){
        let stockRes = data[i];
        let name = stockRes.name;
        let symbol = stockRes.symbol;
        let resItem = name+" "+symbol.bold();
        resArray.push(resItem);
        let listItem = document.createElement('li');
        listItem.classList.add('list'+i);
        let under = document.createElement('hr');
        let link = document.createElement('a');
        link.setAttribute('href', "/company.html?symbol="+symbol);
        link.innerHTML = resItem;
        listItem.appendChild(link);
        document.getElementById('results').appendChild(listItem);
        document.getElementById('results').appendChild(under);
    }

}