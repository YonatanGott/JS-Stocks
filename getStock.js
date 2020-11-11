const serverBase =
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com";

document.getElementById("btn").addEventListener("click", showSpinner);

function showSpinner() {
    let spinner = document.getElementById("spinner");
    spinner.classList.add("show");
    clearRes();
    getStock();
    setTimeout(function () {
        spinner.classList.remove("show");
    }, 600);
    
}

async function getStock() {
    let stocksBase =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=";
    let stockHead = "&limit=10&exchange=NASDAQ";
    let query = document.getElementById("search").value;
    let stockSearch = stocksBase + query + stockHead;
    let arraySymbol = [];
    let res = await fetch(stockSearch);
    let data = await res.json();
    for (let i = 0; i < data.length; i++) {
        let stockRes = data[i];
        let symbol = stockRes.symbol;
        arraySymbol.push(symbol);
    }
    let symbolBatch = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/"+arraySymbol.join();
    let resSymbol = await fetch(symbolBatch);
    let dataSymbol = await resSymbol.json();
    for ( let j = 0; j < dataSymbol.length; j++){
        let name = dataSymbol[j].name;
        let symbol = dataSymbol[j].symbol;
        let price = dataSymbol[j].price;
        let changes= dataSymbol[j].changesPercentage;
        let image = "https://financialmodelingprep.com/image-stock/" + symbol + ".jpg";
        let imgItem = document.createElement("img");
        imgItem.setAttribute("src", image);
        let listItem = document.createElement("li");
        listItem.classList.add("list");
        let under = document.createElement("hr");
        under.classList.add("list");
        let link = document.createElement("a");
        link.setAttribute("href", "/company.html?symbol=" + symbol);
        let nameEle = document.createElement("p");
        nameEle.classList.add("nameEle");
        nameEle.textContent = name;
        let symbolEle = document.createElement("p");
        symbolEle.classList.add("symbolEle");
        symbolEle.textContent = symbol;
        let priceEle = document.createElement("p");
        priceEle.classList.add("priceEle");
        priceEle.textContent = "$"+price;
        let changeEle = document.createElement("p");
        changeEle.classList.add("changeEle");
        if (changes > 0 ) {
            changeEle.classList.add("green");
        }
        changeEle.textContent ="("+changes+")";
        link.appendChild(nameEle);
        link.appendChild(symbolEle);
        link.appendChild(priceEle);
        link.appendChild(changeEle);
        listItem.appendChild(link);
        listItem.appendChild(imgItem);
        document.getElementById("results").appendChild(listItem);
        document.getElementById("results").appendChild(under);
    }
}

function clearRes() {
    let clear = document.getElementsByClassName('list');
    while (clear[0]) {
        clear[0].parentNode.removeChild(clear[0]);
    }
}
