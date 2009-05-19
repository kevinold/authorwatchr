package AW::Schema::Result::AuthorsYp;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("authors_yp");
__PACKAGE__->add_columns(
  "id",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 128,
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
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:MivSpNoamx6WHKvLCE6LHQ


# You can replace this text with custom content, and it will be preserved on regeneration

1;
