/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Project:  cv@0.2.2 - Modern CV, Resume and Portfolio website
 * Homepage: https://github.com/tbaltrushaitis/cv
 * License:  MIT
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 */
"use strict";

function polyfill() {
    var o = window,
        l = document;
    if (!("scrollBehavior" in l.documentElement.style && !0 !== o.__forceSmoothScrollPolyfill__)) {
        var t = o.HTMLElement || o.Element,
            e = 468,
            r = {
                scroll: o.scroll || o.scrollTo,
                scrollBy: o.scrollBy,
                elementScroll: t.prototype.scroll || scrollElement,
                scrollIntoView: t.prototype.scrollIntoView
            },
            s = o.performance && o.performance.now ? o.performance.now.bind(o.performance) : Date.now,
            i = function isMicrosoftBrowser(o) {
                return new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(o)
            }(o.navigator.userAgent) ? 1 : 0;
        o.scroll = o.scrollTo = function() {
            void 0 !== arguments[0] && (!0 !== shouldBailOut(arguments[0]) ? smoothScroll.call(o, l.body, void 0 !== arguments[0].left ? ~~arguments[0].left : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : o.scrollY || o.pageYOffset) : r.scroll.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : o.scrollY || o.pageYOffset))
        }, o.scrollBy = function() {
            void 0 !== arguments[0] && (shouldBailOut(arguments[0]) ? r.scrollBy.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : smoothScroll.call(o, l.body, ~~arguments[0].left + (o.scrollX || o.pageXOffset), ~~arguments[0].top + (o.scrollY || o.pageYOffset)))
        }, t.prototype.scroll = t.prototype.scrollTo = function() {
            if (void 0 !== arguments[0])
                if (!0 !== shouldBailOut(arguments[0])) {
                    var o = arguments[0].left,
                        l = arguments[0].top;
                    smoothScroll.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === l ? this.scrollTop : ~~l)
                } else {
                    if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                    r.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                }
        }, t.prototype.scrollBy = function() {
            void 0 !== arguments[0] && (!0 !== shouldBailOut(arguments[0]) ? this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior
            }) : r.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
        }, t.prototype.scrollIntoView = function() {
            if (!0 !== shouldBailOut(arguments[0])) {
                var t = function findScrollableParent(o) {
                        for (; o !== l.body && !1 === isScrollable(o);) o = o.parentNode || o.host;
                        return o
                    }(this),
                    e = t.getBoundingClientRect(),
                    s = this.getBoundingClientRect();
                t !== l.body ? (smoothScroll.call(this, t, t.scrollLeft + s.left - e.left, t.scrollTop + s.top - e.top), "fixed" !== o.getComputedStyle(t).position && o.scrollBy({
                    left: e.left,
                    top: e.top,
                    behavior: "smooth"
                })) : o.scrollBy({
                    left: s.left,
                    top: s.top,
                    behavior: "smooth"
                })
            } else r.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
        }
    }

    function scrollElement(o, l) {
        this.scrollLeft = o, this.scrollTop = l
    }

    function shouldBailOut(o) {
        if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0;
        if ("object" == typeof o && "smooth" === o.behavior) return !1;
        throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.")
    }

    function hasScrollableSpace(o, l) {
        return "Y" === l ? o.clientHeight + i < o.scrollHeight : "X" === l ? o.clientWidth + i < o.scrollWidth : void 0
    }

    function canOverflow(l, t) {
        var e = o.getComputedStyle(l, null)["overflow" + t];
        return "auto" === e || "scroll" === e
    }

    function isScrollable(o) {
        var l = hasScrollableSpace(o, "Y") && canOverflow(o, "Y"),
            t = hasScrollableSpace(o, "X") && canOverflow(o, "X");
        return l || t
    }

    function step(l) {
        var t, r, i, c = (s() - l.startTime) / e;
        t = function ease(o) {
            return .5 * (1 - Math.cos(Math.PI * o))
        }(c = c > 1 ? 1 : c), r = l.startX + (l.x - l.startX) * t, i = l.startY + (l.y - l.startY) * t, l.method.call(l.scrollable, r, i), r === l.x && i === l.y || o.requestAnimationFrame(step.bind(o, l))
    }

    function smoothScroll(t, e, i) {
        var c, n, f, a, p = s();
        t === l.body ? (c = o, n = o.scrollX || o.pageXOffset, f = o.scrollY || o.pageYOffset, a = r.scroll) : (c = t, n = t.scrollLeft, f = t.scrollTop, a = scrollElement), step({
            scrollable: c,
            method: a,
            startTime: p,
            startX: n,
            startY: f,
            x: e,
            y: i
        })
    }
}
"object" == typeof exports && "undefined" != typeof module ? module.exports = {
    polyfill: polyfill
} : polyfill();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Package:  cv@0.2.2
 * Build:    production-b76
 * Compiled: 2019-05-05T11:53:12 UTC
 * Commit:   854391a90d7eb3a4d553e2c6f7868d6612a13f7c
 */