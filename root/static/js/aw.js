var aw = {

    hideCompleteReviews : function () {
        $("#author_results div.moreInfo")
        .each(function(){
            var hidInfoJObj = $(this);
            if (!$.browser.safari) {
                hidInfoJObj.hide();
            } else {
                hidInfoJObj.css({display:"none"});
            }
        })
        .prev()
                .find("button.toggler")
                .toggle(function() {
                        $(this)
                        .html("Hide&#160;text")
                        .title("Click to hide the details")
                        .parent()
                        .next()
                            .animate({height:"show"},1000,function(){
                                this.style.width=this.style.height='';
                                });
                },function(){
                        $(this)
                        .html("Read&#160;on&#8230;")
                        .title("Click to show further details")
                        .parent()
                                .next()
                                        .animate({height:"hide"},1000,function(){
                                            this.style.width=this.style.height='';
                                        });
                });
    }
};

$(aw.hideCompleteReviews);