var aw_signup = {
   checkUserName : function() {
        $("#signup #username")
        .keyup(function(){
            $.post('/signup/cu', { username: $(this).val() },
                function(data) {
                    //alert(data);
                    //$("#my_authors").html('');
                }
            )
        });
   }
    /*
    loadMyAuthors : function() {
        $.getJSON('/user/list_authors',
            function(json) {
                var myauthors = json.myauthors;
                $("#my_authors").html('');
                $.each(myauthors, function(i) {
                    $("#my_authors").append( this.name + "<br>" );
                });
            }
        )
    }
    */ 
};

//$(aw.hideCompleteReviews);
//$(aw_signup.checkUserName);
