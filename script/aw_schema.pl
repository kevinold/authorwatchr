#!/usr/bin/perl -w
use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";
use AW::Schema;

my $dsn = "dbi:SQLite:$FindBin::Bin/../aw.db";
my $schema = AW::Schema->connect( $dsn );
my $version = $schema->schema_version();

$schema->create_ddl_dir(
    ['SQLite'],
    $version > 1 ? $version : undef,
    "$FindBin::Bin/../sql",
    $version ? $version-1 : $version
);

