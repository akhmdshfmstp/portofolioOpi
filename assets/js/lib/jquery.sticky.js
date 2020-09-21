/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Project:  cv@0.2.2 - Modern CV, Resume and Portfolio website
 * Homepage: https://github.com/tbaltrushaitis/cv
 * License:  MIT
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 */
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    var e = Array.prototype.slice,
        i = Array.prototype.splice,
        n = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: !1,
            getWidthFrom: "",
            widthFromWrapper: !0,
            responsiveWidth: !1,
            zIndex: "auto"
        },
        r = t(window),
        s = t(document),
        o = [],
        c = r.height(),
        a = function() {
            for (var e = r.scrollTop(), i = s.height(), n = i - c, a = e > n ? n - e : 0, p = 0, d = o.length; p < d; p++) {
                var l = o[p],
                    h = l.stickyWrapper.offset().top - l.topSpacing - a;
                if (l.stickyWrapper.css("height", l.stickyElement.outerHeight()), e <= h) null !== l.currentTop && (l.stickyElement.css({
                    width: "",
                    position: "",
                    top: "",
                    "z-index": ""
                }), l.stickyElement.parent().removeClass(l.className), l.stickyElement.trigger("sticky-end", [l]), l.currentTop = null);
                else {
                    var u, g = i - l.stickyElement.outerHeight() - l.topSpacing - l.bottomSpacing - e - a;
                    if (g < 0 ? g += l.topSpacing : g = l.topSpacing, l.currentTop !== g) l.getWidthFrom ? u = t(l.getWidthFrom).width() || null : l.widthFromWrapper && (u = l.stickyWrapper.width()), null == u && (u = l.stickyElement.width()), l.stickyElement.css("width", u).css("position", "fixed").css("top", g).css("z-index", l.zIndex), l.stickyElement.parent().addClass(l.className), null === l.currentTop ? l.stickyElement.trigger("sticky-start", [l]) : l.stickyElement.trigger("sticky-update", [l]), l.currentTop === l.topSpacing && l.currentTop > g || null === l.currentTop && g < l.topSpacing ? l.stickyElement.trigger("sticky-bottom-reached", [l]) : null !== l.currentTop && g === l.topSpacing && l.currentTop < g && l.stickyElement.trigger("sticky-bottom-unreached", [l]), l.currentTop = g;
                    var m = l.stickyWrapper.parent();
                    l.stickyElement.offset().top + l.stickyElement.outerHeight() >= m.offset().top + m.outerHeight() && l.stickyElement.offset().top <= l.topSpacing ? l.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0).css("z-index", "") : l.stickyElement.css("position", "fixed").css("top", g).css("bottom", "").css("z-index", l.zIndex)
                }
            }
        },
        p = function() {
            c = r.height();
            for (var e = 0, i = o.length; e < i; e++) {
                var n = o[e],
                    s = null;
                n.getWidthFrom ? n.responsiveWidth && (s = t(n.getWidthFrom).width()) : n.widthFromWrapper && (s = n.stickyWrapper.width()), null != s && n.stickyElement.css("width", s)
            }
        },
        d = {
            init: function(e) {
                return this.each(function() {
                    var i = t.extend({}, n, e),
                        r = t(this),
                        s = r.attr("id"),
                        c = s ? s + "-" + n.wrapperClassName : n.wrapperClassName,
                        a = t("<div></div>").attr("id", c).addClass(i.wrapperClassName);
                    r.wrapAll(function() {
                        if (0 == t(this).parent("#" + c).length) return a
                    });
                    var p = r.parent();
                    i.center && p.css({
                        width: r.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    }), "right" === r.css("float") && r.css({
                        float: "none"
                    }).parent().css({
                        float: "right"
                    }), i.stickyElement = r, i.stickyWrapper = p, i.currentTop = null, o.push(i), d.setWrapperHeight(this), d.setupChangeListeners(this)
                })
            },
            setWrapperHeight: function(e) {
                var i = t(e),
                    n = i.parent();
                n && n.css("height", i.outerHeight())
            },
            setupChangeListeners: function(t) {
                window.MutationObserver ? new window.MutationObserver(function(e) {
                    (e[0].addedNodes.length || e[0].removedNodes.length) && d.setWrapperHeight(t)
                }).observe(t, {
                    subtree: !0,
                    childList: !0
                }) : window.addEventListener ? (t.addEventListener("DOMNodeInserted", function() {
                    d.setWrapperHeight(t)
                }, !1), t.addEventListener("DOMNodeRemoved", function() {
                    d.setWrapperHeight(t)
                }, !1)) : window.attachEvent && (t.attachEvent("onDOMNodeInserted", function() {
                    d.setWrapperHeight(t)
                }), t.attachEvent("onDOMNodeRemoved", function() {
                    d.setWrapperHeight(t)
                }))
            },
            update: a,
            unstick: function(e) {
                return this.each(function() {
                    for (var e = t(this), n = -1, r = o.length; r-- > 0;) o[r].stickyElement.get(0) === this && (i.call(o, r, 1), n = r); - 1 !== n && (e.unwrap(), e.css({
                        width: "",
                        position: "",
                        top: "",
                        float: "",
                        "z-index": ""
                    }))
                })
            }
        };
    window.addEventListener ? (window.addEventListener("scroll", a, !1), window.addEventListener("resize", p, !1)) : window.attachEvent && (window.attachEvent("onscroll", a), window.attachEvent("onresize", p)), t.fn.sticky = function(i) {
        return d[i] ? d[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : d.init.apply(this, arguments)
    }, t.fn.unstick = function(i) {
        return d[i] ? d[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : d.unstick.apply(this, arguments)
    }, t(function() {
        setTimeout(a, 0)
    })
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Package:  cv@0.2.2
 * Build:    production-b76
 * Compiled: 2019-05-05T11:53:12 UTC
 * Commit:   854391a90d7eb3a4d553e2c6f7868d6612a13f7c
 */