use inc::Module::Install;

name 'authorwatch';
all_from 'lib/authorwatch.pm';

requires Catalyst => '5.7006';
requires 'Catalyst::Plugin::ConfigLoader';
requires 'Catalyst::Plugin::Static::Simple';
requires 'Catalyst::Action::RenderView';
requires 'Catalyst::Plugin::PageCache';
requires 'Catalyst::Plugin::Cache::Store::FastMmap';
requires 'Catalyst::Plugin::FormBuilder';
requires 'Catalyst::Plugin::StackTrace';
requires 'Catalyst::Plugin::Session';
requires 'Catalyst::Plugin::Session::Store::DBI';
requires 'Catalyst::Plugin::Session::Store::FastMmap';
requires 'Catalyst::Plugin::Cache';
requires 'Catalyst::Plugin::Session::State::Cookie';
requires 'Catalyst::Plugin::Textile';
requires 'Catalyst::Plugin::Authentication';
requires 'Catalyst::Plugin::Authentication::Store::DBIC';
requires 'Catalyst::Plugin::Authentication::Credential::Password';
requires 'Catalyst::Plugin::Captcha';
requires 'SQL::Translator';
requires 'Catalyst::Plugin::XMLRPC';
requires 'Config::Any::YAML';
requires 'XML::Feed';
requires 'Switch';
requires 'DateTime';
requires 'YAML';
requires 'LWP::Simple';
requires 'XML::XPath';
requires 'URI::Escape';
requires 'HTML::Element';
requires 'HTML::Scrubber';
requires 'Catalyst::Model::DBIC::Schema';
requires 'Catalyst::Model::ISBNDB';
requires 'Catalyst::View::JSON';
requires 'Catalyst::View::Mason';
requires 'Text::Sentence';
#requires '';


catalyst;

install_script glob('script/*.pl');
auto_install;
WriteAll;
