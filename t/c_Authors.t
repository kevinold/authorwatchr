use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'AW' }
BEGIN { use_ok 'AW::Controller::Authors' }

ok( request('/authors')->is_success, 'Request should succeed' );


