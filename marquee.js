let marquee = document.getElementById("marquee");
const marqueeApi = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse";

async function getMarquee() {
    let res = await fetch(marqueeApi);
    let data = await res.json();
    for (let i = 0; i < 500; i++) {
        let symbol = data[i].symbol;
        let change = data[i].changesPercentage;
        let symbolEle = document.createElement("p");
        symbolEle.classList.add("symbolEle");
        symbolEle.textContent = symbol;
        let changeEle = document.createElement("p");
        changeEle.classList.add("changeEle");
        if (change > 0) {
            changeEle.classList.add("green");
        }
        changeEle.textContent = "(" + change +"%"+ ")";
        let stock = document.createElement("div");
        stock.classList.add("marquee-ticker");
        stock.appendChild(symbolEle);
        stock.appendChild(changeEle);
        marquee.appendChild(stock);
    }
}