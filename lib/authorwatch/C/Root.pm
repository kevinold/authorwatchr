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
    $c->response->redirect("index.html");
}

=head2 end

Forward to Mason View

=cut

sub end : Private {
    my ( $self, $c ) = @_;

    # Forward to View unless response body is already defined
    $c->forward( $c->view('Mason') ) unless $c->response->body;
}

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
