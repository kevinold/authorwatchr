package AW::Schema::Result::Genres;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("genres");
__PACKAGE__->add_columns(
  "id",
  {
    data_type => "INTEGER",
    default_value => undef,
    is_nullable => 0,
    size => undef,
  },
  "display_name",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 128,
  },
);
__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:9ojFZy9lb7x4Vm6aHARMoQ


# You can replace this text with custom content, and it will be preserved on regeneration

__PACKAGE__->add_unique_constraint([ qw/id/]);

#__PACKAGE__->has_many(authors => 'AW::Schema::Result::AuthorsYP', 'id');
#__PACKAGE__->has_many(map_user_role => 'AW::Schema::Result::UserRoles', 'user_id');

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
