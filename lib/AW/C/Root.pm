package AW::C::Root;

use strict;
use warnings;
use base 'Catalyst::Controller::FormBuilder';

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config->{namespace} = '';

=head1 NAME

AW::C::Root - Root Controller for this Catalyst based application

=head1 SYNOPSIS

See L<AW>.

=head1 DESCRIPTION

Root Controller for this Catalyst based application.

=head1 METHODS

=cut

=head2 default

=cut

sub default : Private {
    my ( $self, $c ) = @_;

    $c->response->status('404');
    $c->stash->{template} = 'not_found.tt2';
}

sub access_denied : Private {
    my ( $self, $c ) = @_;
    $c->stash->{template} = 'denied.tt2';
}

sub login : Global Form {
    my ($self, $c) = @_;
    my $form = $self->formbuilder;

    if($form->submitted && $form->validate){
	if($c->login($form->field('username'), $form->field('password'))){
	    $c->flash->{message} = 'Logged in successfully.';
	    $c->res->redirect($c->uri_for('/'));
	    $c->detach();
	}
	else {
	    $c->stash->{error} = 'Login failed.';
	}
    }
}

sub logout : Global {
    my ($self, $c) = @_;

    $c->logout;
    $c->flash->{message} = 'Logged out.';
    $c->res->redirect($c->uri_for('/'));
}

#sub captcha : Local {
#    my ( $self, $c ) = @_;
#    $c->create_captcha();
#}


=head2 index

=cut

sub index : Private {}


=head2 end

Attempt to render a view, if needed.

=cut

sub end : ActionClass('RenderView') {}


=head2 end

Attempt to render a view, if needed. --- USED FOR MASON AND TT TEMPLATES DURING TRANSITION

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
        $c->detach('AW::V::TT');
    } else {
        $c->forward('AW::V::Mason');
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
