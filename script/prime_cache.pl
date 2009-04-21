#!/usr/bin/perl

use strict;

use FindBin;
use Config::Any::General;
use DBI;
use lib "$FindBin::Bin/../lib";
use Data::Dumper;
use LWP::Simple;
use AW::Schema;
use Cache::FileCache;
use AwAmazonSearch;


my $dsn = "dbi:SQLite:$FindBin::Bin/../aw.db";
my $cfg = Config::Any::General->load( "$FindBin::Bin/../aw_dev.conf" ) || die $!;
my $cache = new Cache::FileCache( $cfg->{cache}->{backend} );

#warn Dumper($cache);
#warn Dumper($cfg);

my $schema = AW::Schema->connect( $dsn );
my $uas = $schema->resultset('UserAuthors')->search(undef, { select => { distinct => 'author_id' }, as => 'author_id' });

while (my $ua = $uas->next) {
    my $aid = $ua->author_id;
    print $aid, "\n";
    AwAmazonSearch->new->author_search("$aid", $cache);
}

#my $url = 'http://localhost:3000/search?author=harlan+coben';
#my $content = get $url;
#die "Couldn't get $url" unless defined $content;


#use AwAmazonSearch;


#my $search = AwAmazonSearch->new->author_search('harlan coben');

#warn Dumper(keys %$search);

#my $cfg = Config::Any::General->load( "$FindBin::Bin/../aw_dev.conf" ) || die $!;
#warn Dumper($cfg);

#my $dbh = DBI->connect( @{ $cfg->{ 'Model::GodcoreDB' }->{ connect_info } } );

#$dbh->do( 'DELETE FROM session WHERE expires < UNIX_TIMESTAMP()' );
