#!/usr/bin/perl

use strict;

use FindBin;
use Config::Any::YAML;
use DBI;

my $cfg = Config::Any::YAML->load( "$FindBin::Bin/../godcore.yml" ) || die $!;

my $dbh = DBI->connect( @{ $cfg->{ 'Model::GodcoreDB' }->{ connect_info } } );

$dbh->do( 'DELETE FROM session WHERE expires < UNIX_TIMESTAMP()' );
