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
    $c->stash->{template} = 'signup.mhtml';
}

sub cu : Local {
    my ( $self, $c ) = @_;

    my $user = 0;
    if ( defined $c->req->params->{username} ) {

        $user = $c->model('AwDB::User')->search({ username => $c->req->params->{username} });
   
        if ( $user == 0 ) {
	    # Username is available
            $c->response->body('0');
        } else {
	    # Username exists
            $c->response->body('1');
        }

    }
    else {
	# Default to username is available
        $c->response->body('0');
    }

}


=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
