package authorwatch;

use strict;
use warnings;

#
# Set flags and add plugins for the application
#
#         -Debug: activates the debug mode for very useful log messages
#   ConfigLoader: will load the configuration from a YAML file in the
#                 application's home directory
# Static::Simple: will serve static files from the application's root 
#                 directory
#
use Catalyst qw/-Debug ConfigLoader Static::Simple/;

our $VERSION = '0.01';

#
# Configure the application 
#
__PACKAGE__->config( name => 'authorwatch' );

#
# Start the application
#
__PACKAGE__->setup;

#
# IMPORTANT: Please look into authorwatch::C::Root for more
#

=head1 NAME

authorwatch - Catalyst based application

=head1 SYNOPSIS

    script/authorwatch_server.pl

=head1 DESCRIPTION

Catalyst based application.

=head1 SEE ALSO

L<authorwatch::C::Root>, L<Catalyst>

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
