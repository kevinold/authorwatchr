#!/usr/bin/perl -w
use strict;
use WWW::Mechanize;
use WWW::Mechanize::FormFiller;
use URI::URL;

my $agent = WWW::Mechanize->new( autocheck => 1 );
my $formfiller = WWW::Mechanize::FormFiller->new();
$agent->env_proxy();

  $agent->get('http://www.authoryellowpages.com');
    $agent->forms(1) if $agent->forms and scalar @{$agent->forms};
  $agent->form_name('b295');
  { local $^W; $agent->current_form->value('letter', 'A'); };
  $agent->submit();
  #print $agent->content,"\n";
  $agent->save_content("a.html");
  
