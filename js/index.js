let audio = document.querySelector("#audio");
let animalsContent = document.querySelector("#animals");
let closeButton = document.querySelector(".btn_close");

// audio.play();

var xhr = new XMLHttpRequest();
xhr.open("GET", "../animal.xml", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var xmlDoc = xhr.responseXML;
        console.log(xmlDoc);
        var names = xmlDoc.getElementsByTagName("name");
        var pictures = xmlDoc.getElementsByTagName("picture");
        for (let i = 0; i < names.length; i++) {
            animalsContent.innerHTML += `
            <div class="fich">
                <img src=${pictures[i].textContent} class="img" alt="">
                <h3 class="title">${names[i].textContent}</h3>
            </div>
            `
        }
        let cards = document.querySelectorAll(".fich");
        let modalTitle = document.querySelectorAll(".modal_title");
        let modal = document.querySelector(".modal_content");

        // --------Fermeture de la modal------------
        console.log(closeButton);
        closeButton.addEventListener("click", () => {
            console.log("coucou");
            modal.style.display = "none";
        })
        for (let i = 0; i < cards.length; i++) {
            console.log(cards[i]);
            cards[i].addEventListener("click", () => {
                console.log("coucou");
                modal.style.display = "block";

                modalTitle.innerHTML = `${names[i].textContent}`;
                console.log(closeButton);
                closeButton.addEventListener("click", () => {
                    console.log("coucou");
                    modal.style.display = "none";
                })
                // modalTitle.innerHTML = 
            })

        }




        // Modifiez le document XML ici
        // ...
        // xhr.open("POST", "file.xml", true);
        // xhr.send(xmlDoc);
    }
};
xhr.send();
