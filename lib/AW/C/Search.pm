package AW::C::Search;

use strict;
use warnings;
use base 'Catalyst::Controller';
use LWP::Simple qw($ua get);
use XML::XPath;
use DateTime;
use POSIX qw(strftime);
use URI::Escape;
use HTML::Scrubber;
use Net::Amazon;
use Data::Dumper;
use Log::Log4perl qw(:easy);
use AwUtil;

=head1 NAME

AW::C::Search - Catalyst Controller

=head1 SYNOPSIS

See L<AW>

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

sub index : Local {
    my ( $self, $c ) = @_;

    $c->stash->{template} = 'results.tt2';
    my $svalue      = $c->req->param("author");
    my $search_term = $c->req->param("author");

    #$c->log->debug("**********svalue is: $svalue");

    if ($svalue) {

        #Get search terms urlified
        my @search = split / /, $svalue;
        my $keywords = join " ", @search;

        # setup cache key
        my $authcachekey = join "_", @search;

        my $today = strftime "%m-%Y", localtime;
            # Real search
            #"author: $keywords and pubdate: after $today and binding: Hardcover"
        my $pw_search = uri_escape(
            "author: $keywords and pubdate: after 09-2007 and binding: Hardcover"
        );
    
        
        my $records;
        
        #unless( $records = $c->cache->get($authcachekey) ) {
            #if (-f $c->config('log_4_perl_conf')) {
            #    Log::Log4perl->init($c->config('log_4_perl_conf'));
            #}
            
            my $ua = Net::Amazon->new(token => '1GNG6V387CH1FWX4H182', cache => $c->cache);
            my $response = $ua->search(power => $pw_search, mode => 'books', type => 'Medium', sort => 'daterank');
            # When ready, pass Associate Tag this way
            #my $response = $ua->search(power => $pw_search, mode => "books", type => "Medium", AssociateTag => 'kevin123');

            $c->log->debug("**********RUNNING AMAZON QUERY", Dumper($records));
            if($response->is_success()) {
                #next if $->year() > 2008;
                #print Dumper($response->properties);
                #for my $prop ($response->properties) {
                #    next if $prop->year() > 2008;
                #    print $prop->as_string(), " ", $prop->ReleaseDate(), " ", $prop->similar_asins(), "\n";
                #}
                $records = $response;
                #$c->cache->set($authcachekey, $response);
                #$c->log->debug("**********After cache set", Dumper($c->cache->get($authcachekey)));
            } else {
                #print "Error: ", $response->message(), "\n";
                #$c->log->debug("**********Error:", $response->message());
                $c->stash->{error_msg} = "Error: " . $response->message();
            }

        #}

        # Results to display
        $c->stash->{records}   = $records;

        # Normalize the term
        my $norm_term = AwUtil::normalize($search_term);

        # If user is logged in, determine if they've already saved this author
        my $auth_is_saved = 0;
        if ($c->user) {
            $auth_is_saved = $c->model('AwDB::UserAuthors')->search(
                {
                    author_id => $norm_term,
                    user_id => $c->user->id,
                }
            );
        }
        $c->stash->{auth_is_saved} = $auth_is_saved;
        
        # Normalized term
        $c->stash->{norm_term} = $norm_term;

        #Capitalize first and last name
        $search_term =~ s/(\w+)/\u\L$1/g;
        $c->stash->{search_term} = $search_term;

        #if ($c->user) {
        #    $c->stash->{myauthors} = $c->subreq('/user/myauthors');
        #}
    }

}


