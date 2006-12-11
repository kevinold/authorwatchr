package AwDB::User;

use base qw/DBIx::Class/;

# Load required DBIC stuff
__PACKAGE__->load_components(qw/PK::Auto Core/);
# Set the table name
__PACKAGE__->table('users');
# Set columns in table
__PACKAGE__->add_columns(qw/id username password email_address first_name last_name active/);
# Add unique constraints
__PACKAGE__->add_unique_constraint([ qw/username/]);
__PACKAGE__->add_unique_constraint([ qw/email_address/]);
# Set the primary key for the table
__PACKAGE__->set_primary_key('id');

#
# Set relationships:
#

# has_many():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of the model class referenced by this relationship
#     3) Column name in *foreign* table
__PACKAGE__->has_many(map_user_role => 'AwDB::UserRole', 'user_id');
__PACKAGE__->has_many(my_authors => 'AwDB::UserAuthors', 'user_id');


=head1 NAME

AwDB::User - A model object representing a person with access to the system.

=head1 DESCRIPTION

This is an object that represents a row in the 'users' table of your application
database.  It uses DBIx::Class (aka, DBIC) to do ORM.

For Catalyst, this is designed to be used through authorwatch::Model::AwDB.
Offline utilities may wish to use this class directly.

=cut

1;
