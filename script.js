const slider = function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const btnArrowLeft = document.querySelector(".slider__arrow-left");
  const btnArrowRight = document.querySelector(".slider__arrow-right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  //kaç adet slide'ımız varsa o kadar nokta ekledik
  const createDots = function () {
    slides.forEach(function (_, index) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        ` 
        <button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  //noktaların aktiflik durumu
  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (s) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translate(${(index - s) * 100}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    //noktaları oluşturduk
    createDots();
    //başlangıçta birinci noktayı aktif ettik
    activateDot(0);
    //tüm slide'ları index sayısı *100 yaparak sağa kaydırdık
    goToSlide(0);
  };

  init();

  //her right butona basınca bir sonraki slayta geçtik
  btnArrowRight.addEventListener("click", nextSlide);
  //her right butona basınca bir önceki slayta geçtik

  btnArrowLeft.addEventListener("click", prevSlide);

  //yön tuşları ile geçiş
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      //dot ların data-slide değerlerini slide değişkeninde tutuyoruz (data bir obje)
      const { slide } = e.target.dataset;
      activateDot(slide);
      goToSlide(slide);
    }
  });
};
slider();
