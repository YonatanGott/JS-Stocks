const serverBase = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com';

document.getElementById("btn").addEventListener('click', showSpinner);

function showSpinner() {
    let spinner = document.getElementById("spinner");
    spinner.classList.add('show');
    setTimeout(function () { spinner.classList.remove('show') }, 600);
    let results = document.getElementById("results");
    let i = results.childNodes.length;
    console.log(i);
    while( i > 1 ){
        results.removeChild(results.childNodes[i]);
        i--;
        }
    getStock()
}

async function getStock(){
    let stocksBase = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=';
    let stockHead = '&limit=10&exchange=NASDAQ'
    let query = document.getElementById("search").value;
    let stockSearch = stocksBase+query+stockHead;
    let res = await fetch(stockSearch);
    console.log(res);
    let data = await res.json();
    console.log(data);
    console.log(data.length);
    for ( let i = 0; i < data.length; i++){
        let stockRes = data[i];
        let name = stockRes.name;
        let symbol = stockRes.symbol;
        let listItem = document.createElement('li');
        listItem.classList.add('list'+i);
        listItem.textContent = name +" "+symbol;
        let under = document.createElement('hr');
        document.getElementById('results').appendChild(listItem);
        document.getElementById('results').appendChild(under);
    }

}