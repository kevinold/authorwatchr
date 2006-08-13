use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'authorwatch' }
BEGIN { use_ok 'authorwatch::C::Authors' }

ok( request('/authors')->is_success, 'Request should succeed' );


