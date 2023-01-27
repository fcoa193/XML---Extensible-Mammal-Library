let audio = document.querySelector("#audio");
let animalsContent = document.querySelector("#animals");
let closeButton = document.querySelector(".btn_close");
let blurContent = document.querySelector("#blur_content");
let edit = false;

// audio.play();

var xhr = new XMLHttpRequest();
xhr.open("GET", "../animal.xml", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var xmlDoc = xhr.responseXML;
        console.log(xmlDoc);
        let names = xmlDoc.getElementsByTagName("name");
        let pictures = xmlDoc.getElementsByTagName("picture");
        let weight = xmlDoc.getElementsByTagName("weight");
        let size = xmlDoc.getElementsByTagName("size");
        let speed = xmlDoc.getElementsByTagName("speed");
        let lifespan = xmlDoc.getElementsByTagName("lifespan");
        let location = xmlDoc.getElementsByTagName("location");
        let food = xmlDoc.getElementsByTagName("food");
        let dangerousness = xmlDoc.getElementsByTagName("dangerousness");

        // ------------------Affichage des cartes------------------
        for (let i = 0; i < names.length; i++) {
            animalsContent.innerHTML += `
            <div class="fich">
                <img src=${pictures[i].textContent} class="img" alt="">
                <h3 class="title">${names[i].textContent}</h3>
            </div>
            `
        }
        let cards = document.querySelectorAll(".fich");
        let modalTitle = document.querySelector(".modal_title");
        let modalBody = document.querySelector(".modal_body");
        let modal = document.querySelector(".modal_content");

        // -----------Fermeture de la modale------------
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
            blurContent.style.display = "none";
            edit = false;
        })

        // --------Ouverture de la modale------------
        let cardsArray = [...cards];
        for (let i = 0; i < cardsArray.length; i++) {
            function OpenModal() {
                cardsArray[i].addEventListener("click", () => {
                    modal.style.display = "block";
                    blurContent.style.display = "block";


                    function displayInfosAnimal(i) {
                        // ---------Afficher les infos de l'animal-------------
                        modalTitle.innerHTML = `${names[i].textContent}`;
                        modalBody.innerHTML = `
                        <hr/>
                        <div class="info_container">
                            <img src=${pictures[i].textContent} class="img-modal" alt="">
                        </div>
                        <div class"w-50">
                            <div>Weight : <span class="info_content"></span></div>
                            <div>Size : <span class="info_content"></span></div>
                            <div>Speed : <span class="info_content"></span></div>
                            <div>Lifespan : <span class="info_content"></span></div>
                            <div>Location : <span class="info_content"></span></div>
                            <div>Food : <span class="info_content"></span></div>
                            <div>Dangerousness : <span class="info_content"></span></div>
                        </div>
                        `
                        let infoContents = document.querySelectorAll(".info_content");
                        let infoArray = [weight[i].textContent, size[i].textContent, speed[i].textContent, lifespan[i].textContent, location[i].textContent, food[i].textContent, dangerousness[i].textContent]
                        let inputs = [];
                        for (let k = 0; k < infoContents.length; k++) {
                            if (edit) {
                                let input = document.createElement('input');
                                input.type = "text";
                                input.className = "input-infos-content";
                                input.value = infoArray[k];
                                inputs.push(input);
                                infoContents[k].appendChild(input)
                            } else {
                                infoContents[k].innerHTML = infoArray[k];
                            }
                        }
                        return [...inputs];
                    }
                    displayInfosAnimal(i);

                    // -------------------Supprimer un élément--------------------
                    let deleteButton = document.querySelector(".delete-btn");

                    let picturesArray = [...pictures];
                    let namesArray = [...names];
                    deleteButton.addEventListener("click", () => {
                        let elementToDelete = xmlDoc.getElementsByTagName(`${(namesArray[i].textContent).toLocaleLowerCase()}`)[0];

                        console.log((namesArray[i].textContent).toLocaleLowerCase())
                        console.log(elementToDelete);

                        // Récupérer le parent de l'élément
                        let parent = elementToDelete.parentNode;
                        parent.removeChild(elementToDelete);

                        fetch("http://127.0.0.1:8000/xml.php",
                            {
                                method: "POST",
                                headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                                body: "source=" + (namesArray[i].textContent).toLocaleLowerCase() + "&delete=true"
                            }).then((res) => {
                                console.log(res)
                            }).catch((err) => {
                                console.log(err)
                            })

                        animalsContent.innerHTML = "";
                        cardsArray.splice(i, 1);
                        picturesArray.splice(i, 1);
                        namesArray.splice(i, 1);
                        modal.style.display = "none";
                        blurContent.style.display = "none";

                        for (let i = 0; i < namesArray.length; i++) {
                            console.log(picturesArray[i].textContent)

                            animalsContent.innerHTML += `
                            <div class="fich">
                                <img src=${picturesArray[i].textContent} class="img" alt="">
                                <h3 class="title">${namesArray[i].textContent}</h3>
                            </div>
                            `
                            OpenModal();
                        }
                    })

                    // -------------------Modifier un élément--------------------
                    let validateButton = document.querySelector(".validate-btn");
                    let updateButton = document.querySelector(".update-btn");
                    updateButton.addEventListener("click", () => {
                        let elementToUpdate = (namesArray[i].textContent).toLocaleLowerCase();
                        edit = true;
                        validateButton.style.display = "block";
                        displayInfosAnimal(i);
                        let inputsToUpdate = document.querySelectorAll(".input-infos-content");

                        validateButton.addEventListener("click", () => {
                            // let animalUpdated = { "tag": elementToUpdate };
                            let animalUpdated = `name=${elementToUpdate}`
                            let keys = ["weight", "size", "speed", "lifespan", "location", "food", "dangerousness"]
                            for (let a = 0; a < inputsToUpdate.length; a++) {
                                console.log(inputsToUpdate[a].value);
                                // animalUpdated[keys[a]] = inputsToUpdate[a].value;
                                animalUpdated += `&${keys[a]}=${inputsToUpdate[a].value}`;
                            }

                            // Envoi de la requête au serveur
                            fetch("http://127.0.0.1:8000/xml.php",
                                {
                                    method: "POST",
                                    headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                                    body: animalUpdated + "&update=true"
                                }).then((res) => {
                                    console.log(res)
                                }).catch((err) => {
                                    console.log(err)
                                })

                            console.log(animalUpdated);
                        })

                    })
                })
            }
            OpenModal();
        }
    }
};
xhr.send();


//créer l'animal
document.querySelector("#btnCreate").addEventListener("click", () => {
    const name = document.querySelector("#createName").value
    const specie = document.querySelector("#createSpecie").value
    const weight = document.querySelector("#createWeight").value
    const size = document.querySelector("#createSize").value
    const speed = document.querySelector("#createSpeed").value
    const lifespan = document.querySelector("#createLifespan").value
    const location = document.querySelector("#createLocation").value
    const food = document.querySelector("#createFood").value
    const dangerousness = document.querySelector("#createDangerousness").value

    const reqData = {tag: name, specie, weight, size, speed, lifespan, location, food, dangerousness}
    console.log(reqData)
    let stringData
    let i = 0
    for (const [key, value] of Object.entries(reqData)) {
        if (i != 0) {
            stringData += "&" + key + "=" + value
        } else {

            stringData = key + "=" + value
        }
        i++
    }
    console.log(stringData)

    fetch("http://127.0.0.1:8000/xml.php",
    {
        method: "POST",
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: stringData + "&create=true"
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })

})