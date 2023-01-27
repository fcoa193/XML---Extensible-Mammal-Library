export const getXmlAnimals = (callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "../animal.xml", true)
  xhr.send()
  xhr.onreadystatechange = async () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (callback) callback(xhr.responseXML)
    }
  }
}

