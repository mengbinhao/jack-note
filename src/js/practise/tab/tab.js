; (function (window, $) {
    var _defultOriginal = {
        "triggerType": "click",
    };

    var _defult = {
        "triggerType": "mouseover",
        "effect": "default",
        "invoke": 1
    };

    var Tab = function (options) {
        this.init(options);

        //save params
        const el = $(this.el);
        this.tabItems = el.find("li");
        this.tabDivs = el.find("div.content-wrap>div.content-item");

        this.bindEvent(this.config.triggerType, _defultOriginal.triggerType);

        const auto = this.config.auto
        if (this.check(auto)) {
            this.setAutoPlay(auto);
        }

        const invoke = this.config.invoke
        if (this.check(invoke) && invoke < this.tabItems.length) {
            this.invoke(this.tabItems.eq(invoke - 1));
        }
    }

    Tab.prototype = {
        constructor: Tab,
        init(options) {
            const { el, ...opts } = options;
            if (!el || !(typeof el === 'string')) {
                throw new Error("please assign a valid dom")
            }
            const ele = document.querySelector(el)
            if (!ele) {
                throw new Error("please assign a valid dom selector")
            }
            this.el = $(ele);
            this.config = $.extend(_defult, opts);
        },
        bindEvent(type, defaultType) {
            //tab object
            const _this = this;
            if (type === 'mouseover') {
                this.tabItems.bind(type, function () {
                    _this.invoke($(this));
                })
                //incase assign triggerType is incorrect
            } else {
                this.tabItems.bind(defaultType, function () {
                    _this.invoke($(this));
                });
                //rest triggerType
                this.config.triggerType = defaultType;
            }
        },
        invoke(curItem) {
            const index = curItem.index();
            curItem.addClass('actived').siblings().removeClass('actived');
            if (this.config.effect === 'fade') {
                //add postion:absolute to resolve display issue
                this.tabDivs.eq(index).fadeIn().siblings().fadeOut();
            } else {
                this.tabDivs.eq(index).addClass('current').siblings().removeClass('current');
            }
            //async loop = index
            if (this.check(this.config.auto)) {
                this.loop = index;
            }
        },
        check(auto) {
            return auto && !Number.isNaN(auto) && Number.isFinite(auto)
                && Number.isInteger(auto) && auto > 0;
        },
        setAutoPlay(auto) {
            this.timer = null;
            this.loop = 0;
            this.autoPlay(auto);

            this.el.hover(() => {
                clearInterval(this.timer);
            }, () => {
                this.autoPlay(auto);
            });
        },
        autoPlay(auto) {
            this.timer = setInterval(() => {
                this.loop++;
                if (this.loop >= this.tabItems.length) {
                    this.loop = 0;
                }
                this.tabItems.eq(this.loop).trigger(this.config.triggerType);
            }, auto);
        }
    }
    window.Tab = Tab;
})(this, jQuery)