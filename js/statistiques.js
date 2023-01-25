import {getXmlAnimals} from "./animals.js"

const addChart = (nameChart) => {
    const chart = document.querySelector("#chart")
    getXmlAnimals((xmlDoc) => {
        let weight = xmlDoc.getElementsByTagName("weight")
        console.log(weight)
        for (let item of weight) {
            const name = item.parentNode.getElementsByTagName("name")[0].innerHTML
            chart.appendChild(addProgressBar(name, item.innerHTML))
        }
    })
}

const addProgressBar = (label, value) => {
    let animalChart = document.createElement("div")
    animalChart.classList.add("animal-chart")
    let p = document.createElement("p")
    p.innerHTML = label
    const progress = document.createElement("div")
    progress.classList.add("progress")
    const progressBar = document.createElement("div")
    progressBar.classList.add("progress-bar")
    progressBar.style = "width: " + value + "%;"
    progress.appendChild(progressBar)
    animalChart.appendChild(p)
    animalChart.appendChild(progress)
    return animalChart
}

addChart()