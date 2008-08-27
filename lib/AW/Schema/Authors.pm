package AW::Schema::Authors;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components(qw/PK::Auto Core InflateColumn/);
__PACKAGE__->table("authors");
__PACKAGE__->add_columns(
  "id",
  { data_type => "varchar", is_nullable => 0, size => 128 },
  "display_name",
  { data_type => "varchar", is_nullable => 0, size => 128 },
);

__PACKAGE__->set_primary_key('id');
__PACKAGE__->add_unique_constraint([ qw/id/]);

# belongs_to():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of the model class referenced by this relationship
#     3) Column name in *this* table
#__PACKAGE__->belongs_to(book => 'MyAppAW::Schema::Book', 'book_id');

# has_many():
#   args:
#     1) Name of relationship, DBIC will create accessor with this name
#     2) Name of the model class referenced by this relationship
#     3) Column name in *foreign* table
__PACKAGE__->has_many(user_authors => 'AW::Schema::UserAuthors', 'user_id');
__PACKAGE__->has_many(map_user_role => 'AW::Schema::UserRoles', 'user_id');

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

1;
