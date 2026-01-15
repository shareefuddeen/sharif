document.addEventListener("DOMContentLoaded", async () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin);


  if ("ScrollRestoration" in history) {
    history.ScrollRestoration = "manual"
  }

  window.scrollTo(0, 0)



  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length ? lenis.scrollTo(value) : lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
  });

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(min-width: 901px)", () => {
    const track = document.querySelector(".projects-grid");


    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".projects",
        start: "top top",
        end: () => "+=" + (track.scrollWidth - window.innerWidth),
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    const trackbg = document.querySelector(".projects");

    gsap.to(trackbg, {
      backgroundColor: "black",
      color: "white",
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 10%",
        end: () => `+=${window.innerWidth * 0.5}`,
        scrub: 1
      }
    });

  });



  let split
  document.fonts.ready.then(() => {
    split = SplitText.create(".split-chars", {
      type: "lines",
      autoSplit: true,
      mask: "lines"
    })

    splitQuote = SplitText.create(".qoute-text1", {
      type: "words",
      autoSplit: true,
      mask: "words"
    })

    gsap.from(splitQuote.words, {
      y: 60,
      duration: 1,
      stagger: 0.2,
      rotation: 8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: splitQuote.words,
        start: "center 70%",
        end: "top 30%",
        scrub: true,
        
      }
    })



    splitDrive = SplitText.create(".drive", {
      type: "words",
      autoSplit: true,
      mask: "words"
    })

    gsap.from(splitDrive.words, {
      y: 100,
      duration: 1,
      stagger: 0.2,
      rotation: 8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: splitDrive.words,
        start: "top 90%",
        end: "top 65%",
        scrub: true,
        
      }
    })



    splitGet = SplitText.create(".get", {
      type: "words",
      autoSplit: true,
      mask: "words"
    })

    gsap.from(splitGet.words, {
      y: 75,
      duration: 1,
      stagger: 0.2,
      rotation: 8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: splitGet.words,
        start: "top 90%",
        end: "top 65%",
        scrub: true,
        
      }
    })


    const name = SplitText.create(".sharif-text", {
      type: "lines",
      autoSplit: true,
      mask: "lines"
    })

    gsap.from(name.lines, {
      y: -140,
      duration: 1,
      stagger: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 10%",
        end: "top top",
        scrub: 1.5,
        
      }
    })


    gsap.from(".testimony", {
      x: -60,
      opacity: 0,
      rotation: 8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimony",
        start: "top center",
        end: "top 30%",
        scrub: 1.5,
        
      }
    })

    function reveal() {
      return {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out"
      }
    }

    const step = document.querySelectorAll(".step").forEach((el) => {
      el.style.background = el.dataset.bg
      el.style.color = el.dataset.col
    })
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".steps",
        start: "top 65%",
        end: "top -10%",
        scrub: 1.5,
              }
    })

    revealTl.to(".stp-1", reveal()).
      to(".stp-2", reveal()).
      to(".stp-3", reveal()).
      to(".stp-4", reveal())




    const body = document.body
    body.classList.add("scroll")
    const tl = gsap.timeline({ delay: 0.7, onComplete: () => { body.classList.remove("scroll") } });
    const overlaytexTl = gsap.timeline({ delay: 0.5 })
    const counterTl = gsap.timeline({ delay: 0.5 })
    const counterProgress = document.querySelector(".counter p")
    const counter = {
      value: 0
    }
    tl.fromTo(
      ".img",
      {
        y: 32,
        scale: 0.5,
        opacity: 0
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      }
    )
      .fromTo(
        ".hero-overlay-images",
        {
          gap: "5vw",
        },
        {
          gap: "1vw",
          duration: 1,
          ease: "power3.inOut"
        }
      )
      .fromTo(
        ".img:not(.hero-img)",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "power3.inOut"
        }
      ).to(".hero-img", {
        scale: 1.6,
        duration: 1,
        ease: "power2.out"
      })
      .fromTo(
        ".hero-overlay",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "power3.inOut"
        }
      ).from(split.lines, {
        y: 20,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5").to(".bar", {
        height: "22em",
        duration: 1,
        ease: "power2.out"
      }, "-=1").fromTo(".hello", {
        opacity: 0,
        scale: 0
      }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=1").fromTo(".hero-image", {
        opacity: 0,
        y: 32,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=1")


    overlaytexTl.fromTo(".overlay-text>p", {
      y: 20,
    }, {
      y: -5,
      duration: 1.3,
      ease: "power3.inOut"
    }).to(".overlay-text>p", {
      y: -33,
      duration: 1.3,
      ease: "power3.inOut"
    }).to(".overlay-text>p", {
      y: -56,
      duration: 1.3,
      ease: "power3.inOut"
    }).to(".overlay-text>p", {
      y: -86,
      duration: 1,
      ease: "power3.inOut"
    })

    counterTl.to(counter, {
      value: 100,
      duration: 4.2,
      ease: "power2.out",
      onUpdate: () => {
        counterProgress.textContent = Math.floor(counter.value) + "%"
      }
    })

    ScrollTrigger.refresh();

  })

  const about = document.getElementById("About")
  gsap.fromTo(".fadeup", {
    opacity: 0,
    y: 100
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: about,
      start: "top center",
      end: "center 30%",
      scrub: true,
          }
  })

  const services = document.getElementById("Services")
  gsap.fromTo(".fadeup-service", {
    opacity: 0,
    y: 100
  }, {
    opacity: 1,
    duration: 1,
    y: 0,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: services,
      start: "top center",
      end: "center 30%",
      scrub: true,
          }
  })

  const workTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".svg",
      start: "top center",
      end: "top top",
      scrub: true,
      
    }
  })

  workTl.fromTo(".svg", {
    x: 0,
  }, {
    x: window.innerWidth - 400,
    duration: 1,
    rotation: 360,
    ease: "power2.out"
  }).to(".svg", {
    y: 300,
    duration: 1,
    rotation: 260,
  })


  function initMobileSwipe() {
    if (window.innerWidth > 900) return;

    const track = document.querySelector(".projects-grid");
    const cards = gsap.utils.toArray(".project-card");

    let cardWidth = cards[0].offsetWidth;
    let gap = 20;
    let maxX = -(cards.length * (cardWidth + gap) - window.innerWidth);

    Draggable.create(track, {
      type: "x",
      inertia: true,
      bounds: { minX: maxX, maxX: 0 },
      edgeResistance: 0.85,
      snap: {
        x: (value) => Math.round(value / (cardWidth + gap)) * (cardWidth + gap)
      }
    });
  }

  initMobileSwipe();

  window.addEventListener("resize", () => {
    Draggable.get(".projects-track")?.kill();
    initMobileSwipe();
  });



});