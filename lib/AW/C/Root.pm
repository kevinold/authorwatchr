package AW::C::Root;

use strict;
use warnings;
use base 'Catalyst::Controller::FormBuilder';
use Data::Dumper;

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
	if($c->authenticate({ username => $form->field('username'), password => $form->field('password') })){
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

sub index : Private {
    my ( $self, $c ) = @_;

    # Set my_authors
    $c->forward('/user/my_authors') if $c->user_exists();

    my $cache_key   = "index|authors";
    #$c->cache->remove($cache_key);

    my $authors;
    unless ($authors = $c->cache->get($cache_key)) {
        #$c->log->debug("setting cache");
        my @default_authors = qw(john_grisham dean_koontz greg_iles);
        my $cache_value = { authors => \@default_authors };
        $authors = $cache_value;
        $c->cache->set($cache_key, $cache_value, "10 minutes");
        #$c->log->debug("after set cache: ", $c->cache->get($cache_key));
    }

    $c->log->debug("from cache: ", Dumper($c->cache->get($cache_key))) if $c->cache->get($cache_key);

    $c->stash->{authors} = $authors->{authors} if $authors;
}


=head2 end

Attempt to render a view, if needed.

=cut

sub end : ActionClass('RenderView') {}

sub test500 : Local
{
    die "Test 500";
}


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

