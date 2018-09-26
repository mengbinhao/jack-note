(function ($) {
    Preload.DEFAULTS = {
        order: 'unordered',
        each: null, //每张图片加载完成执行
        all: null //所有图片加载完成执行
    }
    function Preload(imgs, options) {
        this.imgs = imgs;
        this.opts = $.extend({}, Preload.DEFAULTS, options);
        if (this.opts.order === 'ordered') {
            this._ordered();
        } else {
            this._unordered();
        }
    }
    //无序加载
    Preload.prototype._unordered = function () {
        const imgs = this.imgs,
            opts = this.opts,
            len = imgs.length;
        let count = 0;

        $.each(imgs, function (index, src) {
            if (typeof src !== 'string') return;
            var imgObj = new Image();
            //add error event in case loading can not hide
            $(imgObj).on('load error', function () {
                if (opts.each && typeof opts.each === 'function') {
                    opts.each(count);
                }
                if (count >= len - 1) {
                    if (opts.all && typeof opts.all === 'function') {
                        opts.all();
                    }
                }
                count++;
            })
            imgObj.src = src
        });
    }

    //有序加载
    Preload.prototype.order = function () {
        const opts = this.opts,
            imgs = this.imgs,
            len = imgs.length;
        let count = 0;

        orderedload();

        function orderedload() {
            var imgObj = new Image();

            $(imgObj).on("load error", function () {
                if (opts.each && typeof opts.each === 'function') {
                    opts.each(count);
                }
                if (count >= len) {
                    if (opts.all && typeof opts.all === 'function') {
                        opts.all();
                    }
                } else {
                    orderedload();
                }
                count++;
            })
            imgObj.src = imgs[count];
        }
    }

    //$.fn.extend
    //$.extend
    $.extend({
        preload: function (imgs, opts) {
            new Preload(imgs, opts);
        }
    })
})(jQuery)