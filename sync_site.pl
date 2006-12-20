#!/usr/bin/perl

use warnings;
use strict;
#Written by Kevin at Tue 19 Dec 2006 02:41:35 PM EST
use File::Temp;

my $svnroot = 'svn+ssh://kold@kold.homelinux.com/home/kold/authorwatch';
my $tmpdir = File::Temp::tempdir('sync_authorwatch.XXXXXX', TMPDIR => 1, CLEANUP => 1);

chdir $tmpdir;

print "Exporting authorwatch from SVN...\n";

system qq(svn -q export $svnroot authorwatch);

print "Syncing authorwatch...\n";
system(qq(rsync -e ssh -zva --delete $tmpdir/authorwatch/ authorwatch\@authorwatcher.com:/home/authorwatch/site));
