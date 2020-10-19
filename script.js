
var phone = document.querySelector("#phone");
var formBlock = document.querySelector(".form");
var mapBlock = document.querySelector(".mapBlock");

var buttonStepTwo = document.getElementById("stepTwo");
var buttonStepOne = document.getElementById("stepOne");

var navItemOne = document.getElementById("navItemOne");
var navItemTwo = document.getElementById("navItemTwo");
var navItemThree = document.getElementById("navItemThree");

var regV = /^([+]?[0-9\s-\(\)]{3,25})*$/i;

var isChanged = false;
var nameValid = false;
var phoneValid = false;


function initJs () {

    function setCursorPosition(pos, elem) {

        elem.focus();

        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);

        else if (elem.createTextRange) {

            var range = elem.createTextRange();

            range.collapse(true);

            range.moveEnd("character", pos);

            range.moveStart("character", pos);

            range.select()

        }

    }



    function mask(event) {

        var matrix = this.defaultValue,

            i = 0,

            def = matrix.replace(/\D/g, ""),

            val = this.value.replace(/\D/g, "");

        def.length >= val.length && (val = def);

        matrix = matrix.replace(/[_\d]/g, function (a) {

            return val.charAt(i++) || "_"

        });

        this.value = matrix;

        i = matrix.lastIndexOf(val.substr(-1));

        i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");

        setCursorPosition(i, this)

    }

    phone.addEventListener("input", mask, false);
    

}

function myMap() {
    const myLatLng = { lat: 47.906313, lng: 33.397623 };
    var mapProp= {
        center:myLatLng,
        zoom:14,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Flabers",
      });
}

function formValidate(){
    console.log('formValidate');
    if (nameValid && phoneValid) {
        buttonStepTwo.removeAttribute('disabled');
    }
}

function validateName() {
    let userName = document.getElementById("firstName");
    let regExpName = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;   

    if(userName.value.length >= 3 && (!!userName.value.match(regExpName))) {
        nameValid = true;
        userName.classList.remove('input-invalid');

    } else {
        userName.classList.add('input-invalid');
        nameValid = false;
        buttonStepTwo.setAttribute('disabled', true);
    }
    formValidate();
}

function validatePhone() {
    phone.classList.add('input-phone-valid');

    if (phone.value.match(regV)) {
        phoneValid = true;
        phone.classList.remove('input-invalid');
    } else {
        phoneValid = false;
        // phone.classList.add('input-invalid');
        buttonStepTwo.setAttribute('disabled', true);
    } 
    if (isChanged && !phone.value.match(regV)){
        phone.classList.add('input-invalid');
    }

    formValidate();
}

function isChangedPhone() {
    isChanged = true;
}

function makeStepTwo(){
    formBlock.classList.add('display_none');
    formBlock.classList.remove('display_flex');
    mapBlock.classList.add('display_flex');        
    mapBlock.classList.remove('display_none');
    navItemOne.classList.remove('navigator-item__active');
    navItemTwo.classList.add('navigator-item__active');
}

function makeStepOne(){
    formBlock.classList.add('display_flex');
    formBlock.classList.remove('display_none');
    mapBlock.classList.add('display_none');
    mapBlock.classList.remove('display_flex');
    navItemTwo.classList.remove('navigator-item__active');
    navItemOne.classList.add('navigator-item__active');

}

buttonStepTwo.addEventListener("click", makeStepTwo, false);
buttonStepOne.addEventListener("click", makeStepOne, false);

window.addEventListener("DOMContentLoaded", initJs);