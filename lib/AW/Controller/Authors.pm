package AW::Controller::Authors;

use strict;
use warnings;
use base 'Catalyst::Controller';
use HTML::Element;
use Data::Dumper;

=head1 NAME

AW::Controller::Authors - Catalyst Controller

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
    
    my $body;
    my $book = $c->model('ISBNDB')->search_books( {isbn =>'0385490992'} );
    $body = $book->first->get_title;

    my $authors = $c->model('ISBNDB')->search_authors({ name => 'John Grisham' });

    my @elements;
    # if returned, parse through them and build html
    if ( $authors ) {

        #print $authors->get_total_results, " books found.\n";
        while (my $auth = $authors->next) {
            my $name = $auth->get_name;
            push @elements, HTML::Element->new('li')->push_content($name);    
        }

        $body .= HTML::Element->new('ul')->push_content(@elements)->as_HTML;
    } else {
        $body .= "<ul></ul>";
    }

    $c->response->body($body);
}


sub suggest : Local {
    my ( $self, $c ) = @_;

    $c->model('DB')->storage->debug(1);

    my $term = $c->req->param("value");
    $term =~ s/[^A-Za-z0-9 ]//g;

    my $html;
    my @authors;
    @authors = $c->model('DB::Authors')->search(
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
