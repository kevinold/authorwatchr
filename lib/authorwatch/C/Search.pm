package authorwatch::C::Search;

use strict;
use warnings;
use base 'Catalyst::Controller';
use LWP::Simple qw($ua get);
use XML::XPath;

=head1 NAME

authorwatch::C::Search - Catalyst Controller

=head1 SYNOPSIS

See L<authorwatch>

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 default

=cut

#
# Output a friendly welcome message
#
sub default : Private {
    my ( $self, $c ) = @_;

    # Hello World
    #$c->response->body( $c->welcome_message );
    $c->response->redirect("index.html");
}

sub aws : Local {
    my ( $self, $c ) = @_;

    my $svalue = $c->req->param("svalue");

    $c->debug("**********svalue is: $svalue");
    #$c->log("**********svalue is: $svalue");

    if ($svalue) {

        #Get search terms urlified
        my @search = split / /, $svalue;
        my $keywords = join "%20", @search;

        # Perform search
        my $response = query_aws($keywords);

        # Process XML response with XPath.
        my $xp = XML::XPath->new( xml => $response );

        my %records;

        if ( $xp->find("//Error") ) {
            $c->stash->{error_msg}
                = "There was an error processing your request:\n" .
                "  Error code: ", $xp->findvalue("//Error/Code") .  "\n" . "  " .
                $xp->findvalue("//Error/Message") . "\n\n";
        }
        else {
            for ( my $i = 1; $i <= 10; $i++ ) {
                if ( !$xp->find("/ItemSearchResponse/Items/Item[$i]") ) {
                    last;
                }
                my @authors;
                for (
                    my $j = 1;
                    $j <= $xp->findvalue(
                        "count(/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Author)"
                    );
                    $j++
                    )
                {
                    push @authors,
                        $xp->findvalue(
                        "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Author[$j]"
                        );
                }

                my $pubdate = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/PublicationDate"
                );
                my $reldate = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/ReleaseDate"
                );

                $records{$pubdate}{title} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/PublicationDate"
                );
                $records{$pubdate}{title} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Title");
                $records{$pubdate}{author} = join( ", ", @authors );
                $records{$pubdate}{asin}
                    = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ASIN"),

                #print "Title: ",
                #    $xp->findvalue(
                #    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Title"),
                #    "\n", "Author: ", join( ", ", @authors ), "\n", "ASIN: ",
                #    $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ASIN"),
                #    "\n\n";
            }
        }

        $c->stash->{records} = \%records;
    }
    else {
        $c->stash->{error_msg} = "No search parameters entered.";
    }

    $c->stash->{template} = 'results.mhtml';
}

=head2 end

Forward to Mason View

=cut

sub end : Private {
    my ( $self, $c ) = @_;

    # Forward to View unless response body is already defined
    $c->forward( $c->view('V::Mason') ) unless $c->response->body;
}

sub query_aws : Private {
    my $keywords = shift;

    # Define parts of the REST request.
    my $baseurl       = "http://webservices.amazon.com/onca/xml";
    my $service       = "AWSECommerceService";
    my $accesskey     = "1GNG6V387CH1FWX4H182";
    my $operation     = "ItemSearch";
    my $searchindex   = "Books";
    my $responsegroup = "Request,Small";
    my $version       = "2005-10-13";

    # Assemble the REST request URL.
    my $request = "$baseurl?"
        . "Service=$service&"
        . "AWSAccessKeyId=$accesskey&"
        . "Operation=$operation&"
        . "Keywords=$keywords&"
        . "SearchIndex=$searchindex&"
        . "ResponseGroup=$responsegroup&"
        . "Version=$version";

    # Send the request using HTTP GET.
    my $ua = new LWP::UserAgent;
    $ua->timeout(30);
    my $response = get($request);

    return $response;
}



=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
