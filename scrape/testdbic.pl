#!/usr/bin/perl

use warnings;
use strict;
#Written by Kevin at Mon 03 Jul 2006 03:53:37 PM EDT
#use lib ('/home/kevin/projects/authorwatch/lib');
use lib ('../lib');
use AwDB;

#my $schema = AwDB->connect('dbi:mysql:database=authorwatch;host=kold.homelinux.com;port=3306','root','kevin');
my $schema = AwDB->connect('dbi:SQLite:../aw.db');

#$schema->resultset('Authors')->create({ first_name => 'John', last_name => 'Grisham' });
#my @all_authors = $schema->resultset('Authors')->all;

foreach my $auth ( @all_authors ) {

    print $auth->first_name, $auth->last_name, "\n";

}
