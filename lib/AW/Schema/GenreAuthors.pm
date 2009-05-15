package AW::Schema::GenreAuthors;

use strict;
use warnings;

use base 'DBIx::Class';

__PACKAGE__->load_components("Core");
__PACKAGE__->table("genre_authors");
__PACKAGE__->add_columns(
  "genre_id",
  { data_type => "integer", is_nullable => 0, size => 128 },
  "author_id",
  { data_type => "varchar", is_nullable => 0, size => 128 },
);

__PACKAGE__->set_primary_key(qw/genre_id author_id/);

__PACKAGE__->belongs_to(genres => 'AW::Schema::Genres', 'genre_id');
__PACKAGE__->belongs_to(authors => 'AW::Schema::AuthorsYP', 'author_id');

1;
