package AwDB::UserAuthors;

use base qw/DBIx::Class/;

# Load required DBIC stuff
__PACKAGE__->load_components(qw/PK::Auto Core/);
# Set the table name
__PACKAGE__->table('user_authors');
# Set columns in table
__PACKAGE__->add_columns(qw/user_id author_id/);
# Set the primary key for the table
__PACKAGE__->set_primary_key(qw/user_id author_id/);

#
# Set relationships:
#

# belongs_to():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of the model class referenced by this relationship
#     3) Column name in *this* table
__PACKAGE__->belongs_to(user => 'AwDB::User', 'user_id');

# belongs_to():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of the model class referenced by this relationship
#     3) Column name in *this* table
__PACKAGE__->belongs_to(authors => 'AwDB::Authors', 'author_id');


=head1 NAME

AwDB::UserAuthors - A model object representing the JOIN between Users and .

=head1 DESCRIPTION

This is an object that represents a row in the 'user_roles' table of your application
database.  It uses DBIx::Class (aka, DBIC) to do ORM.

You probably won't need to use this class directly -- it will be automatically
used by DBIC where joins are needed.

For Catalyst, this is designed to be used through authorwatch::Model::AwDB.
Offline utilities may wish to use this class directly.

=cut

1;
