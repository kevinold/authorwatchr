#!/usr/bin/perl -w
use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";
use AW::Schema;

my $dsn = "dbi:SQLite:$FindBin::Bin/../aw.db";
AW::Schema->connect($dsn)->upgrade;


