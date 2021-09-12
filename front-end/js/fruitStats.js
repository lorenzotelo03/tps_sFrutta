google.load("visualization", "1", { packages: ["corechart", "table"] });
// google.setOnLoadCallback(drawSort);


let fruits = [];

async function fetchFruitJSON() {
    const response = await fetch('https://lore-images.herokuapp.com/fruit/all');
    fruits = await response.json();
    drawSort()
}

function drawSort() {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Carbohydrates');
    data.addColumn('number', 'Protein');
    data.addColumn('number', 'fat');
    data.addColumn('number', 'calories');
    data.addColumn('number', 'sugar');

    data.addRows(fruits.length);

    for (let i = 0; i < fruits.length; i++) {
        data.setCell(i, 0, fruits[i].name);
        data.setCell(i, 1, fruits[i].nutritions.carbohydrates);
        data.setCell(i, 2, fruits[i].nutritions.protein);
        data.setCell(i, 3, fruits[i].nutritions.fat);
        data.setCell(i, 4, fruits[i].nutritions.calories);
        data.setCell(i, 5, fruits[i].nutritions.sugar);
    }

    var table = new google.visualization.Table(document.getElementById('table_sort_div'));
    table.draw(data, { width: '100%', height: '100%' });

    var options = {
        title: 'Statistiche dei frutti',
        vAxis: { title: 'valori nutrizionali' },
        hAxis: { title: 'frutto' },
        seriesType: 'bars',
        series: { 5: { type: 'bars' } }
    };

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1]);

    var table = new google.visualization.Table(document.getElementById('table_sort_div'));
    table.draw(data, { width: '100%', height: '100%' });

    var chart = new google.visualization.BarChart(document.getElementById('chart_sort_div'));
    chart.draw(view);

    google.visualization.events.addListener(table, 'sort',
        function (event) {
            data.sort([{ column: event.column, desc: !event.ascending }]);
            if (event.column == 0) {
                view.setColumns([0, 1]);

            } else {
                view.setColumns([0, event.column]);
            }
            chart.draw(view);
        });
}

$(window).resize(function () {
    drawSort()
});