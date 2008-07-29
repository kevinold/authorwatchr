package AW::V::TT;

use strict;
use base 'Catalyst::View::TT';
use AwUtil;

__PACKAGE__->config({
    CATALYST_VAR => 'Catalyst',
    INCLUDE_PATH => [
        AW->path_to( 'root', 'src' ),
        AW->path_to( 'root', 'lib' ),
    ],
    PRE_PROCESS  => 'config/main',
    WRAPPER      => 'site/wrapper',
    ERROR        => 'error.tt2',
    TEMPLATE_EXTENSION    => '.tt2',
    TIMER        => 0,
    COMPILE_DIR  => '/tmp/template_cache',
    FILTERS       => {
        urlifyauthor => \&AwUtil::urlify_author,
    },
});

=head1 NAME

AW::V::TT - TT View for AW

=head1 DESCRIPTION

TT View for AW. 

=head1 AUTHOR

=head1 SEE ALSO

L<AW>

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
