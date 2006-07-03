#!/usr/bin/perl -w
use strict;
use WWW::Mechanize;
use WWW::Mechanize::FormFiller;
use URI::URL;

my $agent = WWW::Mechanize->new( autocheck => 1 );
my $formfiller = WWW::Mechanize::FormFiller->new();
$agent->env_proxy();

  $agent->get('http://authoryellowpages.com');
    $agent->form(1) if $agent->forms and scalar @{$agent->forms};
  $agent->form_name('b295');
  { local $^W; $agent->current_form->value('letter', 'A'); };
  $agent->submit();
  my @columns = ( '0,2' );
  require HTML::TableExtract;
  my $table = HTML::TableExtract->new( headers => [ @columns ]);
  (my $content = $agent->content) =~ s/\&nbsp;?//g;
  $table->parse($content);
  print join(", ", @columns),"\n";
  for my $ts ($table->table_states) {
    for my $row ($ts->rows) {
      print join(", ", @$row), "\n";
    };
  };

  #print $agent->content,"\n";
