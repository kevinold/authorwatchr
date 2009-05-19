package AW::Schema::Result::GenreAuthors;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("InflateColumn::DateTime", "Core");
__PACKAGE__->table("genre_authors");
__PACKAGE__->add_columns(
  "genre_id",
  {
    data_type => "integer",
    default_value => undef,
    is_nullable => 0,
    size => 128,
  },
  "author_id",
  {
    data_type => "varchar",
    default_value => undef,
    is_nullable => 0,
    size => 128,
  },
);
__PACKAGE__->set_primary_key("genre_id", "author_id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-05-19 14:53:29
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:6pmyWY7ca4X4xO65VAJ3Ow


# You can replace this text with custom content, and it will be preserved on regeneration

__PACKAGE__->belongs_to(genres => 'AW::Schema::Result::Genres', 'genre_id');
__PACKAGE__->belongs_to(authors => 'AW::Schema::Result::AuthorsYp', 'author_id');

1;
