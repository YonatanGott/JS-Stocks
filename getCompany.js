let urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.get('symbol');
let profile = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" + symbol;
let history = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/" + symbol + "?serietype=line"

async function getCompany() {
    let res = await fetch(profile);
    let data = await res.json();
    let name = data.profile.companyName;
    let description = data.profile.description;
    let price = data.profile.price;
    let changes = data.profile.changesPercentage;
    let image = data.profile.image;
    let website = data.profile.website;

    if (changes.indexOf("-") == -1) {
        document.getElementById("company-change").classList.add("green");
        document.getElementById("company-change").textContent = changes;
    }
    else {
        document.getElementById("company-change").classList.add("red");
        document.getElementById("company-change").textContent = changes;
    }

    document.getElementById("company-name").textContent = name;
    document.getElementById("company-link").setAttribute("href", website);
    document.getElementById("company-price").textContent = "$" + price;
    document.getElementById("company-change").textContent = changes;
    document.getElementById("company-des").textContent = description;
    document.getElementById("company-img").setAttribute("src", image);

    let res2 = await fetch(history);
    let data2 = await res2.json();
    let histArray = data2.historical;
    let date = [];
    let close = [];
    for (let i = 0; i < histArray.length; i += 20) {
        date.push(histArray[i].date);
        close.push(histArray[i].close);
    }
    let ctx = document.getElementById('chart').getContext('2d');
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [{
                label: 'Stock Price History',
                backgroundColor: 'SteelBlue',
                borderColor: 'SteelBlue',
                data: close,
                pointRadius: 0
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        reverse: true,
                    }
                }]
            }
        }
    });
    document.getElementById("loader").style.display = 'none';
}