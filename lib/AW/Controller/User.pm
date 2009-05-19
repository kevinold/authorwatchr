package AW::Controller::User;

use strict;
use warnings;
use base 'Catalyst::Controller::FormBuilder';
use Data::Dumper;

=head1 NAME

AW::Controller::User - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 index 

=cut

sub index : Private {
    my ( $self, $c ) = @_;
    $c->stash->{template} = 'user/index.tt2';
}

=head2 save_author

Save author to a users list

=cut

sub save_author : Local {
    my ( $self, $c ) = @_;

    #$c->stash->{template} = 'results.mhtml';
    #my $svalue = $c->req->param("autocomplete_parameter");
    my $id = $c->req->param("id");
    my $term = $c->req->param("value");
    $c->log->debug('term: ', $term);
    #$term =~ s/[^A-Za-z0-9 ]//g;

    my $user_id = $c->user->id;

    #Separate name into first and last name
    #my ( $fname, $lname ) = split / /, $term;
    #map { s/^\s+//g; s/\s+$//g; } $fname, $lname;

    # Find or create author trying to be added
    #my $author;
    #$author = $c->model('DB::Authors')->find_or_create(
    #    {   first_name => $fname,
    #        last_name  => $lname,
    #    }
    #);

    my $author;
    $author = $c->model('DB::Authors')->find_or_create(
        {   id => $id,
            display_name  => "$term",
        }
    );

    my $aid = $author->id;
    $c->log->debug("**********author id is: $aid");

    if ($aid) {

        #$c->response->body("1");
        $c->model('DB::UserAuthors')
            ->create( { user_id => $user_id, author_id => $aid } );
        $c->response->body("1");
    }
    else {

        #$c->response->body("0");
    }

=pod
    my @elements;
    # if returned, parse through them and build html
    if ( @authors ) {

        foreach my $auth ( @authors ) {
            my $name = $auth->first_name . ' ' . $auth->last_name;
            push @elements, HTML::Element->new('li')->push_content($name);    
        }

        $c->res->body( HTML::Element->new('ul')->push_content(@elements)->as_HTML );
    } else {
        @authors = $c->model('DB::UserAuthors')->search({ user_id => $user_id });
    }
=cut

}




=head2 list_authors

Show a users list of authors

=cut

sub list_authors : Local {
    my ( $self, $c ) = @_;

    # Debug sql statements
    #$c->model('DB::UserAuthors')->storage->debug(1);
    #my $user_id = $c->req->param("user_id");
    #$c->log->debug("**********is json: $is_json");

    # Lookup authors for this user
    my $authors = $c->user->my_authors;

    my @my_authors;

    while ( my $auth = $authors->next ) {
        push @my_authors,
            {
            id   => $auth->authors->id,
            name => $auth->authors->display_name,
            };
    }

    #$c->stash->{template} = '/user/list_authors.mhtml';
    $c->stash->{my_authors} = \@my_authors;
    $c->forward( $c->view('JSON') );

}


=head2 my_authors

Show a users list of authors

=cut

sub my_authors : Local {
    my ( $self, $c ) = @_;

    if ($c->user_exists()) {
        # Lookup authors for this user
        my $my_authors = $c->user->my_authors;

        $c->stash->{my_authors} = $my_authors;
    }

}

sub create_edit_profile_form : Local Form {
    my ( $self, $c ) = @_;

    my ( $id, $username, $password, $email_address, $first_name, $last_name,
        $active )
        = "";
    if ( defined $c->user ) {
        $id            = $c->user->user->id;
        $username      = $c->user->username;
        $password      = $c->user->password;
        $email_address = $c->user->email_address;
        $first_name    = $c->user->first_name;
        $last_name     = $c->user->last_name;
        $active        = $c->user->active;
    }

    $c->form->field(
        name     => 'email_address',
        required => 1,
        label    => 'Email',
        validate => 'EMAIL',
        size     => 25,
        value    => $email_address
    );

    $c->form->field(
        name     => 'first_name',
        required => 1,
        label    => 'First Name',
        size     => 25,
        value    => $first_name
    );

    $c->form->field(
        name     => 'last_name',
        required => 1,
        label    => 'Last Name',
        size     => 25,
        value    => $last_name
    );

    $c->form->action( '/user/edit_profile_commit/' . $id );
    $c->form->method('post');
}

sub edit_profile : Local Form {
    my ( $self, $c ) = @_;

    $self->create_edit_profile_form($c);
    $c->stash->{template} = "user/edit_profile.html";
}

sub edit_profile_commit : Local Form {
    my ( $self, $c, $id ) = @_;

    if ( $c->form->validate ) {
        my $user;

        if ( defined $id ) {
            $user = $c->model('DB::Users')->find($id);
        }
        else {
            $user = $c->model('DB::Users')->new( {} );
        }

        $user->email_address( $c->req->params->{email_address} );
        $user->first_name( $c->req->params->{first_name} );
        $user->last_name( $c->req->params->{last_name} );
        $user->insert_or_update();
        
        $c->session->{message} = 'Profile Updated';

        $c->res->redirect('/user');
    }
}


sub change_password : Local Form {
    my ( $self, $c, @args ) = @_;
    
    $c->stash->{template} = 'user/change_password.tt2';

    if (!$c->user) {
        $c->stash->{error} = 'You are not authorized to edit addresses for this person.';
        $c->redirect_and_detach('/access_denied');
    }

    my $form = $self->formbuilder();
    if ( $form->submitted ) {
        if ( $form->validate ) {
            if ($c->user_exists()) {
                if ($c->req->param('new_pw') eq $c->req->param('new_pw_again')) {
                    $c->log->debug('new password set');
                    my $user = $c->model('DB::Users')->find($c->user->id);
                    $user->password($c->req->param('new_pw_again'));
                    $user->update();
                    $c->stash->{message} = 'Password Changed';
                } else {
                    $c->stash->{message} = 'Passwords did not match';
                }
            }
        }
        else {
            $c->stash->{error}          = "INVALID FORM";
            $c->stash->{invalid_fields} =
                [ grep { !$_->validate } $form->fields ];
        }
    }
}

=head2 end

Forward to Mason View

=cut

#sub end : Private {
#    my ( $self, $c ) = @_;

# Forward to View unless response body is already defined
#$c->forward( $c->view('Mason') ) unless $c->response->body;
#}

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
