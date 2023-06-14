function Gallery(gallery) {
    if (!gallery) {
      throw new Error("No gallery found!");
    }
  
    // to keep this function scoped and reusable, we're declaring the variables inside here, providing closure
    // query is run on gallery here, so it's specific to each gallery
    const images = Array.from(gallery.querySelectorAll("img"));
    // document is fine here, since only one modal can be up at a time, and it's not gallery scoped
    const modal = document.querySelector(".modal");
    // these live inside the modal, so it's run on modal
    const prevButton = modal.querySelector(".prev");
    const nextButton = modal.querySelector(".next");
    let currentImage;
  
    function openModal() {
      if (modal.matches(".open")) {
        console.info("Modal already open");
        return;
      }
      modal.classList.add("open");
  
      // these event listeners need to be bound to when the modal is open
      window.addEventListener("keyup", handleKeyUp);
      nextButton.addEventListener("click", showNextImage);
      prevButton.addEventListener("click", showPrevImage);
    }
  
    function closeModal() {
      modal.classList.remove("open");
  
      // then we remove these listeners when we close the modal
      window.removeEventListener("keyup", handleKeyUp);
      nextButton.removeEventListener("click", showNextImage);
      prevButton.removeEventListener("click", showPrevImage);
    }
  
    // check for outside clicks when modal is open
    function handleClickOutside(e) {
      // since the modal background takes up the whole page, and all our buttons are in modalInner, we can check if the user clicked on the modal itself and not the inner part
      if (e.target === e.currentTarget) {
        closeModal();
      }
    }
  
    // check for common key presses
    function handleKeyUp(e) {
      if (e.key === "Escape") return closeModal();
      if (e.key === "ArrowRight") return showNextImage();
      if (e.key === "ArrowLeft") return showPrevImage();
    }
  
    // add the image to the modal and open it
    function showImage(el) {
      if (!el) {
        console.info("No image to show");
        return;
      }
  
      modal.querySelector("img").src = el.src;
      modal.querySelector("h2").textContent = el.title;
      modal.querySelector("figure p").textContent = el.dataset.description;
      currentImage = el;
      openModal();
    }
  
    function showNextImage() {
      showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }
  
    function showPrevImage() {
      showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }
  
    // event listeners
    images.forEach((image) =>
      image.addEventListener("click", (e) => showImage(e.currentTarget))
    );
    modal.addEventListener("click", handleClickOutside);
    // since we set tabindex on the images, if we're focused on it and hit enter we want it to trigger the showImage function
    images.forEach((image) => {
      image.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          showImage(e.currentTarget);
        }
      });
    });
  } // end of Gallery
  
  // use the galleries on the page
  const gallery1 = Gallery(document.querySelector(".gallery1"));
  const gallery2 = Gallery(document.querySelector(".gallery2"));
  