package AwAmazonSearch;
use Moose;
use Log::Log4perl qw(:easy);
use FindBin;
use Config::Any::General;
use lib "$FindBin::Bin/../lib";
use URI::Escape;
use Net::Amazon;
use Data::Dumper;

#use Catalyst::Test 'AW';
#has 'balance' => (isa => 'Int', is => 'rw', default => 0);

my $cfg = Config::Any::General->load("$FindBin::Bin/../aw_dev.conf") || die $!;

sub author_search {
    my ($self, $author, $cache) = @_;

    #$self->balance($self->balance + $amount);

    my $authcachekey = $author;
    $authcachekey =~ s/ /_/g;

    my $records;
    unless ($records = $cache->get($authcachekey)) {
        #Log::Log4perl->easy_init($DEBUG);
        my $ua = Net::Amazon->new(token => $cfg->{'na_token'},
                                  max_pages => 1,
                                  cache => $cache);

        my $pw_search = "author: $author and binding: hardcover and language: english";

        # sort param can be one of the items at:
        # http://search.cpan.org/~boumenot/Net-Amazon-0.49/lib/Net/Amazon/Request/Sort.pm#Sorting_Books_Results
        my $response = $ua->search(power => $pw_search,
                                   mode  => 'books',
                                   type  => 'Large',
                                   sort  => 'daterank',
                                   AssociateTag => 'kevin123',
                                   #ResponseGroup => 'Medium,Offers',
                                  );

        if ($response->is_success()) {

            # Check that the title has the following criteria:
            #  - Must have hyphens in ReleaseDate
            #  - Look into a variable that might tell if it is a reprint, maybe an "original street date"
            foreach my $prop ($response->properties) {
                next if $prop->year < 2009;
                next unless $prop->ReleaseDate =~ /-/;
                next unless $prop->{xmlref}->{Offers}->{Offer}->{OfferListing}->{Availability} eq 'Not yet published';
                push @{$records}, $prop;
            }

            $cache->set($authcachekey, $records);
            warn "setting cache for: $authcachekey";
        } else {

            return "Error: " . $response->message();
        }

    }    # unless cache

    return $records;
}

1;
