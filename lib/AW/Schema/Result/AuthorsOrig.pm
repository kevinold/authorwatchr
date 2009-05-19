package AW::Schema::Result::AuthorsOrig;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("authors_orig");
__PACKAGE__->add_columns(
  "id",
  {
    data_type => "INTEGER",
    default_value => undef,
    is_nullable => 0,
    size => undef,
  },
  "first_name",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 50,
  },
  "last_name",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 50,
  },
);
__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:fyDrgNVwx8Tt/Xl6aMO85g


# You can replace this text with custom content, and it will be preserved on regeneration

1;
