document.addEventListener("DOMContentLoaded", () => {
  let parallax = document.querySelector(".parallax");
  if (parallax) {
    let parallaxContent = document.querySelector(".parallax__content");
    let imagesClouds = document.querySelector(".images__clouds");
    let imagesMountains = document.querySelector(".images__mountains");
    let imagesHuman = document.querySelector(".images__human");
    let forClouds = 40;
    let forMountains = 20;
    let forHuman = 10;
    let animationSpeed = 0.05;
    let positionX = 0;
    let positionY = 0;
    let coordXpercent = 0;
    let coordYpercent = 0;
    function setParalaxAnimation() {
      let distX = coordXpercent - positionX;
      let distY = coordYpercent - positionY;
      positionX = positionX + distX * animationSpeed;
      positionY = positionY + distY * animationSpeed;
      imagesClouds.style.cssText = `transform: translate(${
        positionX / forClouds
      }%, ${positionY / forClouds}%);`;
      imagesMountains.style.cssText = `transform: translate(${
        positionX / forMountains
      }%, ${positionY / forMountains}%);`;
      imagesHuman.style.cssText = `transform: translate(${
        positionX / forHuman
      }%, ${positionY / forHuman}%);`;
      requestAnimationFrame(setParalaxAnimation);
    }
    setParalaxAnimation();
    parallax.addEventListener("mousemove", function (event) {
      let parallaxWidth = parallax.offsetWidth;
      let parallaxHeight = parallax.offsetHeight;
      let coordX = event.pageX - parallaxWidth / 2;
      let coordY = event.pageY - parallaxHeight / 2;
      coordXpercent = (coordX / parallaxWidth) * 100;
      coordYpercent = (coordY / parallaxHeight) * 100;
    });
    let thresholdSets = [];
    for (let i = 0; i <= 1; i += 0.005) {
      thresholdSets.push(i);
    }
    function setParallaxStyle(scrollTopPercent){
      parallaxContent.style.cssText = `transform: translate(0%,-${scrollTopPercent / 9}%`;
      imagesMountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 6}%`;
      imagesHuman.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 3}%`;
    }
    let callback = function(entries, observer) {
      let scrollTopPercent = window.pageYOffset / parallax.offsetHeight * 100;
      setParallaxStyle(scrollTopPercent);
    };
    let observer = new IntersectionObserver(callback, {
      threshold: thresholdSets,
    });
    observer.observe(document.querySelector(".content"));
    }
});