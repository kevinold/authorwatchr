use strict;
use warnings;
use Test::More tests => 4;

BEGIN { use_ok 'Catalyst::Test', 'AW' }
BEGIN { use_ok 'AW::Controller::Search' }

ok( request('/search')->is_success, 'Request should succeed' );

content_like('/search/?author=john+grisham', qr/Save <b>John Grisham/, 'content check');


