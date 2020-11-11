const serverBase =
    "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com";

document.getElementById("btn").addEventListener("click", showSpinner);

function showSpinner() {
    let spinner = document.getElementById("spinner");
    spinner.classList.add("show");
    setTimeout(function () {
        spinner.classList.remove("show");
    }, 600);
    clearRes();
    getStock();
}

async function getStock() {
    let stocksBase =
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=";
    let stockHead = "&limit=10&exchange=NASDAQ";
    let query = document.getElementById("search").value;
    let stockSearch = stocksBase + query + stockHead;
    let res = await fetch(stockSearch);
    let data = await res.json();
    for (let i = 0; i < data.length; i++) {
        let stockRes = data[i];
        let name = stockRes.name;
        let symbol = stockRes.symbol;
        let profile = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" + symbol;
        let res2 = await fetch(profile);
        let data2 = await res2.json();
        let price = data2.profile.price;
        let changes = data2.profile.changesPercentage;
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
        let priceEle = document.createElement("p");
        priceEle.classList.add("priceEle");
        priceEle.textContent = "$"+price;
        let changeEle = document.createElement("p");
        changeEle.classList.add("changeEle");
        if (changes.indexOf("-") == -1) {
            changeEle.classList.add("green");
        }
        changeEle.textContent = changes;
        link.appendChild(nameEle);
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
