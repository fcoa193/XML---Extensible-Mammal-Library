let audio = document.querySelector("#audio");
let animalsContent = document.querySelector("#animals");
let closeButton = document.querySelector(".btn_close");
let blurContent = document.querySelector("#blur_content");

// audio.play();

// Instanciation de l'objet FileReader
// let reader = new FileReader();
// console.log("coucou")
// reader.onreadystatechange = function () {
//     console.log("coucou")
//     let xmlDoc = reader.result;
//     console.log(xmlDoc);
// };


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

        // -----------Fermeture de la modal------------
        closeButton.addEventListener("click", () => {
            console.log("coucou");
            modal.style.display = "none";
            blurContent.style.display = "none";
        })

        // --------Ouverture de la modal------------
        let cardsArray = [...cards];
        for (let i = 0; i < cardsArray.length; i++) {
            function OpenModal() {
                cardsArray[i].addEventListener("click", () => {
                    console.log("coucou")
                    modal.style.display = "block";
                    blurContent.style.display = "block";

                    modalTitle.innerHTML = `${names[i].textContent}`;
                    modalBody.innerHTML = `
                    <hr/>
                    <div class="info_container">
                        <img src=${pictures[i].textContent} class="img-modal" alt="">
                    </div>
                    <div class"w-50">
                        <div>Weight : ${weight[i].textContent}</div>
                        <div>Size : ${size[i].textContent}</div>
                        <div>Speed : ${speed[i].textContent}</div>
                        <div>Lifespan : ${lifespan[i].textContent}</div>
                        <div>Location : ${location[i].textContent}</div>
                        <div>Food : ${food[i].textContent}</div>
                        <div>Dangerousness : ${dangerousness[i].textContent}</div>
                    </div>
                    `
                    console.log(names[i].textContent);
                    closeButton.addEventListener("click", () => {
                        modal.style.display = "none";
                    })

                    // -------------------Supprimer un élément--------------------
                    let deleteButton = document.querySelector(".delete-btn");

                    let picturesArray = [...pictures];
                    let namesArray = [...names];
                    deleteButton.addEventListener("click", () => {
                        let elementToDelete = xmlDoc.getElementsByTagName(`${(namesArray[i].textContent).toLocaleLowerCase()}`)[0];
                        console.log("123456", (namesArray[i].textContent).toLocaleLowerCase())
                        console.log(elementToDelete)
                        // Récupérer le parent de l'élément
                        let parent = elementToDelete.parentNode;
                        // Supprimer l'élément
                        parent.removeChild(elementToDelete);
                        // xhr.open("POST", "../animal.xml", true);
                        // xhr.send(xmlDoc);
                        
                        fetch("http://127.0.0.1:8000/xml.php",
                        {
                            method: "POST",
                            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
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
                })
            }
            OpenModal();
        }

        // Modifiez le document XML ici
        // ...
        // xhr.open("POST", "file.xml", true);
        // xhr.send(xmlDoc);
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