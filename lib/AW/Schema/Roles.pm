package AW::Schema::Roles;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components(qw/PK::Auto Core/);
__PACKAGE__->table("roles");
__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_nullable => 0, size => undef },
  "role",
  { data_type => "varchar", is_nullable => 0, size => 50 },
);
__PACKAGE__->set_primary_key("id");

__PACKAGE__->has_many(map_user_role => 'AW::Schema::UserRoles', 'role_id');

# Created by DBIx::Class::Schema::Loader v0.04005 @ 2008-08-26 20:34:18
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:HGsbL+eJ7OZfasEdjBzEwg


# You can replace this text with custom content, and it will be preserved on regeneration
1;
