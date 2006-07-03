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

my $p = HTML::TokeParser->new("a.html");
while ( my $token = $p->get_tag("b") ) {
    my $text = $p->get_trimmed_text("/b");
    print $text, "\n";
}
