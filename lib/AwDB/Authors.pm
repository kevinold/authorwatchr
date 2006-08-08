package AwDB::Authors;

use base qw/DBIx::Class/;

# Load required DBIC stuff
__PACKAGE__->load_components(qw/PK::Auto Core/);
# Set the table name
__PACKAGE__->table('authors');
# Set the columns in the table
__PACKAGE__->add_columns(qw/id first_name last_name/);
# Set the primary key for the table
__PACKAGE__->set_primary_key('id');


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
__PACKAGE__->has_many(user_authors => 'AwDB::UserAuthors', 'user_id');
__PACKAGE__->has_many(map_user_role => 'AwDB::UserRoles', 'user_id');

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
