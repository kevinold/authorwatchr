package authorwatch::M::AwDB;

use strict;
use base 'Catalyst::Model::DBIC::Schema';

__PACKAGE__->config(
    schema_class => 'AwDB',
    connect_info => [
        authorwatch->config->{'dsn'},
        authorwatch->config->{'db_user'},
        authorwatch->config->{'db_pass'},
    ],

);

=head1 NAME

authorwatch::M::AwDB - Catalyst DBIC Schema Model

=head1 SYNOPSIS

See L<authorwatch>

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