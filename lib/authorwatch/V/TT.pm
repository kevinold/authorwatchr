package authorwatch::V::TT;

use strict;
use base 'Catalyst::View::TT';

__PACKAGE__->config({
    CATALYST_VAR => 'Catalyst',
    INCLUDE_PATH => [
        authorwatch->path_to( 'root', 'src' ),
        authorwatch->path_to( 'root', 'lib' ),
    ],
    PRE_PROCESS  => 'config/main',
    WRAPPER      => 'site/wrapper',
    ERROR        => 'error.tt2',
    TEMPLATE_EXTENSION    => '.tt2',
    TIMER        => 0,
});

=head1 NAME

authorwatch::V::TT - TT View for authorwatch

=head1 DESCRIPTION

TT View for authorwatch. 

=head1 AUTHOR

=head1 SEE ALSO

L<authorwatch>

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
