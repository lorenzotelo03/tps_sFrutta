google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
document.getElementById("title").innerHTML = url;
document.getElementById("wikipedia").href = 'https://www.wikipedia.com/wiki/' + url;

async function getFruitData() {
    const response = await fetch('https://lore-images.herokuapp.com/fruit/' + url);
    var fruitData = await response.json();
    if ("error" in fruitData) {
        window.location.href = '/front-end/404.html';

    }
    return fruitData;
}
async function drawChart() {
    var fruitData = await getFruitData();
    var data = google.visualization.arrayToDataTable([
        ['Nutritional values', 'grams over 100 grams'],
        ['Fat', fruitData.nutritions.fat],
        ['Sugar', fruitData.nutritions.sugar],
        ['Protein', fruitData.nutritions.protein],
        ['Carbohydrates', fruitData.nutritions.carbohydrates]
    ]);
    var options = {
        title: 'Fruit datas'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}