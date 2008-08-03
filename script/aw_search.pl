#!/usr/bin/perl

use strict;

use FindBin;
use Config::Any::General;
use DBI;
use lib "$FindBin::Bin/../lib";
use Data::Dumper;
use LWP::Simple;

my $url = 'http://localhost:3000/search?author=harlan+coben';
my $content = get $url;
die "Couldn't get $url" unless defined $content;


#use AW;
#use AwAmazonSearch;


#my $search = AwAmazonSearch->new->author_search('harlan coben');

#warn Dumper(keys %$search);

#my $cfg = Config::Any::General->load( "$FindBin::Bin/../aw_dev.conf" ) || die $!;
#warn Dumper($cfg);

#my $dbh = DBI->connect( @{ $cfg->{ 'Model::GodcoreDB' }->{ connect_info } } );

#$dbh->do( 'DELETE FROM session WHERE expires < UNIX_TIMESTAMP()' );
