import {getXmlAnimals} from "./animals.js"



const addChart = () => {
    const chart = document.querySelector("#chart")
    const label = document.createElement("label")
    label.innerHTML = "Weight"
    chart.appendChild(label)
    getXmlAnimals((xmlDoc) => {
        let result = xmlDoc.getElementsByTagName("weight")
        let max = 0
        for (let item of result) {
            if (parseFloat(item.innerHTML) > max) {
                max = parseFloat(item.innerHTML)
            }
        }

        


        let i = 0;
        for (let item of result) {
            let itemWeight = (100 * parseFloat(item.innerHTML)) / max
            const name = item.parentNode.getElementsByTagName("name")[0].innerHTML
            chart.appendChild(addProgressBar(name, parseFloat(itemWeight), item.innerHTML, " kg", i))
        
            const loading = document.querySelector('.chart-' + i);
            const keyFrames = document.createElement("style");
            keyFrames.innerHTML = `
            @keyframes loading`+ i +` {
                from {
                    width: 0%;
                }
                to {
                    width: `+ itemWeight + `%;
                }
            }

            .chart-`+ i +` {
                animation: loading`+ i +` 1s ease;
            }
            `
            loading.appendChild(keyFrames);
            i++
        }
    })

    document.querySelector("#weight").addEventListener("click", () => {
        document.querySelector("#chart").remove()
        const chart = document.createElement("div")
        chart.id = "chart"
        const label = document.createElement("label")
        label.innerHTML = "Weight"
        chart.appendChild(label)
        document.querySelector("#page").prepend(chart)
        getXmlAnimals((xmlDoc) => {
            let result = xmlDoc.getElementsByTagName("weight")
            let max = 0
            for (let item of result) {
                if (parseFloat(item.innerHTML) > max) {
                    max = parseFloat(item.innerHTML)
                }
            }
            let i = 0;
            for (let item of result) {
                
                let itemWeight = (100 * parseFloat(item.innerHTML)) / max
                console.log(itemWeight)
                const name = item.parentNode.getElementsByTagName("name")[0].innerHTML
                console.log("----", item.innerHTML)
                chart.appendChild(addProgressBar(name, parseFloat(itemWeight), item.innerHTML, " kg", i))
                const loading = document.querySelector('.chart-' + i);
                const keyFrames = document.createElement("style");
                keyFrames.innerHTML = `
                @keyframes loading`+ i +` {
                    from {
                        width: 0%;
                    }
                    to {
                        width: `+ itemWeight + `%;
                    }
                }

                .chart-`+ i +` {
                    animation: loading`+ i +` 1s ease;
                }
                `
                loading.appendChild(keyFrames);
                i++
            }
        })
    })

    document.querySelector("#size").addEventListener("click", () => {
        document.querySelector("#chart").remove()
        const chart = document.createElement("div")
        chart.id = "chart"
        const label = document.createElement("label")
        label.innerHTML = "Size"
        chart.appendChild(label)
        document.querySelector("#page").prepend(chart)
        getXmlAnimals((xmlDoc) => {
            let result = xmlDoc.getElementsByTagName("size")
            let max = 0
            for (let item of result) {
                if (parseFloat(item.innerHTML) > max) {
                    max = parseFloat(item.innerHTML)
                }
            }
            let i = 0;
            for (let item of result) {
                
                let itemWeight = (100 * parseFloat(item.innerHTML)) / max
                console.log(itemWeight)
                const name = item.parentNode.getElementsByTagName("name")[0].innerHTML
                chart.appendChild(addProgressBar(name, parseFloat(itemWeight), item.innerHTML, " cm", i))
                const loading = document.querySelector('.chart-' + i);
                const keyFrames = document.createElement("style");
                keyFrames.innerHTML = `
                @keyframes loading`+ i +` {
                    from {
                        width: 0%;
                    }
                    to {
                        width: `+ itemWeight + `%;
                    }
                }

                .chart-`+ i +` {
                    animation: loading`+ i +` 1s ease;
                }
                `
                loading.appendChild(keyFrames);
                i++
            }
        })
    })

    document.querySelector("#speed").addEventListener("click", () => {
        document.querySelector("#chart").remove()
        const chart = document.createElement("div")
        chart.id = "chart"
        const label = document.createElement("label")
        label.innerHTML = "Speed"
        chart.appendChild(label)
        document.querySelector("#page").prepend(chart)
        getXmlAnimals((xmlDoc) => {
            let result = xmlDoc.getElementsByTagName("speed")
            let max = 0
            for (let item of result) {
                if (parseFloat(item.innerHTML) > max) {
                    max = parseFloat(item.innerHTML)
                }
            }
            let i = 0;
            for (let item of result) {
                
                let itemWeight = (100 * parseFloat(item.innerHTML)) / max
                console.log(itemWeight)
                const name = item.parentNode.getElementsByTagName("name")[0].innerHTML
                chart.appendChild(addProgressBar(name, parseFloat(itemWeight), item.innerHTML, " km/h", i))
                const loading = document.querySelector('.chart-' + i);
                const keyFrames = document.createElement("style");
                keyFrames.innerHTML = `
                @keyframes loading`+ i +` {
                    from {
                        width: 0%;
                    }
                    to {
                        width: `+ itemWeight + `%;
                    }
                }

                .chart-`+ i +` {
                    animation: loading`+ i +` 1s ease;
                }
                `
                loading.appendChild(keyFrames);
                i++
            }
        })
    })

    document.querySelector("#lifespan").addEventListener("click", () => {
        document.querySelector("#chart").remove()
        const chart = document.createElement("div")
        chart.id = "chart"
        const label = document.createElement("label")
        label.innerHTML = "Lifespan"
        chart.appendChild(label)
        document.querySelector("#page").prepend(chart)
        getXmlAnimals((xmlDoc) => {
            let result = xmlDoc.getElementsByTagName("lifespan")
            let max = 0
            for (let item of result) {
                if (parseFloat(item.innerHTML) > max) {
                    max = parseFloat(item.innerHTML)
                }
            }
            let i = 0;
            for (let item of result) {
                
                let itemWeight = (100 * parseFloat(item.innerHTML)) / max
                console.log(itemWeight)
                const name = item.parentNode.getElementsByTagName("name")[0].innerHTML
                chart.appendChild(addProgressBar(name, parseFloat(itemWeight), item.innerHTML, " years", i))
                const loading = document.querySelector('.chart-' + i);
                const keyFrames = document.createElement("style");
                keyFrames.innerHTML = `
                @keyframes loading`+ i +` {
                    from {
                        width: 0%;
                    }
                    to {
                        width: `+ itemWeight + `%;
                    }
                }

                .chart-`+ i +` {
                    animation: loading`+ i +` 1s ease;
                }
                `
                loading.appendChild(keyFrames);
                i++
            }
        })
    })
}

const addProgressBar = (label, valuePourcent, weight, type, index) => {
    let animalChart = document.createElement("div")
    animalChart.classList.add("animal-chart")
    let p = document.createElement("p")
    p.innerHTML = label
    const progress = document.createElement("div")
    progress.classList.add("progress")
    const progressBar = document.createElement("div")
    progressBar.classList.add("progress-bar")
    progressBar.style = "width: " + valuePourcent + "%;"
    progressBar.classList.add("chart-" + index)
    console.log(weight)
    if (valuePourcent >= 10) {
        progressBar.innerHTML = weight + type
    } else {
        const pWeight = document.createElement("p")
        pWeight.innerHTML = weight + type
        progress.appendChild(pWeight)
    }
    progress.prepend(progressBar)
    animalChart.appendChild(p)
    animalChart.appendChild(progress)
    return animalChart
}

addChart()