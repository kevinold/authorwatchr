package authorwatch::C::Root;

use strict;
use warnings;
use base 'Catalyst::Controller';
use LWP::Simple qw($ua get);
use XML::XPath;

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config->{namespace} = '';

=head1 NAME

authorwatch::C::Root - Root Controller for this Catalyst based application

=head1 SYNOPSIS

See L<authorwatch>.

=head1 DESCRIPTION

Root Controller for this Catalyst based application.

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

sub aws_search : Local {
    my ( $self, $c ) = @_;

    my $svalue = $c->request->params->{svalue} || "";

    if ($svalue) {

        #Get search terms urlified
        my @search = split / /, $svalue;
        my $keywords = join "%20", @search;

        #Perform search
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

sub query_aws {

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

    # Process XML response with XPath.
    my $xp = XML::XPath->new( xml => $response );

    if ( $xp->find("//Error") ) {
        print "There was an error processing your request:\n",
            "  Error code: ", $xp->findvalue("//Error/Code"), "\n", "  ",
            $xp->findvalue("//Error/Message"), "\n\n";
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

            print "Title: ",
                $xp->findvalue(
                "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Title"),
                "\n", "Author: ", join( ", ", @authors ), "\n", "ASIN: ",
                $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ASIN"),
                "\n\n";
        }
    }

}

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
