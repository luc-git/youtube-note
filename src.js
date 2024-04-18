main()

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

function addnotediv(div, content) {
  if (!location.href.includes("watch") || document.querySelector("#note")){
    return
  }
  let video = document.querySelector("video")
  let player = document.querySelector("#player")
  player.appendChild(div)
  div.appendChild(content)
  getnote(content, video)
  video.addEventListener("timeupdate", () => {
    getnote(content, video)
  })
}

function main() {
  let div = document.createElement("div")
  let content = document.createElement("div")
  div.id = "note"
  content.id = "content"
  addnotediv(div, content)
  browser.runtime.onMessage.addListener(() => {
    addnotediv(div, content)
  })
  console.log("HEREEEE" + location.href)
}