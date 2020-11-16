
class SearchResults {

    constructor(element) {
        this.resultEle = element;
        this.symbolList = [];
        this.changeList = [];
        this.nameList = [];
        this.priceList = [];
        this.imageList = [];
        this.query=[];
        this.resultEle.appendChild(SearchResults.createResultBar());
    }

    static createResultBar() {
        let row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("results-row");
        let col = document.createElement("div");
        col.classList.add("col-auto");
        col.classList.add("results-col");
        let resultList = document.createElement("div");
        resultList.classList.add("resultList");
        resultList.setAttribute("id", "resultList");
        let results = document.createElement("ul");
        results.classList.add("results");
        results.setAttribute("id", "results");
        resultList.appendChild(results);
        let loader = document.createElement("div");
        loader.classList.add("spinner-border");
        loader.setAttribute("id", "spinner");
        col.appendChild(resultList);
        col.appendChild(loader);
        row.appendChild(col);
        return row;
    }

    static createResultList(name, symbol, price, changes, image) {
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
        symbolEle.classList.add("symbolsEle");
        symbolEle.textContent = symbol;
        let priceEle = document.createElement("p");
        priceEle.classList.add("priceEle");
        priceEle.textContent = "$" + price;
        let changeEle = document.createElement("p");
        changeEle.classList.add("changeEle");
        if (changes > 0) {
            changeEle.classList.add("green");
        }
        changeEle.textContent = "(" + changes + ")";
        link.appendChild(nameEle);
        link.appendChild(symbolEle);
        link.appendChild(priceEle);
        link.appendChild(changeEle);
        listItem.appendChild(link);
        listItem.appendChild(imgItem);
        document.getElementById("results").appendChild(listItem);
        document.getElementById("results").appendChild(under);
        return document.getElementById("results");
    }


    async onSearch() {
        document.getElementById("btn").addEventListener("click", function () {
            this.query = document.getElementById("search").value;
            console.log(this.query);
            SearchResults.getStock(this.query);
        });
    }
    static async getStock(query) {
        SearchResults.clearRes();
        let stocksBase =
            "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=";
        let stockHead = "&limit=10&exchange=NASDAQ";
        let stockSearch = stocksBase + query + stockHead;
        let symbolList = [];
        let res = await fetch(stockSearch);
        let data = await res.json();
        for (let i = 0; i < data.length; i++) {
            let stockRes = data[i];
            let symbol = stockRes.symbol;
            symbolList.push(symbol);
        }
        let symbolBatch = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote/" + symbolList.join();
        let resSymbol = await fetch(symbolBatch);
        let dataSymbol = await resSymbol.json();
        for (let j = 0; j < dataSymbol.length; j++) {
            let name = dataSymbol[j].name;
            let symbol = dataSymbol[j].symbol;
            let price = dataSymbol[j].price;
            let changes = dataSymbol[j].changesPercentage;
            let image = "https://financialmodelingprep.com/image-stock/" + symbol + ".jpg";
            SearchResults.createResultList(name, symbol, price, changes, image);
        }
        SearchResults.matchRes(query);
    }


    static clearRes() {
        let clear = document.getElementsByClassName('list');
        while (clear[0]) {
            clear[0].parentNode.removeChild(clear[0]);
        }
    }

    static matchRes(query) {
        let queryCase = new RegExp('('+query+')',"ig");
        let queryNames = document.querySelectorAll(".nameEle");
        let querySymbols = document.querySelectorAll(".symbolsEle");
        let highlight = '<span class="highlight">'+query+'</span>';
        for (let l = 0; l < queryNames.length; l++) {
            let rePlace = queryNames[l].innerHTML.replace(queryCase, highlight);
            queryNames[l].innerHTML =  rePlace;
        }
        for (let j = 0; j < querySymbols.length; j++) {
            let rePlace = querySymbols[j].innerHTML.replace(queryCase, highlight);
            querySymbols[j].innerHTML = rePlace;
        }
    }
}