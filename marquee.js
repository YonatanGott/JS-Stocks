
class Marquee {

    static createTickerItem(symbol, change) {
        let li = document.createElement("li");
        li.classList.add("marquee-list");
        let symbolEle = document.createElement("p");
        let changeEle = document.createElement("p");
        symbolEle.classList.add("symbolEle");
        changeEle.classList.add("changeEle");
        if (change > 0) {
            changeEle.classList.add("green");
        }
        li.appendChild(symbolEle);
        li.appendChild(changeEle);
        symbolEle.textContent = symbol;
        changeEle.textContent = "(" + change + "%" + ")";
        return li;
    }

    constructor(element) {
        this.marqueeEle = element;
        this.symbolList = [];
        this.changeList = [];
    }

    async getMarquee() {
        const marqueeApi = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse";
        let res = await fetch(marqueeApi);
        let data = await res.json();
        for (let i = 0; i < 1000; i++) {
            let symbol = data[i].symbol;
            let change = data[i].changesPercentage;
            this.symbolList.push(symbol);
            this.changeList.push(change);
            this.marqueeEle.appendChild(Marquee.createTickerItem(symbol, change));
        }
    }

}