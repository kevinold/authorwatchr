package AwDB::Authors;

use base qw/DBIx::Class/;

__PACKAGE__->load_components(qw/PK::Auto Core InflateColumn/);
__PACKAGE__->table('authors');
__PACKAGE__->add_columns(
    id => {
        'data_type'         => 'VARCHAR',
        'size'              => 128,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'id',
        'is_auto_increment' => 0,
        'default_value'     => '',
    },
    display_name => {
        'data_type'         => 'VARCHAR',
        'size'              => 14,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'display_name',
        'is_auto_increment' => 0,
        'default_value'     => 'NULL',
    },
);

__PACKAGE__->set_primary_key('id');

__PACKAGE__->has_many(user_authors => 'AwDB::UserAuthors', 'user_id');
__PACKAGE__->has_many(map_user_role => 'AwDB::UserRole', 'user_id');

=pod
__PACKAGE__->inflate_column('id', {
        inflate => sub { shift },
        deflate => sub { normalize( $self->id ); },
    });

sub normalize {
    my $name = shift;
   
    #convert lowercase
    $name = lc $name;

    #replace non-alpha, non-numeric with underscore
    $name =~ s/[^a-z0-9]/_/g;

    #remove multiple underscores
    $name =~ s/_{2,}/_/g;

    return $name;
}
=cut

#
# Set relationships:
#

# belongs_to():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of the model class referenced by this relationship
#     3) Column name in *this* table
#__PACKAGE__->belongs_to(book => 'MyAppDB::Book', 'book_id');

# has_many():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of the model class referenced by this relationship
#     3) Column name in *foreign* table

# many_to_many():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of has_many() relationship this many_to_many() is shortcut for
#     3) Name of belongs_to() relationship in model class of has_many() above
#   You must already have the has_many() defined to use a many_to_many().
#__PACKAGE__->many_to_many(users => 'message_users', 'author');


=head1 NAME

AwDB::Authors - Catalyst DBIC Table Model

=head1 SYNOPSIS

See L<encmymsg>

=head1 DESCRIPTION

Catalyst DBIC Table Model.

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
