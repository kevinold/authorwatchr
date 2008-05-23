use inc::Module::Install;

name 'AW';
all_from 'lib/AW.pm';

requires 'Catalyst::Runtime' => '5.7010';
requires 'Catalyst::Plugin::ConfigLoader';
requires 'Catalyst::Plugin::Static::Simple';
requires 'Catalyst::Action::RenderView';
requires 'Catalyst::Plugin::PageCache';
requires 'Catalyst::Plugin::Cache::Store::FastMmap';
requires 'Catalyst::Controller::FormBuilder';
requires 'Catalyst::Controller::BindLex';
requires 'Catalyst::Plugin::StackTrace';
requires 'Catalyst::Plugin::Session';
requires 'Catalyst::Plugin::Session::Store::DBIC';
requires 'Catalyst::Plugin::Session::Store::FastMmap';
requires 'Catalyst::Plugin::Cache';
requires 'Catalyst::Plugin::Cache::Store::FastMmap';
requires 'Catalyst::Plugin::Session::State::Cookie';
requires 'Catalyst::Plugin::Textile';
requires 'Catalyst::Plugin::SubRequest';
requires 'Catalyst::Plugin::Authentication';
requires 'Catalyst::Plugin::Authentication::Store::DBIC';
requires 'Catalyst::Plugin::Authentication::Credential::Password';
requires 'Catalyst::Plugin::RedirectAndDetach';
requires 'Catalyst::Model::DBIC::Schema';
requires 'Catalyst::Model::ISBNDB';
requires 'Catalyst::View::JSON';
requires 'Catalyst::View::Mason';
requires 'Catalyst::View::TT';
requires 'Catalyst::Plugin::XMLRPC';
#requires 'Catalyst::Plugin::Captcha';
requires 'YAML';

build_requires 'SQL::Translator';

#non-catalyst modules
requires 'XML::XPath';
requires 'Config::Any::YAML';
requires 'XML::Feed';
requires 'DateTime';
requires 'Test::Pod::Coverage';
requires 'LWP::Simple';
requires 'URI::Escape';
requires 'HTML::Element';
requires 'HTML::Scrubber';
requires 'WebService::ISBNDB' => '0.33';
requires 'Text::Sentence';
requires 'Net::Amazon' => '0.43';
requires 'WWW::Google::SiteMap' => '1.09';
requires 'Log::Log4perl';
requires 'DBD::SQLite';
#requires '';


catalyst;

install_script glob('script/*.pl');
auto_install;
WriteAll;
