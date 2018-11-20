let after = Date.now();

function clientPost() {
  fetch("/latest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ after })
  })
    .then(response => response.json())
    .then(serverResponse => {
      serverResponse.images.forEach(image => {
        const imgTag = document.createElement("img");
        imgTag.src = image;
        const imagesContainer = document.getElementById("imagesContainer");
        imagesContainer.appendChild(imgTag);
      });
      after = serverResponse.timestamp;
      setTimeout(clientPost, 5000);
    });
}
setTimeout(clientPost, 5000);
