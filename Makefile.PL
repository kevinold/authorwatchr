use inc::Module::Install;

name 'authorwatch';
all_from 'lib/authorwatch.pm';

requires Catalyst => '5.64';

catalyst;

install_script glob('script/*.pl');
auto_install;
WriteAll;
