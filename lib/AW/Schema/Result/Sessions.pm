package AW::Schema::Result::Sessions;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("sessions");
__PACKAGE__->add_columns(
  "id",
  { data_type => "varchar", default_value => "''", is_nullable => 0, size => 72 },
  "session_data",
  {
    data_type => "text",
    default_value => undef,
    is_nullable => 1,
    size => undef,
  },
  "expires",
  {
    data_type => "integer",
    default_value => "NULL",
    is_nullable => 1,
    size => undef,
  },
);
__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:gzHLI6+grgH2OxzmOny0cw


# You can replace this text with custom content, and it will be preserved on regeneration

1;
