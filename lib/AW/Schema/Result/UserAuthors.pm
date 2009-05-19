package AW::Schema::Result::UserAuthors;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("user_authors");
__PACKAGE__->add_columns(
  "user_id",
  {
    data_type => "integer",
    default_value => undef,
    is_nullable => 0,
    size => undef,
  },
  "author_id",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 128,
  },
);
__PACKAGE__->set_primary_key("user_id", "author_id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:vf90kKzXMkJl03HBR8kYFQ


# You can replace this text with custom content, and it will be preserved on regeneration

__PACKAGE__->belongs_to(user => 'AW::Schema::Result::Users', 'user_id');
__PACKAGE__->belongs_to(authors => 'AW::Schema::Result::Authors', 'author_id');

1;
