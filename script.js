document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  function updateCountdown() {
    const targetDate = new Date("2025-09-05T14:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    const d = (id, value) =>
      (document.getElementById(id).textContent = value.toString().padStart(2, "0"));

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      d("days", days);
      d("hours", hours);
      d("minutes", minutes);
      d("seconds", seconds);
    } else {
      d("days", 0);
      d("hours", 0);
      d("minutes", 0);
      d("seconds", 0);
      clearInterval(countdownInterval);
    }
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  function initGallery() {
    const thumbnails = document.querySelectorAll(".thumbnail-card");
    const mainImage = document.getElementById("mainGalleryImage");
    const mainVideo = document.getElementById("mainGalleryVideo");

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        thumbnails.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        let newSrc = this.dataset.image;
        const isVideo = newSrc.endsWith(".mp4") || newSrc.endsWith(".webm") || newSrc.endsWith(".ogg");
        // Se não começar com 'assets/', adiciona
        if (!newSrc.startsWith('assets/')) {
          newSrc = 'assets/' + newSrc;
        }

        mainImage.style.opacity = "0";
        mainVideo.style.opacity = "0";
        mainImage.style.transform = "scale(1.05)";
        mainVideo.style.transform = "scale(1.05)";

        setTimeout(() => {
          if (isVideo) {
            mainImage.style.display = "none";
            mainVideo.src = newSrc;
            mainVideo.style.display = "block";
            mainVideo.play();
          } else {
            mainVideo.pause();
            mainVideo.style.display = "none";
            mainImage.src = newSrc;
            mainImage.style.display = "block";
          }

          const target = isVideo ? mainVideo : mainImage;
          target.style.opacity = "1";
          target.style.transform = "scale(1)";
        }, 300);
      });

      thumbnail.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1) translateY(-5px)";
        this.style.boxShadow = "0 10px 25px rgba(255, 255, 255, 0.3)";
      });

      thumbnail.addEventListener("mouseleave", function () {
        if (!this.classList.contains("active")) {
          this.style.transform = "scale(1)";
          this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
        } else {
          this.style.transform = "scale(1.08)";
          this.style.boxShadow = "0 8px 20px rgba(255, 255, 255, 0.2)";
        }
      });
    });

    if (thumbnails.length > 0) {
      thumbnails[0].click();
    }
  }

  function initAwardsAnimations() {
    const awardCards = document.querySelectorAll(".award-card");
    awardCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {});
      card.addEventListener("mouseleave", () => {});
    });
  }

  function initScrollAnimations() {
    const sections = document.querySelectorAll(".section-snap");
    const observerOptions = {
      threshold: 0.4,
      rootMargin: "0px 0px -10% 0px",
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const animatedElements = entry.target.querySelectorAll(
          ".animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right"
        );

        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          animatedElements.forEach((el) => {
            el.style.animationPlayState = "running";
          });
        } else {
          entry.target.classList.remove("is-in-view");
          animatedElements.forEach((el) => {
            el.style.animationPlayState = "paused";
            el.style.opacity = "0";
            if (el.classList.contains("animate-fade-in-up"))
              el.style.transform = "translateY(50px)";
            if (el.classList.contains("animate-slide-in-left"))
              el.style.transform = "translateX(-100px)";
            if (el.classList.contains("animate-slide-in-right"))
              el.style.transform = "translateX(100px)";
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section-snap");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - window.innerHeight / 2) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  initGallery();
  initAwardsAnimations();
  initScrollAnimations();
});
