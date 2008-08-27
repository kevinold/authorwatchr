package AW::Schema::UserRoles;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("user_roles");
__PACKAGE__->add_columns(
  "user_id",
  { data_type => "integer", is_nullable => 0, size => undef },
  "role_id",
  { data_type => "integer", is_nullable => 0, size => undef },
);
__PACKAGE__->set_primary_key(qw/user_id role_id/);

#__PACKAGE__->belongs_to(user => 'AW::Schema::Users', 'user_id');
#__PACKAGE__->belongs_to(role => 'AW::Schema::Roles', 'role_id');

1;
