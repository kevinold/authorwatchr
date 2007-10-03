package authorwatch::C::Signup;

use strict;
use warnings;
use base 'Catalyst::Controller';

=head1 NAME

authorwatch::C::Signup - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 index 

=cut

sub index : Private {
    my ( $self, $c ) = @_;

    #$c->response->body('Matched authorwatch::C::Signup in Signup.');
    $c->stash->{page_css} = 'signup';
    $c->stash->{template} = 'signup.mhtml';
}

sub cu : Local {
    my ( $self, $c ) = @_;

    my $user = 0;
    if ( defined $c->req->params->{username} ) {

        $user = $c->model('AwDB::User')
            ->search( { username => $c->req->params->{username} } );

        if ( $user == 0 ) {

            # Username is available
            $c->response->body('0');
        } else {

            # Username exists
            $c->response->body('1');
        }

    } else {

        # Default to username is available
        $c->response->body('0');
    }

}

sub newuser : Local {
    my ( $self, $c ) = @_;

    my $username = $c->req->params->{username};
    my $password = $c->req->params->{password};
    my $confirmpassword = $c->req->params->{confirmpassword};
    my $first_name = $c->req->params->{first_name};
    my $last_name = $c->req->params->{last_name};
    my $email_address = $c->req->params->{email_address};

    if ( $username && $password && $confirmpassword && $email_address ) {
    
        if ( $password eq $confirmpassword ) {
            # Find or Create user
            my $user;
            $user = $c->model('AwDB::User')->find_or_new(
                {   
                    username => $username,
                    email_address => $email_address,
                }
            );
            if ( $user->id ) { 
                $c->stash->{error_msg} = 'User/Email already exists.';
                $c->forward('index');

            }
            else {
                $user->password($password);
                $user->first_name($first_name);
                $user->last_name($last_name);
                $user->active(1);
                $user->insert;
                $c->stash->{template} = 'signup_success.mhtml';
            }
        }

    } else {
        $c->stash->{error_msg} = 'Please complete form before submitting.';
        $c->stash->{template} = 'signup.mhtml';
    }
}

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
