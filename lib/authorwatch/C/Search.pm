package authorwatch::C::Search;

use strict;
use warnings;
use base 'Catalyst::Controller';
use LWP::Simple qw($ua get);
use XML::XPath;
use DateTime;
use POSIX qw(strftime);
use URI::Escape;

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
#sub default : Private {
#    my ( $self, $c ) = @_;

    # Hello World
    #$c->response->body( $c->welcome_message );
    #$c->response->redirect("index.html");
#}

sub aws : Local {
    my ( $self, $c ) = @_;

    $c->stash->{template} = 'results.mhtml';
    my $svalue = $c->req->param("autocomplete_parameter");
    my $search_term = $c->req->param("autocomplete_parameter");

    #$c->log->debug("**********svalue is: $svalue");

    if ($svalue) {

        #Get search terms urlified
        my @search = split / /, $svalue;
        my $keywords = join " ", @search;

        my $today = strftime "%m-%Y", localtime;
        my $pw_search = uri_escape("author: $keywords and pubdate: after $today and binding: Hardcover");
        
        # Perform search
        my $response = query_aws($pw_search);

        #$c->log->debug("Response: $response");

        # Process XML response with XPath.
        my $xp = XML::XPath->new( xml => $response );

        my %records;

        if ( $xp->find("//Error") ) {
            my $ec = $xp->findvalue("//Error/Code");
            my $em = $xp->findvalue("//Error/Message");

            $c->stash->{error_msg} = "$ec: $em" ;

            #Put "Author Suggest" code here
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


                my $asin = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ASIN");

                $records{$asin}{detailpageurl} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/DetailPageURL");

                $records{$asin}{smallimage} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/SmallImage/URL");
                $records{$asin}{smallimageheight} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/SmallImage/Height");
                $records{$asin}{smallimagewidth} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/SmallImage/Width");

                $records{$asin}{mediumimage} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/MediumImage/URL");
                $records{$asin}{mediumimageheight} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/MediumImage/Height");
                $records{$asin}{mediumimagewidth} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/MediumImage/Width");

                $records{$asin}{largeimage} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/LargeImage/URL");
                $records{$asin}{largeimageheight} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/LargeImage/Height");
                $records{$asin}{largeimagewidth} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/LargeImage/Width");

                $records{$asin}{editorialreview} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/EditorialReviews/EditorialReview/Content");

                $records{$asin}{formattedprice} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/OfferSummary/LowestNewPrice/FormattedPrice");

                $records{$asin}{title} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Title");
                $records{$asin}{author} = join( ", ", @authors );
                $records{$asin}{pubdate} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ItemAttributes/PublicationDate");
                $records{$asin}{reldate} = $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ItemAttributes/ReleaseDate");

            }
        }

        $c->stash->{records} = \%records;
        $c->stash->{search_term} = $search_term;
    }
    else {
        $c->stash->{error_msg} = "No search parameters entered.";
    }

}

=head2 end

Forward to Mason View

=cut

sub end : Private {
    my ( $self, $c ) = @_;

    # Forward to View unless response body is already defined
    $c->forward( $c->view('Mason') ) unless $c->response->body;
}

sub query_aws : Private {
    my $keywords = shift;

    # Define parts of the REST request.
    my $baseurl       = "http://webservices.amazon.com/onca/xml";
    my $service       = "AWSECommerceService";
    my $accesskey     = "1GNG6V387CH1FWX4H182";
    #my $availability  = "New Release";
    my $operation     = "ItemSearch";
    my $searchindex   = "Books";
    my $responsegroup = "Request,Medium";
    #my $version       = "2006-05-17";

    # Assemble the REST request URL.
    my $request = "$baseurl?"
        . "Service=$service&"
        . "AWSAccessKeyId=$accesskey&"
        . "Operation=$operation&"
        . "Power=$keywords&"
        . "SearchIndex=$searchindex&"
        . "ResponseGroup=$responsegroup";
    #   . "Availability=$operation&"
    #    . "Keywords=$keywords&"
    #    . "Version=$version";

    # Send the request using HTTP GET.
    my $ua = new LWP::UserAgent;
    $ua->timeout(30);
    #warn "URL Sent:", $request;
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