sub aws : Private {
    my ( $self, $c ) = @_;

    $c->stash->{template} = 'results.mhtml';
    my $svalue      = $c->req->param("author");
    my $search_term = $c->req->param("author");

    #$c->log->debug("**********svalue is: $svalue");

    if ($svalue) {

        #Get search terms urlified
        my @search = split / /, $svalue;
        my $keywords = join " ", @search;

        # setup cache key
        my $authcachekey = join "_", @search;

        my $today = strftime "%m-%Y", localtime;
            # Real search
            #"author: $keywords and pubdate: after $today and binding: Hardcover"
        my $pw_search = uri_escape(
            "author: $keywords and binding: Hardcover"
        );
    
        
        my $records;
        
        unless ( $records = $c->cache->get($authcachekey) ) {

        # Perform search
        my $response = query_aws($pw_search);

        #$c->log->debug("Response: $response");

        # Process XML response with XPath.
        my $xp = XML::XPath->new( xml => $response );

        if ( $xp->find("//Error") ) {
            my $ec = $xp->findvalue("//Error/Code");
            my $em = $xp->findvalue("//Error/Message");

            #$c->stash->{error_msg} = "$ec: $em" ;
            $c->stash->{error_msg} = "No Results Found.";

            #Put "Author Suggest" code here
        }
        else {
            for ( my $i = 1; $i <= 10; $i++ ) {
                if ( !$xp->find("/ItemSearchResponse/Items/Item[$i]") ) {
                    last;
                }

                # Remove Large Print Editions
                next if $xp->findvalue("/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Edition") =~ /large/i;

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

#Check pubdate and make sure year is a valid year and is not too far in the future
                my $pd = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/PublicationDate"
                );
                my ( $yr, $mon, $day ) = split /-/, $pd;
                warn "yr is: ", $yr;
                next unless $yr  =~ /^200/;
                next unless $mon =~ /^[0|1][0-9]/;
                next unless $day =~ /^[0|1|2|3][0-9]/;


                my $asin = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ASIN");

                $records->{$asin}{detailpageurl} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/DetailPageURL");

                $records->{$asin}{smallimage} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/SmallImage/URL");
                $records->{$asin}{smallimageheight} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/SmallImage/Height");
                $records->{$asin}{smallimagewidth} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/SmallImage/Width");

                $records->{$asin}{mediumimage} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/MediumImage/URL");
                $records->{$asin}{mediumimageheight} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/MediumImage/Height");
                $records->{$asin}{mediumimagewidth} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/MediumImage/Width");

                $records->{$asin}{largeimage} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/LargeImage/URL");
                $records->{$asin}{largeimageheight} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/LargeImage/Height");
                $records->{$asin}{largeimagewidth} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/LargeImage/Width");

                my $editorialreview = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/EditorialReviews/EditorialReview/Content"
                );
                
                # Clean HTML from Editorial Review
                $records->{$asin}{editorialreview} = straighten_html($editorialreview);

                $records->{$asin}{formattedprice} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/Offers/Offer/OfferListing/Price/FormattedPrice"
                    )
                    || 'N/A';

                $records->{$asin}{title} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/Title"
                );
                $records->{$asin}{author} = join( ", ", @authors );
                $records->{$asin}{pubdate} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/PublicationDate"
                );
                $records->{$asin}{reldate} = $xp->findvalue(
                    "/ItemSearchResponse/Items/Item[$i]/ItemAttributes/ReleaseDate"
                );

            }
        }

            $c->cache->set($authcachekey, $records);
        }
        $c->stash->{records}   = $records;
        $c->stash->{error_msg} = "No Results Found." unless $records;

        #Capitalize first and last name
        $search_term =~ s/(\w+)/\u\L$1/g;
        $c->stash->{search_term} = $search_term;
        
    }
    else {
        $c->stash->{error_msg} = "No search parameters entered.";
    }

}

=head2 end

Forward to Mason View

=cut

#sub end : Private {
#    my ( $self, $c ) = @_;

    # Forward to View unless response body is already defined
#    $c->forward( $c->view('Mason') ) unless $c->response->body;
#}

sub query_aws : Private {
    my $keywords = shift;

    # Define parts of the REST request.
    my $baseurl   = "http://webservices.amazon.com/onca/xml";
    my $service   = "AWSECommerceService";
    my $accesskey = "1GNG6V387CH1FWX4H182";

    #my $availability  = "New Release";
    my $operation     = "ItemSearch";
    my $searchindex   = "Books";
    my $responsegroup = "Request,Large";

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

    warn "URL Sent:", $request;
    my $response = get($request);

    return $response;
}




sub straighten_html {
    my $body_content = shift;

    #my @allow = qw[ strong em p br li ul i u ol b i];
    my @allow = qw[ strong em ];

    my @rules = ( script => 0, img => 0, );
    my @default = (
        0   =>    # default rule, deny all tags
		   {
            '*'           => 1, # default rule, allow all attributes
            'href'        => qr{^(?!(?:java)?script)}i,
            'src'         => qr{^(?!(?:java)?script)}i,
    #   If your perl doesn't have qr
    #   just use a string with length greater than 1
            'cite'        => '(?i-xsm:^(?!(?:java)?script))',
            'language'    => 0,
            'name'        => 1, # could be sneaky, but hey ;)
            'onblur'      => 0,
            'onchange'    => 0,
            'onclick'     => 0,
            'ondblclick'  => 0,
            'onerror'     => 0,
            'onfocus'     => 0,
            'onkeydown'   => 0,
            'onkeypress'  => 0,
            'onkeyup'     => 0,
            'onload'      => 0,
            'onmousedown' => 0,
            'onmousemove' => 0,
            'onmouseout'  => 0,
            'onmouseover' => 0,
            'onmouseup'   => 0,
            'onreset'     => 0,
            'onselect'    => 0,
            'onsubmit'    => 0,
            'onunload'    => 0,
            'src'         => 0,
            'type'        => 0,
        }
		   );
     ## preferred way to create the same object
    my $scrubber = HTML::Scrubber->new(
                                       allow   => \@allow,
                                       rules   => \@rules,
                                       default => \@default,
                                       comment => 1,
                                       process => 0,
                                       );
    my $bc = $scrubber->scrub($body_content);
    return $bc;
}



=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;