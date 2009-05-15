package AW::Schema;

use strict;
use warnings;

use base 'DBIx::Class::Schema';
use FindBin;
use lib "$FindBin::Bin/../lib";
our $VERSION = 0.003;

__PACKAGE__->load_classes;


# Created by DBIx::Class::Schema::Loader v0.04005 @ 2008-08-26 20:34:18
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:k2VOyBnr57eUvtDgjAZ0yg


# You can replace this text with custom content, and it will be preserved on regeneration
1;
