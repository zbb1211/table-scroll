
(function ($) {
    var TableScroll = function (option) {
        this.$ele = option.$element;
        this.width = option.width;
        this.height = option.height;
    };
    TableScroll.prototype = {
        constructor: TableScroll,
        init: function () {
            var $outWrapper = $('<div class="outWrapper" style="width:' + this.width + 'px;margin: 0 auto;"></div>');
            $("body").append($outWrapper);
            var $thead = $('<table class="scrollThead"></table>')
            $thead.append(this.$ele.find("thead").clone(true));
            $outWrapper.append($thead);
            this.$ele.find("thead").remove();
            var $scrollWrapper = $('<div class="scrollWrapper" style="width:100%;height:' + this.height + 'px;overflow: hidden;"></div>');
            var $scrollInner = $('<div class="scrollInner"></div>');
            $scrollInner.append(this.$ele)
            $scrollWrapper.append($scrollInner);
            $outWrapper.append($scrollWrapper);
        },
        scroll: function () {
            var self = this;
            var len = self.$ele.find("tr").length;
            var wrapperHeight = self.height;
            var wrapperWidth = self.width;
            var scrollInner = self.$ele.parent();
            var scrollWrapper = self.$ele.parent().parent();
            var tdHeight = self.$ele.find("tr").eq(0).height();
            var tableHeight = self.$ele.height();
            if (tdHeight * len > wrapperHeight) {
                scrollWrapper.width(wrapperWidth + 17);
                scrollInner.height(wrapperHeight - 2);
            } else {
                scrollInner.height(tableHeight);
                scrollWrapper.width(wrapperWidth);
            }
        }
    };
    $.fn.tablescroll = function (option) {
        var defaults = {
            $element: this,
            width: 800,
            height: 300
        };
        var settings = $.extend({}, defaults, option);
        var t = new TableScroll(settings);
        t.init();
        t.scroll();
        return this;
    };
})(jQuery);