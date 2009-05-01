#!/usr/bin/perl

use warnings;
use strict;
#Written by Kevin at Fri May  1 16:48:23 2009
use Net::Amazon;
use Data::Dumper;

my $ua = Net::Amazon->new(token => '1GNG6V387CH1FWX4H182');
my $response = $ua->search(power => 'author: randal schwartz' , mode => 'books', type => 'Medium', sort => 'daterank');

my $records;

if($response->is_success()) {
    for my $prop ($response->properties) {
        warn ref $prop;
        next if $prop->year() < 2008;
        push @{$records}, $prop;
    }
}

sub print_details {
    foreach my $rec (@$records) {
        warn ref $rec;
        print $rec->as_string(), " ", $rec->ReleaseDate(), " ", $rec->similar_asins(), "\n";
    }
}

print_details();
