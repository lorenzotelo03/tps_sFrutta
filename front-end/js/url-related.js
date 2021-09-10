//Penso sia una soluzione accettabile per non avere un backend che gestisca gli url
// "use strict"
let url = window.location.search.slice(1);
let singlePage

//controlla l'url e fa una redirect in base alle scente dell'utente
function checkUrl(isSinglePage) {
    singlePage = isSinglePage;
    //controlla che l'url sia o non sia vuoto in base al valore di "isSinglePage" che per la pagina del singolo frutto 
    //verrá passata la string '=' invece per l'index verrá passato '!' in modo da negare la condizione usando eval che dato 
    //un codice valido scritto in javascript ritorna il valore dell'esecuzione di esso
    let url_validation = eval("(url " + isSinglePage + "== \"\")");

    //if di redirect
    if (url_validation) {
        window.location.href = isSinglePage == "=" ? "/front-end/index.html?" : "/front-end/single-page.html?" + url;
    }
}

function redirectSearch() {

}