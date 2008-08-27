package AW::Schema::Sessions;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("sessions");
__PACKAGE__->add_columns(
  "id",
  { data_type => "varchar", is_nullable => 0, size => 72, default_value => '' },
  "session_data",
  { data_type => "text", is_nullable => 1, size => undef, },
  "expires",
  { data_type => "integer", is_nullable => 1, size => undef, default_value => 'NULL' },
);

__PACKAGE__->set_primary_key('id');

1;
