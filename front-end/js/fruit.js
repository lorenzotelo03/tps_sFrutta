var cardContainer = document.getElementById("card-container")
async function fetchFruitJSON() {
    const response = await fetch('https://lore-images.herokuapp.com/fruit/all');
    const fruits = await response.json();
    return fruits;
}

async function getFruitimg(fruit){
    const response = await fetch('https://lore-images.herokuapp.com/img/'+ fruit);
    const imgFruit = await response.json();
    return imgFruit.url;
}

async function createHP(){
    var fruits = await fetchFruitJSON();
    fruits.forEach(async (fruit) =>  { //funzione freccia
        var imgCont = document.createElement("div");
        imgCont.setAttribute("onclick", "redirect( \""+ fruit.name + " \")");
        imgCont.setAttribute("class", "card bg-dark text-white");
        imgCont.setAttribute("style", "width: 18rem;");
        var img = document.createElement("img");
        img.setAttribute("alt", fruit.name);
        img.setAttribute("class", "card-img-top");
        img.setAttribute("class", "imgFruit");
        var url = await getFruitimg(fruit.name);
        img.setAttribute("src", url);
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        var cardTitle = document.createElement("h5");
        cardTitle.innerHTML = fruit.name;
        imgCont.appendChild(img);
        cardBody.appendChild(cardTitle);
        imgCont.appendChild(cardBody);
        cardContainer.appendChild(imgCont);
    });

}