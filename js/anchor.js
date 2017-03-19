!function (a) {
    window.anchor = {
        settings: {
            transitionDuration: 2e3,
            transitionTimingFunction: "swing",
            labels: {error: "Couldn't find any section"}
        }, init: function (b) {
            return a(this).data("settings", a.extend(anchor.settings, b)), this.each(function () {
                var b = a(this);
                b.unbind("click").click(function (a) {
                    a.preventDefault(), anchor.jumpTo(anchor.getTopOffsetPosition(b), b.data("settings"))
                })
            })
        }, getTopOffsetPosition: function (b) {
            var c = b.attr("href"), d = a(a(c).get(0)), e = a(document).height(), f = a(window).height();
            if (!d || d.length < 1)throw new ReferenceError(anchor.settings.labels.error);
            return d.offset().top + f > e ? e - f : d.offset().top
        }, jumpTo: function (b, c) {
            var d = a("html, body");
            d.animate({scrollTop: b}, c.transitionDuration, c.transitionTimingFunction), d.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function (a) {
                (a.which > 0 || "mousedown" === a.type || "mousewheel" === a.type) && d.stop().unbind("scroll mousedown DOMMouseScroll mousewheel keyup")
            })
        }
    }, a.fn.anchor = function (b) {
        return anchor[b] ? anchor[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? a.error("Method " + b + " does not exist on jQuery.anchor") : anchor.init.apply(this, arguments)
    }
}(jQuery);

$("document").ready(
    function () {
        $("a[href*=#]").anchor({
            transitionDuration: 1200
        })
    }
);
