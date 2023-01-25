let audio = document.querySelector("#audio");
let animalsContent = document.querySelector("#animals");
let closeButton = document.querySelector(".btn_close");
let blurContent = document.querySelector("#blur_content");

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
        let modalBody = document.querySelector(".modal-body");
        let modal = document.querySelector(".modal_content");

        // --------Fermeture de la modal------------
        console.log(closeButton);
        closeButton.addEventListener("click", () => {
            console.log("coucou");
            modal.style.display = "none";
            blurContent.style.display = "none";
        })

        // --------Ouverture de la modal------------
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i]);
            cards[i].addEventListener("click", () => {
                console.log("coucou");
                modal.style.display = "block";
                blurContent.style.display = "block";
                // document.body.style.background = "grey"

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
                let deleteButton = document.querySelector(".update-btn");
                deleteButton.addEventListener("click", () => {
                    console.log(cards)
                    cards.splice(i, 1);
                    console.log(cards)
                })
            })

        }

        // -------------------Supprimer un élément--------------------
        for (let i = 0; i < names.length; i++) {

        }

        // Modifiez le document XML ici
        // ...
        // xhr.open("POST", "file.xml", true);
        // xhr.send(xmlDoc);
    }
};
xhr.send();
