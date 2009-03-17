package AW::Schema;

use strict;
use warnings;

use base 'DBIx::Class::Schema';
use FindBin;
use lib "$FindBin::Bin/../lib";
our $VERSION = 0.002;

__PACKAGE__->load_classes;
__PACKAGE__->load_components('+DBIx::Class::Schema::Versioned');
__PACKAGE__->upgrade_directory("$FindBin::Bin/../sql/");
__PACKAGE__->backup_directory("$FindBin::Bin/../sql/backups/");


# Created by DBIx::Class::Schema::Loader v0.04005 @ 2008-08-26 20:34:18
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:k2VOyBnr57eUvtDgjAZ0yg


# You can replace this text with custom content, and it will be preserved on regeneration
1;
