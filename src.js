setTimeout(main, 2000)

async function getnote(content, video) {
  let url = location.href.split("v=")[1]
  console.log("https://www.dolthub.com/api/v1alpha1/luc-dolt/note/main?q=SELECT+*%0AFROM+note%0AWHERE+videoid%3D%22" + url + "%22+AND+" + video.currentTime + "+%3E%3D+timebegin+AND+" + video.currentTime + "+%3C%3D+timeend%3B%0A")
  const request = await fetch("https://www.dolthub.com/api/v1alpha1/luc-dolt/note/main?q=SELECT+*%0AFROM+note%0AWHERE+videoid%3D%22" + url + "%22+AND+" + video.currentTime + "+%3E%3D+timebegin+AND+" + video.currentTime + "+%3C%3D+timeend%3B%0A")
  const response = await request.json()
  if (response["rows"][0] == undefined){
    content.innerText = ""
    return
  }
  content.innerText = JSON.stringify(response["rows"][0]["note"])
}

function addnotebox(note, content) {
  if (!location.href.includes("watch")){
    return
  }
  let video = document.querySelector("video")
  let abovethefold = document.querySelector("#above-the-fold")
  if (document.querySelector("#note")){
    getnote(content, video)
    return
  }
  abovethefold.appendChild(note)
  note.appendChild(content)
  getnote(content, video)
  video.addEventListener("timeupdate", () => {
    getnote(content, video)
  })
}

function main() {
  let note = document.createElement("div")
  let content = document.createElement("div")
  note.id = "note"
  content.id = "content"
  addnotebox(note, content)
  browser.runtime.onMessage.addListener(() => {
    addnotebox(note, content)
  })
  console.log("HEREEEE" + location.href)
}