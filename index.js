function clientPost() {
    fetch(photoPath, {
        method: postMessage,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({"after": "timeStamp"})
    })
    .then(resonse => rsesponse.JSON())
    .then(serverResponse => {

    })
}

setTimeout(clientPost(), 5000)