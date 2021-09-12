google.load("visualization", "1", { packages: ["corechart", "table"] });
google.setOnLoadCallback(drawSort);

// let fruits = [];

let fruits = [
    {
        "genus": "Malus",
        "name": "Apple",
        "id": 6,
        "family": "Rosaceae",
        "order": "Rosales",
        "nutritions": {
            "carbohydrates": 11.4,
            "protein": 0.3,
            "fat": 0.4,
            "calories": 52,
            "sugar": 10.3
        }
    },
    {
        "genus": "Prunus",
        "name": "Apricot",
        "id": 35,
        "family": "Rosaceae",
        "order": "Rosales",
        "nutritions": {
            "carbohydrates": 3.9,
            "protein": 0.5,
            "fat": 0.1,
            "calories": 15,
            "sugar": 3.2
        }
    },
    {
        "genus": "Musa",
        "name": "Banana",
        "id": 1,
        "family": "Musaceae",
        "order": "Zingiberales",
        "nutritions": {
            "carbohydrates": 22,
            "protein": 1,
            "fat": 0.2,
            "calories": 96,
            "sugar": 17.2
        }
    },
    {
        "genus": "Fragaria",
        "name": "Blueberry",
        "id": 33,
        "family": "Rosaceae",
        "order": "Rosales",
        "nutritions": {
            "carbohydrates": 5.5,
            "protein": 0,
            "fat": 0.4,
            "calories": 29,
            "sugar": 5.4
        }
    }
]

async function fetchFruitJSON() {
    const response = await fetch('https://lore-images.herokuapp.com/fruit/all');
    fruits = await response.json();
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
            view.setColumns([0, event.column]);
            chart.draw(view);
        });
}

$(window).resize(function () {
    drawSort()
});