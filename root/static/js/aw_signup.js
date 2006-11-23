var aw_signup = {
   checkUserName : function() {
        $("#signup #username")
        .keyup(function(){
            if ( this.value.match(/^[A-Za-z0-9_]+$/) && this.value.length > 2 ) {
            $.post('/signup/cu', { username: $(this).val() },
                function(data) {
                    var jqLabel = $("#signup #username").prev('label');
                    
                    //var label = jqLabel[0];
                    var msg, cn;
                    if ( data == 1 ) {
                        msg = 'Username is not available';
                        cn = 'error';
                    }
                    else {
                        msg = 'Username is available';
                        cn = 'valid';
                    }

                    //Append message to label
                    jqLabel.html('Username: ' + msg);
                    jqLabel.attr("class",cn);
                }
            )
            } //end if
            else {
                var jqLabel = $("#signup #username").prev('label');
                jqLabel.html('Username: Minimum 3 characters and contain A-Z, a-z ,0-9 and underscore (_)');
                jqLabel.attr("class","error");
            }
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
