let entries = [];

document.getElementById("new-entry-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let entryDate = document.getElementById("entry-date").value;
    let entryImage = document.getElementById("entry-image").files[0];
    let entryComments = document.getElementById("entry-comments").value;

    let newEntry = {
        date: entryDate,
        image: entryImage,
        comments: entryComments
    };

    entries.push(newEntry);
    updateEntryList();
});

function updateEntryList() {
    let entryListDiv = document.getElementById("entry-list");
    entryListDiv.innerHTML = "";

    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];

        let entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        let entryDate = document.createElement("div");
        entryDate.classList.add("entry-date");
        entryDate.innerHTML = entry.date;
        entryDiv.appendChild(entryDate);

        let entryImage = document.createElement("img");
        entryImage.classList.add("entry-image");
        entryImage.src = URL.createObjectURL(entry.image);
        entryImage.addEventListener("click", function () {
            showFullImage(entry.image);
        });
        entryDiv.appendChild(entryImage);

        let entryComments = document.createElement("div");
        entryComments.classList.add("entry-comments");
        entryComments.innerHTML = entry.comments;
        entryDiv.appendChild(entryComments);

        entryListDiv.appendChild(entryDiv);
    }
}

function showFullImage(image) {
    let fullImageDiv = document.createElement("div");
    fullImageDiv.classList.add("full-image");

    let fullImageImg = document.createElement("img");
    fullImageImg.src = URL.createObjectURL(image);
    fullImageDiv.appendChild(fullImageImg);

    document.body.appendChild(fullImageDiv);
    fullImageDiv.classList.add("visible");

    fullImageDiv.addEventListener("click", function () {
        fullImageDiv.remove();
    });
}
