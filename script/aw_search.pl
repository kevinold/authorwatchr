#!/usr/bin/perl

use strict;

use FindBin;
use Config::Any::General;
use DBI;
use lib "$FindBin::Bin/../lib";
use Data::Dumper;
use AW;
use AwAmazonSearch;

my $search = AwAmazonSearch->new->author_search('dean koontz');

print Dumper($search);

#my $cfg = Config::Any::General->load( "$FindBin::Bin/../aw_dev.conf" ) || die $!;
#warn Dumper($cfg);

#my $dbh = DBI->connect( @{ $cfg->{ 'Model::GodcoreDB' }->{ connect_info } } );

#$dbh->do( 'DELETE FROM session WHERE expires < UNIX_TIMESTAMP()' );
