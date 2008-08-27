#!/usr/bin/perl -w
use strict;
use warnings;
use FindBin;
use lib "$FindBin::Bin/../lib";
use AwDB;

my $dsn = "dbi:SQLite:$FindBin::Bin/../aw.db";
AwDB->connect($dsn)->upgrade;


