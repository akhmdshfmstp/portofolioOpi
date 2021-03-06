/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Project:  cv@0.2.2 - Modern CV, Resume and Portfolio website
 * Homepage: https://github.com/tbaltrushaitis/cv
 * License:  MIT
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 */
window.jQuery(function(e) {
    "use strict";
    var t, i;
    e(document).ready(function() {
            e("#pre-status").fadeOut(), e("#tt-preloader").delay(150).fadeOut("slow")
        }), e('a[href*="#"]').bind("click", function(t) {
            var i = e(this);
            e("html, body").stop().animate({
                scrollTop: e(i.attr("href")).offset().top
            }, 1e3), t.preventDefault()
        }), e(".tt-fullHeight").height(e(window).height()), e(window).resize(function() {
            e(".tt-fullHeight").height(e(window).height())
        }), e(".header").sticky({
            topSpacing: 0
        }), e("body").scrollspy({
            target: ".navbar-custom",
            offset: 70
        }), e(window).scroll(function() {
            e(this).scrollTop() > 100 ? e(".scroll-up").fadeIn() : e(".scroll-up").fadeOut()
        }), e(".count-wrap").bind("inview", function(t, i, o, a) {
            e(this).find(".timer").each(function() {
                var t = e(this);
                i ? e({
                    Counter: 0
                }).animate({
                    Counter: t.data("original-text")
                }, {
                    duration: 2e3,
                    easing: "swing",
                    step: function() {
                        t.text(Math.ceil(this.Counter))
                    }
                }) : (e({
                    Counter: 0
                }), t.text(Math.ceil(t.data("original-text"))))
            })
        }), e(".skill-progress").bind("inview", function(t, i, o, a) {
            i && e.each(e("div.progress-bar"), function() {
                e(this).css("width", null).css("width", e(this).attr("aria-valuenow") + "%")
            })
        }), e(".more-skill").bind("inview", function(t, i, o, a) {
            i && e(".chart").easyPieChart({
                easing: "easeOut",
                barColor: "#68c3a3",
                delay: 2500,
                lineWidth: 8,
                rotate: 0,
                scaleColor: !1,
                size: 140,
                trackColor: "#3a4149",
                animate: {
                    duration: 2500,
                    enabled: !0
                },
                onStep: function(e, t, i) {
                    this.el.children[0].innerHTML = Math.round(i)
                }
            })
        }), t = e("#og-grid"), i = new window.Shuffle(t, {
            itemSelector: ".portfolio-item"
        }), e("#filter a").click(function(t) {
            t.preventDefault(), e("#filter a").removeClass("active"), e(this).addClass("active");
            var o = e(this).attr("data-group");
            i.filter(o)
        }), e(".image-link").magnificPopup({
            gallery: {
                enabled: !0
            },
            removalDelay: 300,
            mainClass: "mfp-with-zoom",
            type: "image"
        }), new window.WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            scrollContainer: null,
            resetAnimation: !1,
            callback: function(e) {}
        }).init(), e("#contactForm").on("submit", function(t) {
            t.preventDefault(), console.log("contactForm SUBMIT Action");
            var i = e(this).prop("action"),
                o = e(this).serialize(),
                a = e(this);
            a.prevAll(".alert").remove(), e.post(i, o, function(e) {
                "error" === e.response && a.before('<div class="alert alert-danger">' + e.message + "</div>"), "success" === e.response && (a.before('<div class="alert alert-success">' + e.message + "</div>"), a.find("input, textarea").val(""))
            }, "json")
        }),
        function() {
            let e, t, i, o, a, n, l, s, r;
            t = parseFloat("50.436336"), i = parseFloat("30.488619"), o = [{
                featureType: "landscape",
                stylers: [{
                    color: "#f7f7f7"
                }]
            }, {
                featureType: "road",
                stylers: [{
                    hue: "#fff"
                }, {
                    saturation: -70
                }]
            }, {
                featureType: "poi",
                stylers: [{
                    hue: ""
                }]
            }]
        }()
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Package:  cv@0.2.2
 * Build:    production-b76
 * Compiled: 2019-05-05T11:53:12 UTC
 * Commit:   854391a90d7eb3a4d553e2c6f7868d6612a13f7c
 */