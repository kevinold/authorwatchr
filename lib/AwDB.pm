package AwDB;

=head1 NAME

AwDB - DBIC Schema Class

=cut

use strict;
use warnings;
use base 'DBIx::Class::Schema';
use FindBin;
use lib "$FindBin::Bin/../lib";
use AwDB;
our $VERSION = 0.001;

__PACKAGE__->load_classes(qw/Authors Book User Role UserRole UserAuthors Session/);
__PACKAGE__->load_components('+DBIx::Class::Schema::Versioned');
__PACKAGE__->upgrade_directory("$FindBin::Bin/../sql/");
__PACKAGE__->backup_directory("$FindBin::Bin/../sql/backups/");

1;
