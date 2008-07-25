package AW::C::Search;

use strict;
use warnings;
use base 'Catalyst::Controller';
use POSIX qw(strftime);
use URI::Escape;
use HTML::Scrubber;
use Net::Amazon;
use Data::Dumper;
use Log::Log4perl qw(:easy);
use XML::Feed;
use AwUtil;

=head1 NAME

AW::C::Search - Catalyst Controller

=head1 SYNOPSIS

See L<AW>

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 index - searches for the specified author

=cut

sub index :Path :Args {
    my ( $self, $c ) = @_;
    my $svalue      = $c->request->param("author");
    my $search_term = $svalue;
    $c->stash->{template} = 'results.tt2';

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
            #"author: $keywords and pubdate: after 09-2007 and binding: Hardcover"
        my $pw_search = uri_escape(
            "author: $keywords and binding: hardcover or paperback and language: english"
        );
    
        
        my $records;
        
        #unless( $records = $c->cache->get($authcachekey) ) {
            #if (-f $c->config('log_4_perl_conf')) {
            #    Log::Log4perl->init($c->config('log_4_perl_conf'));
            #}
            
            my $ua = Net::Amazon->new(token => $c->config->{na_token}, cache => $c->cache);
            my $response = $ua->search(power => $pw_search, mode => 'books', type => 'Medium', sort => 'daterank');
            # When ready, pass Associate Tag this way
            #my $response = $ua->search(power => $pw_search, mode => "books", type => "Medium", AssociateTag => 'kevin123');

            if($response->is_success()) {
                $records = $response;
                #$c->log->debug("**********RUNNING AMAZON QUERY", Dumper($records));
                #$c->cache->set($authcachekey, $response);
                #$c->log->debug("**********After cache set", Dumper($c->cache->get($authcachekey)));
            } else {
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

    }

}

sub rss :Path('rss') :Args(0) {
    my ($self, $c) = @_;
    $c->log->debug('in rss b4 index call', $c->stash->{template});
    $c->forward('index');

    my $feed = XML::Feed->new('RSS');
    $feed->title($c->config->{name} . ' RSS Feed');
    $feed->link($c->req->base);    # link to the site.
    $feed->description('Results for ' . $c->stash->{search_term});

    my $count;
    # Process the entries
    foreach my $prop ($c->stash->{records}->properties) {
        next unless $prop->year;
        next if $prop->year < $c->config->{active_year};
        my $feed_entry = XML::Feed::Entry->new('RSS');
        $feed_entry->title($prop->ProductName. ' by ' . $prop->author);
        $feed_entry->content($prop->ProductDescription);
        $feed->add_entry($feed_entry);
        $count++;
    }

    $c->res->content_type('application/rss+xml');
    $c->res->body($feed->as_xml);

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
