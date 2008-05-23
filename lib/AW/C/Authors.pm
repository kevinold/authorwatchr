package AW::C::Authors;

use strict;
use warnings;
use base 'Catalyst::Controller';
use HTML::Element;

=head1 NAME

AW::C::Authors - Catalyst Controller

=head1 SYNOPSIS

See L<AW>

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut

=head2 default

    send html of author list

=cut

sub default : Private {
    my ( $self, $c ) = @_;
    $c->response->body("This is the authors module");
}

sub isbnauthor : Local {
    my ( $self, $c ) = @_;

    my $book = $c->model('ISBNDB')->find_book( '0312340427' );
    $c->response->body("$book->get_id");
=pod
    my @authors = $c->model('ISBNDB')->search_authors({ name => 'John Grisham' });

    my @elements;
    # if returned, parse through them and build html
    if ( @authors ) {

        foreach my $auth ( @authors ) {
            my $name = $auth->get_name;
            push @elements, HTML::Element->new('li')->push_content($name);    
        }

        $c->res->body( HTML::Element->new('ul')->push_content(@elements)->as_HTML );
    } else {
        $c->response->body("<ul></ul>");
    }
=cut
}


sub suggest : Local {
    my ( $self, $c ) = @_;

    $c->model('AwDB')->storage->debug(1);

    my $term = $c->req->param("value");
    $term =~ s/[^A-Za-z0-9 ]//g;

    my $html;
    my @authors;
    @authors = $c->model('AwDB::Authors')->search(
        {   -or => {
                first_name => { -like => "%$term%" },
                last_name  => { -like => "%$term%" }
            }
        }
    );

    my @elements;
    # if returned, parse through them and build html
    if ( @authors ) {

        foreach my $auth ( @authors ) {
            my $name = $auth->first_name . ' ' . $auth->last_name;
            push @elements, HTML::Element->new('li')->push_content($name);    
        }

        $c->res->body( HTML::Element->new('ul')->push_content(@elements)->as_HTML );
    } else {
        $c->response->body("<ul></ul>");
    }
}


=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;