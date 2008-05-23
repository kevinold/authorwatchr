package AW::M::AwDB;

use strict;
use base 'Catalyst::Model::DBIC::Schema';

__PACKAGE__->config(
    schema_class => 'AwDB',
    connect_info => [
        'dbi:SQLite:aw.db',
    ],

);

#AW->config->{'dsn'},
#AW->config->{'db_user'},
#AW->config->{'db_pass'},
#
=head1 NAME

AW::M::AwDB - Catalyst DBIC Schema Model

=head1 SYNOPSIS

See L<AW>

=head1 DESCRIPTION

L<Catalyst::Model::DBIC::Schema> Model using schema
L<>

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
