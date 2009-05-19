package AW::Schema::Result::UserRoles;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("user_roles");
__PACKAGE__->add_columns(
  "user_id",
  {
    data_type => "integer",
    default_value => undef,
    is_nullable => 0,
    size => undef,
  },
  "role_id",
  {
    data_type => "integer",
    default_value => undef,
    is_nullable => 0,
    size => undef,
  },
);
__PACKAGE__->set_primary_key("user_id", "role_id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:tP5bFHyGMfoXrFmaquB1mA


# You can replace this text with custom content, and it will be preserved on regeneration

#__PACKAGE__->belongs_to(user => 'AW::Schema::Result::Users', 'user_id');
#__PACKAGE__->belongs_to(role => 'AW::Schema::Result::Roles', 'role_id');

1;
