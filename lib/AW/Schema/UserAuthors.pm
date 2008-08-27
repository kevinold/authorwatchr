package AW::Schema::UserAuthors;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("user_authors");
__PACKAGE__->add_columns(
  "user_id",
  { data_type => "integer", is_nullable => 0, size => undef },
  "author_id",
  { data_type => "varchar", is_nullable => 0, size => 128 },
);

__PACKAGE__->set_primary_key(qw/user_id author_id/);

__PACKAGE__->belongs_to(user => 'AW::Schema::Users', 'user_id');
__PACKAGE__->belongs_to(authors => 'AW::Schema::Authors', 'author_id');

# Created by DBIx::Class::Schema::Loader v0.04005 @ 2008-08-26 20:34:18
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:McHSItykMIo1G6iVFjbvGg


# You can replace this text with custom content, and it will be preserved on regeneration
1;
