const form = document.querySelector("#journal-form");
const entriesContainer = document.querySelector("#entries");
let entries = {};

form.addEventListener("submit", e => {
    e.preventDefault();

    const date = new Date(document.querySelector("#date").value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const comments = document.querySelector("#comments").value;
    const images = Array.from(document.querySelector("#images").files);

    if (!entries[year]) {
        entries[year] = {};
    }

    if (!entries[year][month]) {
        entries[year][month] = [];
    }

    entries[year][month].push({
        date,
        comments,
        images
    });

    renderEntries();
});

const renderEntries = () => {
    entriesContainer.innerHTML = "";

    Object.keys(entries).sort().forEach(year => {
        const yearDiv = document.createElement("div");
        yearDiv.classList.add("year");

        const yearHeader = document.createElement("h2");
        yearHeader.innerHTML = year;
        yearHeader.addEventListener("click", () => {
            yearDiv.classList.toggle("collapsed");
            const yearEntries = yearDiv.querySelectorAll(".month");
            yearEntries.forEach(entry => {
                entry.classList.toggle("collapsed");
            });
        });
        yearDiv.appendChild(yearHeader);

        Object.keys(entries[year]).sort().forEach(month => {
            const monthDiv = document.createElement("div");
            monthDiv.classList.add("month");

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const monthHeader = document.createElement("h3");
            monthHeader.innerHTML = monthNames[month];
            monthDiv.appendChild(monthHeader);

            entries[year][month].forEach((entry, index) => {
                const entryDiv = document.createElement("div");
                entryDiv.classList.add("entry");

                const date = document.createElement("h3");
                date.innerHTML = entry.date.getDate();

                entryDiv.appendChild(date);

                const comments = document.createElement("p");
                comments.innerHTML = entry.comments;
                entryDiv.appendChild(comments);

                const imagesContainer = document.createElement("div");
                imagesContainer.classList.add("entry-images");

                entry.images.forEach(image => {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(image);
                    img.addEventListener("click", () => {
                        const fullImage = document.createElement("div");
                        fullImage.classList.add("full-image");

                        const fullImg = document.createElement("img");
                        fullImg.src = URL.createObjectURL(image);
                        fullImage.appendChild(fullImg);

                        const closeButton = document.createElement("button");
                        closeButton.innerHTML = "Close";
                        closeButton.addEventListener("click", () => {
                            fullImage.remove();
                        });
                        fullImage.appendChild(closeButton);
                        entriesContainer.appendChild(fullImage);
                    });
                    imagesContainer.appendChild(img);
                });
                entryDiv.appendChild(imagesContainer);

                monthDiv.appendChild(entryDiv);

            });
            yearDiv.appendChild(monthDiv);
        });
        entriesContainer.appendChild(yearDiv);
    });
}
