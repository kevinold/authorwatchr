use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'authorwatch' }
BEGIN { use_ok 'authorwatch::C::User' }

ok( request('/user')->is_success, 'Request should succeed' );


