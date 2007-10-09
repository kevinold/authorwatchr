var aw = {

    hideCompleteReviews : function () {
        $('.result p.moreInfo')
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
                            .show("slow");
                },function(){
                        $(this)
                        .html("Read&#160;on&#8230;")
                        .title("Click to show further details")
                        .parent()
                                .next()
                                        .hide("slow");
                });
    },
    loadMyAuthors : function() {
        $.getJSON('/user/list_authors',
            function(json) {
                var myauthors = json.myauthors;
                $("#my_authors ul").html('');
                $.each(myauthors, function(i) {
                    $("#my_authors ul").append('<li><a href="/search/na?author=' + encodeURI(this.name) + '">' + this.name + '</a></li>');
                });
                
                /*
                $("#my_authors a")
                .each(function(){
                    var author = $(this).html();
                    $(this).click( function() {
                        $.post('/search/aws', { author: author });
                        return false;
                    });
                });
                */

            }
        );

    }
};

$(aw.hideCompleteReviews);
$(aw.loadMyAuthors);
