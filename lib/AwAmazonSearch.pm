package AwAmazonSearch;
use Moose;
use Log::Log4perl qw(:easy);
use FindBin;
use Config::Any::General;
use lib "$FindBin::Bin/../lib";
use URI::Escape;
use Data::Dumper;
use AW;
#use Catalyst::Test 'AW';
#has 'balance' => (isa => 'Int', is => 'rw', default => 0);

my $cfg = Config::Any::General->load( "$FindBin::Bin/../aw_dev.conf" ) || die $!;

sub author_search {
    my ($self, $author) = @_;

    #$self->balance($self->balance + $amount);
    

    my $ua = Net::Amazon->new(token => $cfg->{ 'na_token' });

    my $pw_search = uri_escape(
        "author: $author and binding: hardcover and language: english"
    );

    # sort param can be one of the items at:
    # http://search.cpan.org/~boumenot/Net-Amazon-0.49/lib/Net/Amazon/Request/Sort.pm#Sorting_Books_Results
    my $response = $ua->search(power => $pw_search,
                               mode  => 'books',
                               type  => 'Large',
                               sort  => 'daterank'
                              );

    # When ready, pass Associate Tag this way
    #my $response = $ua->search(power => $pw_search, mode => "books", type => "Medium", AssociateTag => 'kevin123');

    my $records;
    if ($response->is_success()) {
        $records = $response;

        return $records;
        #$c->log->debug("**********RUNNING AMAZON QUERY", Dumper($records));
        #$c->cache->set($authcachekey, $response);
        #$c->log->debug("**********After cache set", Dumper($c->cache->get($authcachekey)));
    } else {

        #$c->log->debug("**********Error:", $response->message());
        #$c->stash->{error_msg} = "Error: " . $response->message();
        print "Error: " . $response->message();
    }


}

1;
