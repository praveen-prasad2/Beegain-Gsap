gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin( DrawSVGPlugin);
gsap.defaults({ ease: Linear.easeNone });
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn, scope) {
    for (var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  };
}
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
function Grow() {
  var self = this;
  this.desktop = {
    scrollTweenObject: null,
    animationActive: !1,
    animations: [],
    initScrollTween: function () {
      self.desktop.viewport = document.querySelector("#viewport");
      self.desktop.world = document.querySelector("#world");
      self.desktop.bee = document.querySelector("#bee");
      gsap.set(self.desktop.bee, { xPercent: -50, yPercent: -50 });
      self.desktop.setX = gsap.quickSetter(self.desktop.world, "x", "px");
      self.desktop.setY = gsap.quickSetter(self.desktop.world, "y", "px");
      self.desktop.setOrigin = gsap.quickSetter(
        self.desktop.world,
        "transformOrigin"
      );
      self.desktop.beeProps = gsap.getProperty(self.desktop.bee);
    },
    refreshScrollTween: function () {
      self.desktop.vw = window.innerWidth;
      self.desktop.vh = window.innerHeight;
      self.desktop.worldWidth = self.desktop.world.offsetWidth;
      self.desktop.worldHeight = self.desktop.world.offsetHeight;
      self.desktop.clampX = gsap.utils.clamp(
        0,
        self.desktop.worldWidth - self.desktop.vw
      );
      self.desktop.clampY = gsap.utils.clamp(
        0,
        self.desktop.worldHeight - self.desktop.vh
      );
      if ($("body").hasClass("scrollPathDisabled")) {
        return !1;
      }
      var progress = 0;
      if (self.desktop.scrollTweenObject != null) {
        progress = self.desktop.scrollTweenObject.progress();
        self.desktop.scrollTweenObject.totalProgress(0).clear();
      }
      self.desktop.scrollTweenObject = self.desktop.createScrollTween();
      self.desktop.scrollTweenObject.progress(progress);
    },
    createScrollTween: function () {
      var scrollTweenObject = gsap.timeline({
        scrollTrigger: {
          trigger: "#viewport",
          pin: "#viewport",
          start: "top top",
          id: "scene",
          markers: true,
          scrub: !0,
          end: function () {
            return "+=" + self.desktop.worldHeight;
          },
        },
      });


self.desktop.clampX = gsap.utils.clamp(
  0,
  self.desktop.worldWidth - self.desktop.vw
);
self.desktop.clampY = gsap.utils.clamp(
  0,
  self.desktop.worldHeight - self.desktop.vh
);

scrollTweenObject.to(self.desktop.bee, {
  motionPath: {
    path: "#scrollPath",
    align: "#scrollPath",
    autoRotate: true,
    start: 1,
    end: 0,
  },
  ease: "linear",
  onUpdate: function () {
    const x = self.desktop.beeProps("x");
    const y = self.desktop.beeProps("y");
    const clampedX = self.desktop.clampX(x - self.desktop.vw / 2);
    const clampedY = self.desktop.clampY(y - self.desktop.vh / 2);

    console.log("x:", x, "clampedX:", clampedX, "y:", y, "clampedY:", clampedY);
    self.desktop.setOrigin(clampedX + "px " + clampedY + "px");
    self.desktop.setX(-clampedX);
    self.desktop.setY(-clampedY);
  },
});
      return scrollTweenObject;
    },
    screen1: function () {
      var screen1 = new TimelineMax();
      screen1
        .fromTo(
          "#line1_1",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 400 }
        )
        .fromTo(
          "#line1_2",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 600 }
        );
      self.desktop.animations[1] = screen1;
      return screen1;
    },
    screen2: function () {
      var screen2 = new TimelineMax();
      screen2
        .fromTo(
          "#line2_1",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 75 }
        )
        .fromTo(
          "#line2_2",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 100 }
        )
        .fromTo(
          "#line2_3",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 425 }
        )
        .fromTo(
          "#line2_4",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 50 }
        )
        .fromTo(
          "#line2_5",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 100 }
        );
      screen2.cleanUpObjects = [];
      var criteria = document.querySelectorAll(".screen2__criteria__item");
      var criteriaDuration = 250 / (criteria.length * 4);
      criteria.forEach(function (each, index) {
        var iconBorder = each.querySelector(
          ".screen2__criteria__item__icon__border"
        );
        var iconTick = each.querySelector(
          ".screen2__criteria__item__icon__tick"
        );
        var text = each.querySelector(".screen2__criteria__item__text");
        var line = each.querySelector(".screen3__criteria__item__after__line");
        screen2.cleanUpObjects.push(iconBorder, iconTick, text, line);
        screen2
          .fromTo(
            iconBorder,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: criteriaDuration }
          )
          .fromTo(
            iconTick,
            { opacity: 0 },
            { opacity: 1, duration: criteriaDuration }
          )
          .fromTo(
            text,
            { xPercent: 10, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: criteriaDuration }
          )
          .fromTo(
            line,
            { xPercent: 10, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: criteriaDuration }
          );
      });
      screen2.fromTo(".screen2", {}, { duration: 0 });
      self.desktop.animations[2] = screen2;
      return screen2;
    },
    screen3: function () {
      var screen3 = new TimelineMax();
      screen3
        .fromTo(
          "#line3_1",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 350 }
        )
        .fromTo(
          "#line3_2",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 225 }
        )
        .fromTo(
          "#line3_3",
          { drawSVG: "0%", fill: "none" },
          { drawSVG: "100%", fill: "#ffbd62", duration: 225 }
        )
        .fromTo(
          "#line3_4",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 200 }
        );
      screen3.cleanUpObjects = ["#line3_3"];
      self.desktop.animations[3] = screen3;
      return screen3;
    },

    registerAnimations: function () {
      var master = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene1",
          id: "main",
          scrub: !0,
          start: "top top",
          end: function () {
            return "+=" + self.desktop.worldHeight;
          },
        },
      });
      var screen1 = self.desktop.screen1();
      var screen2 = self.desktop.screen2();
      var screen3 = self.desktop.screen3();

      screen1.duration(350);
      screen2.duration(1250);
      screen3.duration(1000);

      self.desktop.master = master;
      self.desktop.animationActive = !0;
      if (document.body.className.indexOf("laInit") !== -1) {
        document.body.className += " laInit";
      }
      document.body.classList.add("laInit");
      return master;
    },
    killAnimations: function () {
      if (self.desktop.scrollTweenObject != null) {
        self.desktop.scrollTweenObject.totalProgress(0).clear();
        self.desktop.scrollTweenObject.scrollTrigger.kill(!0);
        self.desktop.scrollTweenObject.kill();
      }
      self.desktop.master.scrollTrigger.kill(!0);
      self.desktop.master.kill(!0);
      gsap.set(self.desktop.viewport, { clearProps: !0 });
      gsap.set(self.desktop.world, { clearProps: !0 });
      self.desktop.animations.forEach(function (item, index) {
        if (
          typeof self.desktop.animations[index].cleanUpObjects != "undefined"
        ) {
          gsap.set(self.desktop.animations[index].cleanUpObjects, {
            clearProps: !0,
          });
        }
      });
      self.desktop.animationActive = !1;
    },
  };

  // Mobile Animtion

  this.mobile = {
    animationActive: !1,
    animations: [],
    screen1Animations: function () {
      var screen1 = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".screen1",
            scrub: !0,
            start: "top top",
            end: "bottom center",
            id: "screen1",
          },
        })
        .fromTo(
          "#mline1_1",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 400 }
        )
        .fromTo(
          "#mline1_2",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 500 }
        )
        .fromTo(
          "#mline1_3",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 100 }
        );
      self.mobile.animations[1] = screen1;
    },
    screen2Animations: function () {
      var screen2 = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".screen2",
            scrub: !0,
            start: "top center",
            end: "bottom center",
            id: "screen2",
          },
        })
        .fromTo(
          "#mline2_1",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 300 }
        )
        .fromTo(
          "#mline2_2",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 100 }
        )
        .fromTo(
          "#mline2_3",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 300 }
        );
      screen2.cleanUpObjects = [];
      var criteria = document.querySelectorAll(".screen2__criteria__item");
      var criteriaDuration = 300 / (criteria.length * 4);
      criteria.forEach(function (each, index) {
        var iconBorder = each.querySelector(
          ".screen2__criteria__item__icon__border"
        );
        var iconTick = each.querySelector(
          ".screen2__criteria__item__icon__tick"
        );
        var text = each.querySelector(".screen2__criteria__item__text");
        var line = each.querySelector(".screen3__criteria__item__after__line");
        screen2.cleanUpObjects.push(iconBorder, iconTick, text, line);
        screen2
          .fromTo(
            iconBorder,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: criteriaDuration }
          )
          .fromTo(
            iconTick,
            { opacity: 0 },
            { opacity: 1, duration: criteriaDuration }
          )
          .fromTo(
            text,
            { xPercent: 10, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: criteriaDuration }
          )
          .fromTo(
            line,
            { xPercent: 10, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: criteriaDuration }
          );
      });
      self.mobile.animations[2] = screen2;
    },
    screen3Animations: function () {
      var screen3 = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".screen3",
            scrub: !0,
            start: "top center",
            end: "bottom center",
            id: "screen3",
          },
        })
        .fromTo(
          "#mline3_1",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 250 }
        )
        .fromTo(
          "#mline3_2",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 250 }
        )
        .fromTo(
          "#line3_3",
          { drawSVG: "0%", fill: "none" },
          { drawSVG: "100%", fill: "#ffbd62", duration: 250 }
        )
        .fromTo(
          "#mline3_4",
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 250 }
        );
      screen3.cleanUpObjects = ["#line3_3"];
      self.mobile.animations[3] = screen3;
    },

    registerAnimations: function () {
      self.mobile.screen1Animations();
      self.mobile.screen2Animations();
      self.mobile.screen3Animations();
      self.mobile.animationActive = !0;
      if (document.body.className.indexOf("laInit") !== -1) {
        document.body.className += " laInit";
      }
      document.body.classList.add("laInit");
    },
    killAnimations: function () {
      self.mobile.animations.forEach(function (item, index) {
        if (self.mobile.animations[index].scrollTrigger != null) {
          self.mobile.animations[index].scrollTrigger.kill(!0);
        }
        self.mobile.animations[index].kill(!0);
        if (
          typeof self.mobile.animations[index].cleanUpObjects != "undefined"
        ) {
          gsap.set(self.mobile.animations[index].cleanUpObjects, {
            clearProps: !0,
          });
        }
      });
      self.mobile.animationActive = !1;
    },
  };
}
