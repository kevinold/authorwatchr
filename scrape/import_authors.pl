#!/usr/bin/perl -w

use strict;
use WWW::Mechanize;
use WWW::Mechanize::FormFiller;
use URI::URL;
use HTML::TokeParser;
use FindBin;
use lib "$FindBin::Bin/../lib";
use Data::Dumper;
use AW::Schema;
use AwUtil;

my $dsn = "dbi:SQLite:$FindBin::Bin/../aw.db";

my $schema = AW::Schema->connect( $dsn );

my $agent = WWW::Mechanize->new( autocheck => 1 );
my $formfiller = WWW::Mechanize::FormFiller->new();
$agent->env_proxy();

my @letters = qw(L M N O P Q R S T U V W X Y Z);

# foreach letter A-Z
foreach my $letter (@letters) {

    $agent->get('http://authoryellowpages.com');
    $agent->forms(1) if $agent->forms and scalar @{ $agent->forms };
    $agent->form_name('b295');
    { local $^W; $agent->current_form->value( 'letter', "$letter" ); };
    $agent->submit();

    # process this page
    my $save_as = $letter . '_1';
    $agent->save_content("$save_as.html");
    process_page($save_as);

    my @alinks
        = $agent->find_all_links( url_regex => qr/name\.asp.*letter=$letter/ );

    foreach my $link (@alinks) {
        my $url = $link->url;
        $url =~ /page=(\d+)/;
        my $page = $1;
        my $name = $link->name;

        #print $url, $name, $page "\n";

        $agent->get($url);
        my $save_as = $letter . '_' . $page;
        $agent->save_content("$save_as.html");
        process_page($save_as);
    }

}

sub process_page {
    my $page = shift;

    my $af = 0;
    my $p  = HTML::TokeParser->new("$page.html");
    while ( my $token = $p->get_tag("b") ) {
        my $text = $p->get_trimmed_text("/b");
        # go down 3 tokens to and get the genres if they are there
        $p->get_token();
        $p->get_token();
        $p->get_token();
        my $genres = $p->get_trimmed_text();


        if ($af) {
            print $text, "\n";
            my ($lname, $fname) = split /,/, $text;
            ($lname, $fname) = map { AwUtil::trim($_) } $lname, $fname;
            my $disp_name = "$fname $lname";
            my $auth_norm = AwUtil::normalize($disp_name);

            # Add author to authorsyp table
            $schema->resultset('AuthorsYP')->find_or_create({ id => $auth_norm, display_name => $disp_name});

            if ($genres) {
                my @genres = split /,/, $genres;
                @genres = map { AwUtil::trim($_) } @genres;
                foreach my $g (@genres) {

                    #print "g: <", $g, ">\n";
                    # Add genre to genre table and get it's id
                    my $genre_id = $schema->resultset('Genres')->find_or_create({display_name => $g})->id;

                    # Link author and genre
                    $schema->resultset('GenreAuthors')->find_or_create({genre_id => $genre_id, author_id => $auth_norm});
                }
            }

        }
        $af = 1 if $text =~ /authors found/;
    }

}

