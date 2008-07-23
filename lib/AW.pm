package AW;

use strict;
use warnings;

use Catalyst::Runtime '5.70';

#
# Set flags and add plugins for the application
#
#         -Debug: activates the debug mode for very useful log messages
#   ConfigLoader: will load the configuration from a YAML file in the
#                 application's home directory
# Static::Simple: will serve static files from the application's root
#                 directory
#
#    Authorization::ACL
#    Authorization::Roles
#    Session::Store::FastMmap
#    Captcha
use Catalyst qw/
    ConfigLoader
    FormBuilder
    Static::Simple
    StackTrace

    Cache
    Authentication
    Authentication::Credential::Password

    Session
    Session::Store::DBIC
    Session::State::Cookie
    SubRequest
    RedirectAndDetach
    /;

our $VERSION = '0.01';

#
# Configure the application
#
__PACKAGE__->config( 
        name => 'AW',
        'Controller::FormBuilder' => {
            template_type => 'Mason',
        },
        
        );

#
# Start the application
#
__PACKAGE__->setup;

=pod
# Authorization::ACL Rules
__PACKAGE__->deny_access_unless(
        "/books/form_create",
        [qw/admin/],
    );
__PACKAGE__->deny_access_unless(
        "/books/form_create_do",
        [qw/admin/],
    );
__PACKAGE__->deny_access_unless(
        "/books/delete",
        [qw/user admin/],
    );
=cut

#
# IMPORTANT: Please look into AW::C::Root for more
#

=head1 NAME

AW - Catalyst based application

=head1 SYNOPSIS

    script/AW_server.pl

=head1 DESCRIPTION

Catalyst based application.

=head1 SEE ALSO

L<AW::C::Root>, L<Catalyst>

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
