package AW::Schema::Sessions;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("sessions");
__PACKAGE__->add_columns(
  "id",
  { data_type => "varchar", is_nullable => 0, size => 72 },
  "session_data",
  { data_type => "text", is_nullable => 0, size => undef },
  "expires",
  { data_type => "integer", is_nullable => 0, size => undef },
);

__PACKAGE__->set_primary_key('id');

# Created by DBIx::Class::Schema::Loader v0.04005 @ 2008-08-26 20:34:18
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:3vphAoLdbJOAmHEChE2VVg


# You can replace this text with custom content, and it will be preserved on regeneration
1;
