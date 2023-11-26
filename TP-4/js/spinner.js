document.addEventListener("DOMContentLoaded", startPage);

function startPage(){

    function spinner(){

        let body = document.querySelector("body");
        let divSpinnerNode = document.createElement("div");
        let divSpinner = document.createElement("div");
        let spanStatus = document.createElement("span");
        let image = document.createElement("img");
        image.src = "./img/spyderman.png";
        image.id = "spyderman-spinner";
    
        body.appendChild(getSpinnerTag());
                activateSpinner();
    
        function getSpinnerTag(){
    
            divSpinnerNode.classList.add("spinner");
            divSpinnerNode.classList.add("z-index-max");
            divSpinner.classList.add("lds-spinner");
            spanStatus.classList.add("spinner-status");
    
            spanStatus.appendChild(document.createTextNode("0%"));
    
            for (let index = 0; index < 12; index++) {
                divSpinner.innerHTML += "<div></div>";   
            }
    
            divSpinnerNode.appendChild(divSpinner);
            divSpinnerNode.appendChild(spanStatus);
            divSpinnerNode.appendChild(image);
    
            return divSpinnerNode;
        }
        
        function activateSpinner(){
            window.scrollTo(0, 0);
            let spinnerStatus = document.querySelector(".spinner-status");
            body.classList.add("form-hide");
            setTimeout(() => {
                body.classList.remove("form-hide");
                divSpinnerNode.remove();
            }, 4900);
    
            let status = 10;
            setInterval(() => {
                spinnerStatus.innerHTML = `${status}%`;
                if(status < 100)
                    status += 1;
            }, 38)
        }
    }
    spinner();
}