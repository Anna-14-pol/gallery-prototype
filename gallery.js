function Gallery(gallery) {
    if (!gallery) {
      throw new Error("No gallery found!");
    }
      // save the instance of gallery passed in
  this.gallery = gallery;
    // then we'll save a version of each of these to the instance as well
    this.images = Array.from(gallery.querySelectorAll("img"));
    this.modal = document.querySelector(".modal");
    // these live inside the modal, so it's run on modal
    this.prevButton = this.modal.querySelector(".prev");
    this.nextButton = this.modal.querySelector(".next");
    
    // bind metods to the instance
    this.showNextImage = this.showNextImage.bind(this);  
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  
    // event listeners
    this.images.forEach((image) =>
      image.addEventListener("click", (e) => this.showImage(e.currentTarget))
    );
    this.modal.addEventListener("click", this.handleClickOutside);
    // since we set tabindex on the images, if we're focused on it and hit enter we want it to trigger the showImage function
    this.images.forEach((image) => {
      image.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          this.showImage(e.currentTarget);
        }
      });
    });
  } // end of Gallery

  Gallery.prototype.openModal = function() {
    if (this.modal.matches(".open")) {
      console.info("Modal already open");
      return;
    }
    this.modal.classList.add("open");

    // these event listeners need to be bound to when the modal is open
    window.addEventListener("keyup",  this.handleKeyUp);
    this.nextButton.addEventListener("click",this.showNextImage);
    this.prevButton.addEventListener("click", this.showPrevImage);
  }

  Gallery.prototype.closeModal = function() {
    this.modal.classList.remove("open");

    // then we remove these listeners when we close the modal
    window.removeEventListener("keyup", this.handleKeyUp);
    this.nextButton.removeEventListener("click", this.showNextImage);
    this.prevButton.removeEventListener("click", this.showPrevImage);
  }

  // check for outside clicks when modal is open
  Gallery.prototype.handleClickOutside = function(e) {
    // since the modal background takes up the whole page, and all our buttons are in modalInner, we can check if the user clicked on the modal itself and not the inner part
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  }

  // check for common key presses
  Gallery.prototype.handleKeyUp = function(e) {
    if (e.key === "Escape") return this.closeModal();
    if (e.key === "ArrowRight") return this.showNextImage();
    if (e.key === "ArrowLeft") return this.showPrevImage();
  }

  // add the image to the modal and open it
  Gallery.prototype.showImage = function(el) {
    if (!el) {
      console.info("No image to show");
      return;
    }

    this.modal.querySelector("img").src = el.src;
    this.modal.querySelector("h2").textContent = el.title;
    this.modal.querySelector("figure p").textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();
  }

  Gallery.prototype.showNextImage = function() {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
  }

  Gallery.prototype.showPrevImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
  };
  
  // use the galleries on the page
  const gallery1 = new Gallery(document.querySelector(".gallery1"));
  const gallery2 = new Gallery(document.querySelector(".gallery2"));


  