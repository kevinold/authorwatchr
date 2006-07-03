#!/usr/bin/perl -w
use strict;
use WWW::Mechanize;
use WWW::Mechanize::FormFiller;
use URI::URL;

my $agent = WWW::Mechanize->new( autocheck => 1 );
my $formfiller = WWW::Mechanize::FormFiller->new();
$agent->env_proxy();

$agent->get('http://authoryellowpages.com');
$agent->form(1) if $agent->forms and scalar @{ $agent->forms };
$agent->form_name('b295');
{ local $^W; $agent->current_form->value( 'letter', 'A' ); };
$agent->submit();

my @alinks = $agent->find_all_links( url_regex => qr/name\.asp.*letter=A/ );

foreach my $link (@alinks) {
    my $url = $link->url;
    my $name = $link->name;
    print "$url $name\n";
}
