package AW::Schema::AuthorsOrig;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("authors_orig");
__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_nullable => 0, size => undef },
  "first_name",
  { data_type => "varchar", is_nullable => 0, size => 50 },
  "last_name",
  { data_type => "varchar", is_nullable => 0, size => 50 },
);
__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.04005 @ 2008-08-26 20:34:18
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:YhzfaytbN+gFdSG94raaUA


# You can replace this text with custom content, and it will be preserved on regeneration
1;
