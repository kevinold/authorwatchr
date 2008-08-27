package AW::C::Signup;

use strict;
use warnings;

use base 'Catalyst::Controller::FormBuilder';

=head1 NAME

AW::C::Signup - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 index 

=cut

sub cu : Local {    # For Ajax username lookups
    my ($self, $c) = @_;

    my $user = 0;    # assume user does not exist answering the question "Does this user exist?"
    if (defined $c->req->params->{username}) {

        $user = $c->model('DB::User')->search({username => $c->req->params->{username}});

        if ($user == 0) {

            # Username is available
            $c->stash->{uexists} = 0;
        } else {

            # Username exists
            $c->stash->{uexists} = 1;
        }

    } else {

        # Default to username is available
        $c->stash->{uexists} = 0;
    }

    $c->forward($c->view('JSON'));
}

sub default : Local Form {
    my ($self, $c, @args) = @_;

    $c->stash->{template} = 'signup/default.tt2';

    my $username        = $c->req->params->{username};
    my $password        = $c->req->params->{password};
    my $confirmpassword = $c->req->params->{confirmpassword};
    my $email_address   = $c->req->params->{email_address};

    my $form = $self->formbuilder();
    if ($form->submitted) {
        if ($form->validate) {
            $c->log->debug("in validate");
            if ($username && $password && $confirmpassword && $email_address) {
                if ($password eq $confirmpassword) {

                    # Find or Create user
                    my $user;
                    $user = $c->model('DB::User')->find_or_new(
                        {username => $username,

                         #             email_address => $email_address,
                        });
                    if ($user->id) {
                        $c->stash->{error} = 'User/Email already exists.';
                        $c->forward('signup');
                    } else {
                        $user->email_address($email_address);
                        $user->username($username);
                        $user->password($c->req->param('password'));
                        $user->active(1);
                        $user->insert;

                        $c->forward('success');
                        $c->stash->{message} = 'User created!';
                    }

                } else {
                    $c->stash->{error} = 'Passwords do not match.';
                }

            } else {
                $c->stash->{error} = "INVALID FORM";
                $c->stash->{invalid_fields} = [grep { !$_->validate } $form->fields];
            }
        }

    }
}

sub success : Local {
    my ($self, $c) = @_;
    $c->stash->{template} = 'signup/success.tt2';
}

=pod

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
            $user = $c->model('DB::User')->find_or_new(
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

=cut

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
## Please see file perltidy.ERR
