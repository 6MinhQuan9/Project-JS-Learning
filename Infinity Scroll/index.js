const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photoArray = [];

const count = 10;
const apiKey = "EPOntQ8oxDChOjs_FEGlwYcCmL0mJ5txJbyW8oYEWU4";
const unsplashApi = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhoto() {
  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(item, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(unsplashApi);
    photoArray = await res.json();
    displayPhoto();
  } catch (error) {}
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.screenY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});
getPhotos();
