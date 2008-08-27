#!/usr/bin/perl -w

use strict;
use warnings;
use Getopt::Long;
use Pod::Usage;
use FindBin;
use Net::Amazon;
use lib "$FindBin::Bin/../lib";
use AW::Schema;
use Data::Dumper;

#my $schema = AW::Schema->connect('dbi:mysql:database=authorwatch;host=kold.homelinux.com;port=3306','root','kevin');
#$schema->resultset('Authors')->find_or_create({ first_name => $fname, last_name => $lname });

#BrowseNode ID's
# Legal Thrillers - 10487

my $ua = Net::Amazon->new(token => '1GNG6V387CH1FWX4H182');
my $response = $ua->search(browsenode=>"10487", mode=>"books");

if($response->is_success()) {
    #warn Dumper($response);
    
    foreach my $prop ($response->properties) {
        print $prop->ProductName . " " . $prop->author, "\n";
    }

} else {
    warn "Error: " . $response->message();
}

=pod
my $force = 0;
my $mech  = 0;
my $help  = 0;

GetOptions(
    'nonew|force'    => \$force,
    'mech|mechanize' => \$mech,
    'help|?'         => \$help
 );

pod2usage(1) if ( $help || !$ARGV[0] );
=cut


1;

=head1 NAME

browsenodes.pl - Browsenodes

=head1 SYNOPSIS

=head1 DESCRIPTION

=head1 AUTHOR

Kevin Old, C<kevin@kevinold.com>

=head1 COPYRIGHT

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut
