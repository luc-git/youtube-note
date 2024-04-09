let video = document.querySelector("video")
let player = document.querySelector("#player")  
let div = document.createElement("div")
div.id = "note"
player.appendChild(div)
//div.style.visibility = "hidden"
getnote()

async function getnote() {
  const request = await fetch("https://www.dolthub.com/api/v1alpha1/luc-dolt/note/main?q=SELECT+*+FROM+%60note%60")
  const response = await request.json()
  div.innerText = JSON.stringify(response["rows"][0]["note"])
  console.log(JSON.stringify(response["rows"][0]["note"]))
}

video.addEventListener("timeupdate", () => {
})