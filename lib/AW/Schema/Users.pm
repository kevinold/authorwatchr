package AW::Schema::Users;

use strict;
use warnings;

use base 'DBIx::Class';
use Digest;

__PACKAGE__->load_components(qw/PK::Auto Core/);
__PACKAGE__->table("users");
__PACKAGE__->add_columns(
  "id",
  { data_type => "integer", is_nullable => 0, size => undef },
  "username",
  { data_type => "varchar", is_nullable => 0, size => 50 },
  "password",
  { data_type => "varchar", is_nullable => 0, size => 50 },
  "email_address",
  { data_type => "varchar", is_nullable => 0, size => 255 },
  "first_name",
  { data_type => "varchar", is_nullable => 0, size => 50 },
  "last_name",
  { data_type => "varchar", is_nullable => 0, size => 50 },
  "active",
  { data_type => "varchar", is_nullable => 0, size => 255 },
  "status",
  { data_type => "varchar", is_nullable => 0, size => 255 },
);
__PACKAGE__->set_primary_key("id");
__PACKAGE__->add_unique_constraint([ qw/username/]);
__PACKAGE__->add_unique_constraint([ qw/email_address/]);

#__PACKAGE__->has_many(map_user_role => 'AW::Schema::UserRoles', 'user_id');
__PACKAGE__->has_many(my_authors => 'AW::Schema::UserAuthors', 'user_id');

# tip from email on catalyst list (subject "Userpasswords")
# can also do this via 
# http://search.cpan.org/~ash/DBIx-Class-0.08010/lib/DBIx/Class/Manual/Cookbook.pod#Changing_one_field_whenever_another_changes
# or using DBIx::Class::EncodedColumn
sub store_column {
   my( $self, $col, $val ) = @_;
   $val = Digest->new('MD5')->add($val)->digest if $col eq 'password';
   return $self->next::method( $col, $val );
}

1;
