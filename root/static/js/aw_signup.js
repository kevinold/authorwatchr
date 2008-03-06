var aw_signup = {
   checkUserName : function() {
        $("#signup #username")
        .keyup(function(){
            if ( this.value.match(/^[A-Za-z0-9_]+$/) && this.value.length > 2 ) {
            $.post('/signup/cu', { username: $(this).val() },
                function(json) {

                    var data = eval(json);
                    //var label = jqLabel[0];
                    var msg, cn;
                    if ( data["uexists"] == 1 ) {
                        msg = 'Username is not available';
                        cn = 'error';
                    }
                    else {
                        msg = 'Username is available';
                        cn = 'valid';
                    }

                    //Append message to label
                    var jqLabel = $("#signup #username").next('span');
                        jqLabel.html(msg);
                        jqLabel.attr("class",cn);
                }, 'json'
            )
            } //end if
            else {
                var jqLabel = $("#signup #username").next('span');
                    //jqLabel.html('Minimum 3 characters, containing A-Z, a-z ,0-9 and underscore (_)');
                    jqLabel.html('Invalid username');
                    jqLabel.attr("class","error");
            }
        });
   },

   checkPass : function() {
        $("#signup #password")
        .blur(function(){
            var jqLabel = $("#signup #password").next('span');
            if ( this.value.length > 2 ) {
                jqLabel.html('Ok');
                jqLabel.attr("class","valid");
            }
            else {
                jqLabel.html('Minimum 3 characters');
                jqLabel.attr("class","error");
            }
        });
   },

   confirmPass : function() {
        $("#signup #confirmpassword")
        .blur(function(){
            var jqLabel = $("#signup #confirmpassword").next('span');
            if ( this.value.length > 2 ) {
                var pw = $("#signup #password").val();
                var cpw = $("#signup #confirmpassword").val();
                if ( pw == cpw ) {
                    jqLabel.html('Ok');
                    jqLabel.attr("class","valid");
                }
                else {
                    jqLabel.html('Passwords do not match');
                    jqLabel.attr("class","error");
                }
            }
            else {
                jqLabel.html('Passwords do not match');
                jqLabel.attr("class","error");
            }
        });
   },

   checkFirstName : function() {
        $("#signup #first_name")
        .keyup(function(){
            var jqLabel = $("#signup #first_name").next('span');
            if ( this.value.match(/^[A-Za-z0-9_]+$/) && this.value.length > 2 ) {
                jqLabel.html('Ok');
                jqLabel.attr("class","valid");
            }
            else {
                //jqLabel.html('First Name: At least 2 characters and only contain A-Z, a-z ,0-9 and underscore (_)');
                jqLabel.html('First Name is required');
                jqLabel.attr("class","error");
            }
        });
   },

   checkLastName : function() {
        $("#signup #last_name")
        .keyup(function(){
            var jqLabel = $("#signup #last_name").next('span');
            if ( this.value.match(/^[A-Za-z0-9_]+$/) && this.value.length > 2 ) {
                jqLabel.html('Ok');
                jqLabel.attr("class","valid");
            }
            else {
                //jqLabel.html('Last Name: At least 2 characters and only contain A-Z, a-z ,0-9 and underscore (_)');
                jqLabel.html('Last Name is required');
                jqLabel.attr("class","error");
            }
        });
   },

   checkEmailAddress : function() {
        $("#signup #email_address")
        .keyup(function(){
            var jqLabel = $("#signup #email_address").next('span');
            if ( this.value.match(/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ) {
                jqLabel.html('Ok');
                jqLabel.attr("class","valid");
            }
            else {
                jqLabel.html('Invalid Email');
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

//return !value.match(/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
//$(aw.hideCompleteReviews);
//$(aw_signup.checkUserName);
