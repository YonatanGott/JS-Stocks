
class SearchForm {

    constructor(element) {
        this.searchEle = element;
        this.searchEle.appendChild(SearchForm.createSearchBar());
    }
    static createSearchBar() {
        let row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("search-row");
        let col = document.createElement("div");
        col.classList.add("col-auto");
        col.classList.add("search-col");
        let inputG = document.createElement("div");
        inputG.classList.add("input-group");
        inputG.classList.add("input-group-lg");
        let inputB = document.createElement("input");
        inputB.classList.add("searchBar");
        inputB.setAttribute("type", "text");
        inputB.setAttribute("id", "search");
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.setAttribute("id", "btn");
        button.textContent = "Search";
        inputG.appendChild(inputB);
        inputG.appendChild(button);
        col.appendChild(inputG);
        row.appendChild(col);
        return row;
    }

    async onSearch() {
        document.getElementById("btn").addEventListener("click", function () {
            let query = document.getElementById("search").value;
            console.log(query);
            return query;
        });
    }
}
