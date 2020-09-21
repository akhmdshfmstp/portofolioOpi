/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Project:  cv@0.2.2 - Modern CV, Resume and Portfolio website
 * Homepage: https://github.com/tbaltrushaitis/cv
 * License:  MIT
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 */
! function(e, t) {
    "object" == typeof exports ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : t(e.jQuery)
}(this, function(e) {
    var t = function(e, t) {
            var a, n = document.createElement("canvas");
            e.appendChild(n), "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(n);
            var i = n.getContext("2d");
            n.width = n.height = t.size;
            var r = 1;
            window.devicePixelRatio > 1 && (r = window.devicePixelRatio, n.style.width = n.style.height = [t.size, "px"].join(""), n.width = n.height = t.size * r, i.scale(r, r)), i.translate(t.size / 2, t.size / 2), i.rotate((t.rotate / 180 - .5) * Math.PI);
            var o = (t.size - t.lineWidth) / 2;
            t.scaleColor && t.scaleLength && (o -= t.scaleLength + 2), Date.now = Date.now || function() {
                return +new Date
            };
            var s = function(e, t, a) {
                    var n = (a = Math.min(Math.max(-1, a || 0), 1)) <= 0;
                    i.beginPath(), i.arc(0, 0, o, 0, 2 * Math.PI * a, n), i.strokeStyle = e, i.lineWidth = t, i.stroke()
                },
                d = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60)
                },
                h = function() {
                    t.scaleColor && function() {
                        var e, a;
                        i.lineWidth = 1, i.fillStyle = t.scaleColor, i.save();
                        for (var n = 24; n > 0; --n) n % 6 == 0 ? (a = t.scaleLength, e = 0) : (a = .6 * t.scaleLength, e = t.scaleLength - a), i.fillRect(-t.size / 2 + e, 0, a, 1), i.rotate(Math.PI / 12);
                        i.restore()
                    }(), t.trackColor && s(t.trackColor, t.trackWidth || t.lineWidth, 1)
                };
            this.getCanvas = function() {
                return n
            }, this.getCtx = function() {
                return i
            }, this.clear = function() {
                i.clearRect(t.size / -2, t.size / -2, t.size, t.size)
            }, this.draw = function(e) {
                var n;
                t.scaleColor || t.trackColor ? i.getImageData && i.putImageData ? a ? i.putImageData(a, 0, 0) : (h(), a = i.getImageData(0, 0, t.size * r, t.size * r)) : (this.clear(), h()) : this.clear(), i.lineCap = t.lineCap, n = "function" == typeof t.barColor ? t.barColor(e) : t.barColor, s(n, t.lineWidth, e / 100)
            }.bind(this), this.animate = function(e, a) {
                var n = Date.now();
                t.onStart(e, a);
                var i = function() {
                    var r = Math.min(Date.now() - n, t.animate.duration),
                        o = t.easing(this, r, e, a - e, t.animate.duration);
                    this.draw(o), t.onStep(e, a, o), r >= t.animate.duration ? t.onStop(e, a) : d(i)
                }.bind(this);
                d(i)
            }.bind(this)
        },
        a = function(e, a) {
            var n = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                trackWidth: void 0,
                size: 110,
                rotate: 0,
                animate: {
                    duration: 1e3,
                    enabled: !0
                },
                easing: function(e, t, a, n, i) {
                    return (t /= i / 2) < 1 ? n / 2 * t * t + a : -n / 2 * (--t * (t - 2) - 1) + a
                },
                onStart: function(e, t) {},
                onStep: function(e, t, a) {},
                onStop: function(e, t) {}
            };
            n.renderer = t;
            var i = {},
                r = 0,
                o = function() {
                    for (var t in this.el = e, this.options = i, n) n.hasOwnProperty(t) && (i[t] = a && void 0 !== a[t] ? a[t] : n[t], "function" == typeof i[t] && (i[t] = i[t].bind(this)));
                    "string" == typeof i.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[i.easing]) ? i.easing = jQuery.easing[i.easing] : i.easing = n.easing, "number" == typeof i.animate && (i.animate = {
                        duration: i.animate,
                        enabled: !0
                    }), "boolean" != typeof i.animate || i.animate || (i.animate = {
                        duration: 1e3,
                        enabled: i.animate
                    }), this.renderer = new i.renderer(e, i), this.renderer.draw(r), e.dataset && e.dataset.percent ? this.update(parseFloat(e.dataset.percent)) : e.getAttribute && e.getAttribute("data-percent") && this.update(parseFloat(e.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(e) {
                return e = parseFloat(e), i.animate.enabled ? this.renderer.animate(r, e) : this.renderer.draw(e), r = e, this
            }.bind(this), this.disableAnimation = function() {
                return i.animate.enabled = !1, this
            }, this.enableAnimation = function() {
                return i.animate.enabled = !0, this
            }, o()
        };
    e.fn.easyPieChart = function(t) {
        return this.each(function() {
            var n;
            e.data(this, "easyPieChart") || (n = e.extend({}, t, e(this).data()), e.data(this, "easyPieChart", new a(this, n)))
        })
    }
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - *
 * Package:  cv@0.2.2
 * Build:    production-b76
 * Compiled: 2019-05-05T11:53:12 UTC
 * Commit:   854391a90d7eb3a4d553e2c6f7868d6612a13f7c
 */