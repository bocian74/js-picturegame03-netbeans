/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tablica = []; //tablica z wylosowanymi parami numerów zdjec 1-12
var picArraytmp = ["m1.jpg","m2.jpg","m3.jpg","m4.jpg","m5.jpg","m6.jpg","m7.jpg","m8.jpg","m9.jpg","m10.jpg","m11.jpg","m12.jpg",];
var picArray = []; //picArraytmp z dodanym przedrostkiem 'img/'
var picArrayRef = []; // tablica z elementami img po ID (DOM)

var howmany = 0;
var gotowe = 0;
var pozycja = 0;
var dlugoscLosowania = 0;
var questionmark = "img/questionmark.jpg";
var milsek = 5000;
var prevpic = 0;
var narysowane = 0;
var zakryte = 0;

var imageClicked;
var odkrytyOne; //wartos pierwszego odkrytego obrazka
var odkrytyTwo; //wartos drugieo odkrytego obrazka
var pierwszyOdkryty = 0; //czy pierwszy juz odkryty
var drugiOdkryty = 0; //czy pierwszy juz odkryty
var imageClickedPrev;
var ileParDobrze = 0;
var ileKlikniec = 0;

var startTime;
var endTime;
var timeDiff;

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


function tablicaInit (){
    for (var i=0; i<24; i++) {
        tablica[i] = 0;
    }

        console.log(tablica);
        console.log(tablica.length);
}

function tablicaRefInit(){
    for (var i=1; i<25; i++){
        var image = document.getElementById(i);
        picArrayRef[i-1] = image;
        }
    console.log("picArrayRef: " + picArrayRef);
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
        //wygrana();
    }
    
    //document.getElementById("liczby").innerHTML= tablica;
    
    }

function zakryjZdjecia () {
    
    
        
    for (var i=0; i<24; i++){
        var pic = picArrayRef[i];
        
        pic.setAttribute("src",questionmark);
        console.log(pic);
    }
    
    zakryte = 1;
    console.log(zakryte);
}


function narysujZdjecia(){
    
     
    for (var i=0; i<24; i++){
        
        var x = tablica[i]-1;
        console.log(x);
         
        var pic = picArrayRef[i];
        console.log(pic);
        
        pic.setAttribute("src",picArray[x]);
        
     }

}    


function changePicture (imageClicked, nrZdjecia) {
	
        var img = imageClicked;

        if (img!==odkrytyOne && ileParDobrze<12){
            
        ileKlikniec++;
        
        if (ileKlikniec===1){
            startTime = new Date();
        }
        
        var picIndex = nrZdjecia -1;
	img.setAttribute("src",picArray[picIndex]);
	        
        if (pierwszyOdkryty===0 && drugiOdkryty===0){
            odkrytyOne = img;
            pierwszyOdkryty = 1;
            console.log("odkrytyOne:" + odkrytyOne.getAttribute("src"));
            
        } else if (pierwszyOdkryty ===1 && drugiOdkryty===0) {
            odkrytyTwo = img;
            drugiOdkryty = 1;
            if (odkrytyOne.getAttribute("src")===odkrytyTwo.getAttribute("src")){
                ileParDobrze++;
                pierwszyOdkryty = 0;
                drugiOdkryty = 0;
                odkrytyOne = null;
                odkrytyTwo = null;
                if (ileParDobrze===12){
                    wygrana();
                }
            } 
            
            
        } else {
            odkrytyOne.setAttribute("src",questionmark);
            odkrytyTwo.setAttribute("src",questionmark);
            odkrytyOne = img;
            pierwszyOdkryty = 1;
            drugiOdkryty = 0;
            odkrytyTwo = null;
            console.log("odkrytyOne:" + odkrytyOne.getAttribute("src"))
            
        }
        }
	}
        
        

function dodajOnClick(){
    for (var i=0; i<24; i++){
        var image = picArrayRef[i];
                
        image.onclick = function () {
            imageClicked = this; //objekt obrazek kliknięty
            console.log(imageClicked);
                       
            var imageClickedPos = picArrayRef.indexOf(imageClicked); //pozycja wybranego objektu img - numer obrazka (0-23)
            console.log(imageClickedPos);
            
            var nrZdjecia = tablica[imageClickedPos]; // ktory obrazek w danym miejscu (1-12)
        
            changePicture(imageClicked, nrZdjecia); //przekaz wygbrany element img i jakie tam jest zdjecie
        }
            
    }
    
}

function wygrana(){
    endTime = new Date();
    var timeDiff = (endTime - startTime) / 1000;
    document.getElementById("naglowek").innerHTML="GRATULACJE! Twój czas: " + timeDiff +" sek. Ilość kliknięć: " + ileKlikniec;
}



window.onload = function() {
    tablicaInit();
    tablicaRefInit();
    wypelnijTablice();
    picarrayPrep();
    console.log(picArraytmp);
    console.log(picArray);
    przygotujEkran();
    narysujZdjecia();
    /*
    document.getElementById("zakryj").onclick = function(){
        zakryjZdjecia();
        dodajOnClick();
    }*/
    zakryjZdjecia();
    dodajOnClick();
    /*
        document.getElementById("odkryj").onclick = function(){
        narysujZdjecia();
    }*/
    
 
};
