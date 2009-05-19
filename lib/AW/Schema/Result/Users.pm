package AW::Schema::Result::Users;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("users");
__PACKAGE__->add_columns(
  "id",
  {
    data_type => "INTEGER",
    default_value => undef,
    is_nullable => 0,
    size => undef,
  },
  "username",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 50,
  },
  "password",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 50,
  },
  "email_address",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 255,
  },
  "first_name",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 1,
    size => 50,
  },
  "last_name",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 1,
    size => 50,
  },
  "active",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 255,
  },
  "status",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 255,
  },
);
__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:YmAMalLQuuA9s4FgMf1r3A


# You can replace this text with custom content, and it will be preserved on regeneration
use Digest;

__PACKAGE__->add_unique_constraint([ qw/username/]);
__PACKAGE__->add_unique_constraint([ qw/email_address/]);

#__PACKAGE__->has_many(map_user_role => 'AW::Schema::Result::UserRoles', 'user_id');
__PACKAGE__->has_many(my_authors => 'AW::Schema::Result::UserAuthors', 'user_id');

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
