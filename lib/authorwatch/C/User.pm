package authorwatch::C::User;

use strict;
use warnings;
use base 'Catalyst::Controller';

=head1 NAME

authorwatch::C::User - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index 

=cut

sub index : Private {
    my ( $self, $c ) = @_;

    #$c->response->body('Matched authorwatch::C::User in User.');
}

=head2 save_author

Save author to a users list

=cut

sub save_author : Local {
    my ( $self, $c ) = @_;

    #$c->stash->{template} = 'results.mhtml';
    #my $svalue = $c->req->param("autocomplete_parameter");

}




=head2 list_authors

Show a users list of authors

=cut

sub list_authors : Local {
    my ( $self, $c ) = @_;

    # Debug sql statements
    #$c->model('AwDB::UserAuthors')->storage->debug(1);

    my $user_id = $c->req->param("user_id");

    # Lookup authors for User
    my @authors;
    @authors = $c->model('AwDB::UserAuthors')->search({ user_id => $user_id });
=pod
        {   -or => {
                first_name => { -like => "%$term%" },
                last_name  => { -like => "%$term%" }
            }
        }
=cut

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

    #$c->stash->{template} = 'list_authors.mhtml';
}

=head2 end

Forward to Mason View

=cut

#sub end : Private {
#    my ( $self, $c ) = @_;

    # Forward to View unless response body is already defined
#    $c->forward( $c->view('Mason') ) unless $c->response->body;
#}

=head1 AUTHOR

Kevin Old

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
