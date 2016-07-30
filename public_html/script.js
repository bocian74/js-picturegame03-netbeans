/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tablica = [];
var howmany = 0;
var gotowe = 0;
var pozycja = 0;
var dlugoscLosowania = 0;
var picArraytmp = ["m1.jpg","m2.jpg","m3.jpg","m4.jpg","m5.jpg","m6.jpg","m7.jpg","m8.jpg","m9.jpg","m10.jpg","m11.jpg","m12.jpg",];
var picArray = [];
var questionmark = "img/questionmark.jpg";
var milsek = 5000;
var prevpic = 0;


function losowanie (){
    var picnum = Math.floor((Math.random() * 12)+1);
    return picnum;
}

function sprawdzenie (a) {
    var picnum = a;
    var ilerazy = 0;
    
    
    for (var i=0; i<24; i++){
        if (tablica[i]==picnum){
            
            ilerazy++;
        }
    }
     
    if (ilerazy < 2){
        console.log("prev:" + prevpic);
        prevpic = picnum;
        console.log(prevpic);
        return "OK";
    }    
    else {
        return "NOTOK";
    }
        
    
    
}


function tablicainit (){
    for (var i=0; i<24; i++) {
        tablica[i] = 0;
    }

        console.log(tablica);
        console.log(tablica.length);
}


function wypelnijTablice () {
    while (gotowe == 0) {

        dlugoscLosowania ++;

        var picnum = losowanie();
        console.log("picnum while:" + picnum);

        var check = sprawdzenie(picnum);
        console.log("sprawdzenie:" + check);

        if (check == "OK") {
            tablica[pozycja] = picnum;
            pozycja++;
        }

        if (pozycja == 24){
            gotowe = 1;
            console.log("ostateczna tablica: " + tablica);
            console.log("dlugoscLosowania: " + dlugoscLosowania);
        }

    };
}


function picarrayPrep(){
    for (var i=0; i<12; i++){
        picArray[i]="img/"+picArraytmp[i];
    }
}

function przygotujEkran (){
    document.getElementById("reloadbut").onclick = function (){
        location.reload();
    }
    
    document.getElementById("liczby").innerHTML= tablica;
    
    }
    
function narysujZdjecia(){
    for (var i=1; i<25; i++){
        
        var x = tablica[i-1];
        console.log(x);
         
        var pic = document.getElementById(i);
        console.log(pic);
        
        pic.setAttribute("src",picArray[x-1]);
        
    }

}    

function zakryjZdjecia () {
    for (var i=1; i<25; i++){
        var pic = document.getElementById(i);
        pic.setAttribute("src",questionmark);
        console.log(pic);
    }
}

/*
window.onload = function() {
    tablicainit();
    wypelnijTablice();
    picarrayPrep();
    console.log(picArraytmp);
    console.log(picArray);
    przygotujEkran();
    narysujZdjecia();
    
    zakryjZdjecia();
};
*/

    tablicainit();
    wypelnijTablice();
    picarrayPrep();
    console.log(picArraytmp);
    console.log(picArray);
    przygotujEkran();
    narysujZdjecia();
    
    //setInterval(zakryjZdjecia(),5);