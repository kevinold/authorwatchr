package authorwatch::C::Authors;

use strict;
use warnings;
use base 'Catalyst::Controller';

=head1 NAME

authorwatch::C::Authors - Catalyst Controller

=head1 SYNOPSIS

See L<authorwatch>

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 default

    send html of author list

=cut

sub default : Private {
    my ( $self, $c ) = @_;

    my $html =<<END;
<ul>
<li>James Patteson</li>
<li>John Grisham</li>
<li>Joseph Finder</li>
<li>Patricia Cornwell</li>
<li>Harlan Coben</li>
<li>Dean Koontz</li>
</ul>
END
    # Hello World
    $c->response->body($html);
}


=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
