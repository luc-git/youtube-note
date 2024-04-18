browser.tabs.onUpdated.addListener(
    () => {
        browser.tabs.query({
            active: true
        }).then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                message: "example"
            })
        })
        console.log("updated")
        /*browser.tabs.sendMessage({
            
        })*/
    }
)