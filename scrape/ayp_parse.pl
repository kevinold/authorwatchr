#!/usr/bin/perl
#
use warnings;
use strict;
use HTML::TokeParser;

=pod
my $p = HTML::TokeParser::Simple->new("a.html");

while ( my $token = $p->get_token) {
	next unless $token->is_start_tag('b');
	print $token->as_is;
}
=cut
my $af = 0;
my $p = HTML::TokeParser->new("A_1.html");
while ( my $token = $p->get_tag("b") ) {
    my $text = $p->get_trimmed_text("/b");
    if ( $af ) {
        print $text, "\n";
    }
    $af = 1 if $text =~ /authors found/;
}
