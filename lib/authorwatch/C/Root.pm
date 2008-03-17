package authorwatch::C::Root;

use strict;
use warnings;
use base 'Catalyst::Controller';

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config->{namespace} = '';

=head1 NAME

authorwatch::C::Root - Root Controller for this Catalyst based application

=head1 SYNOPSIS

See L<authorwatch>.

=head1 DESCRIPTION

Root Controller for this Catalyst based application.

=head1 METHODS

=cut

=head2 default

=cut

#
# Output a friendly welcome message
#
sub default : Private {
    my ( $self, $c ) = @_;

    # Hello World
    #$c->response->body( $c->welcome_message );
    #$c->response->redirect("index.html");
   
    # If user issue a subrequest to render the list of authors
    # and stash it in a variable
    #if ($c->user) {
    #    $c->stash->{myauthors} = $c->subreq('/user/myauthors');
    #}
    
    #if ($c->res->status(404) ) {
    #    $c->stash->{template} = '404.html';
    #} else {
        $c->stash->{template} = 'index.tt2';
    #}
}

sub access_denied : Private {
    my ( $self, $c ) = @_;
    $c->stash->{template} = 'denied.tt2';
}

#sub captcha : Local {
#    my ( $self, $c ) = @_;
#    $c->create_captcha();
#}

=head2 end

Attempt to render a view, if needed.

=cut 

sub end : ActionClass('RenderView') {
    my ( $self, $c ) = @_;

    #if ( scalar @{ $c->error } ) {
    #    $c->stash->{errors}   = $c->error;
    #    $c->stash->{template} = 'errors.tt';
    #    $c->forward('MyApp::View::TT');
    #    $c->error(0);
    #}

    return 1 if $c->response->status =~ /^3\d\d$/;
    return 1 if $c->response->body;

    #unless ( $c->response->content_type ) {
    #    $c->response->content_type('text/html; charset=utf-8');
    #}

    if ($c->stash->{template} =~ /tt.*$/) {
        $c->detach('authorwatch::V::TT');
    } else {
        $c->forward('authorwatch::V::Mason');
    }
}

=head2 auto

Check if there is a user and, if not, forward to login page

=cut

# Note that 'auto' runs after 'begin' but before your actions and that
# 'auto' "chain" (all from application path to most specific class are run)

=pod
sub auto : Private {
    my ($self, $c) = @_;

    # Allow unauthenticated users to reach the login page
    if ($c->request->path =~ /login/) {
        return 1;
    }

    # If a user doesn't exist, force login
    if (!$c->user_exists) {
        # Dump a log message to the development server debug output
        $c->log->debug('***Root::auto User not found, forwarding to /login');
        # Redirect the user to the login page
        $c->response->redirect($c->uri_for('/login'));
        # Return 0 to cancel 'post-auto' processing and prevent use of application
        return 0;
    }

    # User found, so return 1 to continue with processing after this 'auto'
    return 1;
}
=cut


=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;

