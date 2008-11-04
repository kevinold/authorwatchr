use inc::Module::Install;

name 'AW';
all_from 'lib/AW.pm';

#non-catalyst modules
requires 'DateTime' => 0.4305;
requires 'HTML::Lint';
requires 'Data::Visitor';
requires 'Tie::IxHash';
requires 'LWP::Simple';
requires 'DBIx::Class';
requires 'URI::Escape';
requires 'YAML';
requires 'Config::Any::YAML';
requires 'XML::XPath';
requires 'Test::Pod::Coverage';
requires 'XML::Feed';
requires 'HTML::Element';
requires 'HTML::Scrubber';
requires 'WebService::ISBNDB' => '0.33';
requires 'Text::Sentence';
requires 'Net::Amazon' => '0.43';
requires 'WWW::Google::SiteMap' => '1.09';
requires 'Log::Log4perl';
requires 'DBD::SQLite';
requires 'Moose';

#requires '';
requires 'Catalyst::Runtime' => '5.7015';
requires 'Catalyst::Plugin::Static::Simple';
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
requires 'Catalyst::Authentication::Store::DBIx::Class';
requires 'Catalyst::Plugin::Authentication::Credential::Password';
requires 'Catalyst::Plugin::RedirectAndDetach';
requires 'Catalyst::Model::DBIC::Schema';
requires 'Catalyst::Model::ISBNDB';
requires 'Catalyst::View::JSON';
requires 'Catalyst::View::Mason';
requires 'Catalyst::View::TT';
requires 'Catalyst::Plugin::XMLRPC';
#requires 'Catalyst::Plugin::Captcha';
requires 'Catalyst::Plugin::Unicode';
requires 'Catalyst::Plugin::ConfigLoader';
requires 'Catalyst::Action::RenderView';

build_requires 'SQL::Translator';

catalyst;

install_script glob('script/*.pl');
auto_install;
WriteAll;
