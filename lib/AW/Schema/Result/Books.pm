package AW::Schema::Result::Books;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("books");
__PACKAGE__->add_columns(
  "id",
  {
    data_type => "INTEGER",
    default_value => "''",
    is_nullable => 0,
    size => undef,
  },
  "isbn",
  { data_type => "VARCHAR", default_value => "''", is_nullable => 0, size => 14 },
  "title",
  {
    data_type => "VARCHAR",
    default_value => "''",
    is_nullable => 0,
    size => 255,
  },
  "author_id",
  {
    data_type => "VARCHAR",
    default_value => "''",
    is_nullable => 0,
    size => 128,
  },
  "release_date",
  { data_type => "DATE", default_value => "''", is_nullable => 0, size => undef },
  "publish_date",
  { data_type => "DATE", default_value => "''", is_nullable => 0, size => undef },
  "pre_order",
  { data_type => "BOOLEAN", default_value => "''", is_nullable => 0, size => 1 },
  "admin_active",
  { data_type => "BOOLEAN", default_value => "'1'", is_nullable => 0, size => 1 },
  "admin_valid",
  { data_type => "boolean", default_value => "'1'", is_nullable => 0, size => 1 },
);
__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:tGMBb5LRotInrDm33FKbLg


# You can replace this text with custom content, and it will be preserved on regeneration
__PACKAGE__->add_unique_constraint([ qw/isbn/]);

__PACKAGE__->belongs_to(authors => 'AW::Schema::Result::Authors', 'author_id');

1;
