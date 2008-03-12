#!/usr/bin/perl
# Session.pm 
# Copyright (c) 2006 Jonathan Rockway <jrockway@cpan.org>

package AwDB::Session;

use base qw/DBIx::Class/;

__PACKAGE__->load_components(qw/Core/);
__PACKAGE__->table('sessions');
__PACKAGE__->add_columns(
  id =>           { data_type => "CHAR", is_nullable => 0, size => 72 },
  session_data => { data_type => "TEXT", is_nullable => 1, size => undef },
  expires      => { data_type => "INTEGER", is_nullable => 1, size => undef}
);

__PACKAGE__->set_primary_key('id');

1;
