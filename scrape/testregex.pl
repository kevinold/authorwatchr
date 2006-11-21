#!/usr/bin/perl

use warnings;
use strict;
#Written by Kevin at Mon 03 Jul 2006 11:03:42 AM EDT
#

my $string = 'name.asp?page=3&recs=20&stype=letter&letter=A';
$string =~ /page=(\d+).*letter=[A-Z]/;
