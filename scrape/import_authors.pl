#!/usr/bin/perl -w
use strict;
use WWW::Mechanize;
use WWW::Mechanize::FormFiller;
use URI::URL;
use HTML::TokeParser;
use lib ('/home/kevin/projects/authorwatch/lib');
use AwDB;

my $schema = AwDB->connect('dbi:mysql:database=authorwatch;host=kold.homelinux.com;port=3306','root','kevin');


my $agent = WWW::Mechanize->new( autocheck => 1 );
my $formfiller = WWW::Mechanize::FormFiller->new();
$agent->env_proxy();

my @letters = qw(L M N O P Q R S T U V W X Y Z);

# foreach letter A-Z
foreach my $letter (@letters) {

    $agent->get('http://authoryellowpages.com');
    $agent->form(1) if $agent->forms and scalar @{ $agent->forms };
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
        if ($af) {
            #print $text, "\n";
            my ($lname, $fname) = split /,/, $text;
            map { s/^\s+//g; s/\s+$//g; } $lname, $fname;
            $schema->resultset('Authors')->find_or_create({ first_name => $fname, last_name => $lname });
        }
        $af = 1 if $text =~ /authors found/;
    }

}

