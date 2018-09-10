const app = (function app(){

var inputnom, inputprix, inputdescription, inputid, obj, listeObj;

const doAjax = function doAjax(url, method, callback, data){
  try {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    data = data ? JSON.stringify(data) : null;
    if (method === "POST"){
        if (!data) throw new Error("bad call");
    }
    //on attend le retour de l'appel AJAX
    xhr.onload = evt => callback (evt.target.response || evt.srcElement.response);
    xhr.send(data);

    }
  catch(err) {
    console.error(err);}
  };


const getProducts = function getProducts() {
    const url = "http://localhost:7777/prod";
    doAjax(url, "GET", res => {
        //console.log(JSON.parse(res));
        listeObj = JSON.parse(res);
        console.log(listeObj);
        displayProd(listeObj)
    });

};



const createProd = function createProd(e) {
    //cet event est déclenché par le submit du FORM
    e.preventDefault(); // empêche FORM de reload la page (comportement par défaut)
    const url = "http://localhost:7777/prod";
    doAjax(url, "POST", res => {
    console.log(JSON.parse(res));

  }, obj = {
        nom : inputnom.value,
        prix : inputprix.value,
        description : inputdescription.value

    });
    displayNewProd(obj);
};

const displayNewProd = function displayNewProd(e){


    var table = document.getElementById('parent');
    var tr = document.createElement('tr');
    table.appendChild(tr);
    //var tdid = document.createElement('td');
    var tdnom = document.createElement('td');
    var tdprix = document.createElement('td');
    var tddes = document.createElement('td');
    //tr.appendChild(tdid);
    tr.appendChild(tdnom);
    tr.appendChild(tdprix);
    tr.appendChild(tddes);
    //tdid.innerHTML  = e.id;
    tdnom.innerHTML  = e.nom;
    tdprix.innerHTML  = e.prix;
    tddes.innerHTML  = e.description;

};

const displayProd = function displayProd(list){

  list.forEach(function(e){
    var table = document.getElementById('parent');
    var tr = document.createElement('tr');
    table.appendChild(tr);
    //var tdid = document.createElement('td');
    var tdnom = document.createElement('td');
    var tdprix = document.createElement('td');
    var tddes = document.createElement('td');
    //tr.appendChild(tdid);
    tr.appendChild(tdnom);
    tr.appendChild(tdprix);
    tr.appendChild(tddes);
    //tdid.innerHTML  = e.id;
    tdnom.innerHTML  = e.nom;
    tdprix.innerHTML  = e.prix;
    tddes.innerHTML  = e.description;
  });
};



const start = function start(){
  const getButton = document.getElementById("test");
  getButton.onclick = getProducts;
  //inputid = document.getElementById("id-inp");
  inputnom = document.getElementById("nom-inp");
  inputprix = document.getElementById("prix");
  inputdescription = document.getElementById("des");
  document.getElementById("addProd").onclick = createProd;



};

  window.addEventListener("DOMContentLoaded",start);
}());
