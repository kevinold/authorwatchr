#!/usr/bin/perl

use warnings;
use strict;
#Written by Kevin at Wed 29 Mar 2006 01:35:14 PM EST

use YAPE::Regex::Explain;


#my $reg = /^IMAGES\:EPS_files\:(.*)$/;
#my $reg = '(?-imsx:/^(?:IMAGES:EPS_files)?:?(.*)/)';

my $reg = '(?-imsx:/page=(\d+).*letter=(\d+)$/)';
my $exp = YAPE::Regex::Explain->new($reg)->explain;

print $exp;
