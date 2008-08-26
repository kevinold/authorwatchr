#!/usr/bin/perl

package AwDB::Book;

use base qw/DBIx::Class/;

__PACKAGE__->load_components(qw/PK::Auto Core/);
__PACKAGE__->table('books');
__PACKAGE__->add_columns(
    id => {
        'data_type'         => 'INTEGER',
        'size'              => undef,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'id',
        'is_auto_increment' => 1,
        'default_value'     => '',
    },
    isbn => {
        'data_type'         => 'VARCHAR',
        'size'              => 14,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'isbn',
        'is_auto_increment' => 0,
        'default_value'     => '',
    },
    title => {
        'data_type'         => 'VARCHAR',
        'size'              => 255,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'title',
        'is_auto_increment' => 0,
        'default_value'     => '',
    },
    author_id => {
        'data_type'         => 'VARCHAR',
        'size'              => 128,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'author_id',
        'is_auto_increment' => 0,
        'default_value'     => '',
    },
    release_date => {
        'data_type'         => 'DATE',
        'size'              => undef,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'release_date',
        'is_auto_increment' => 0,
        'default_value'     => '',
    },
    publish_date => {
        'data_type'         => 'DATE',
        'size'              => undef,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'publish_date',
        'is_auto_increment' => 0,
        'default_value'     => '',
    },
    pre_order => {
        'data_type'         => 'BOOLEAN',
        'size'              => 1,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'pre_order',
        'is_auto_increment' => 0,
        'default_value'     => '',
    },
    admin_active => {
        'data_type'         => 'BOOLEAN',
        'size'              => 1,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'admin_active',
        'is_auto_increment' => 0,
        'default_value'     => '1',
    },
    admin_valid => {
        'data_type'         => 'BOOLEAN',
        'size'              => 1,
        'is_nullable'       => 0,
        'is_foreign_key'    => 0,
        'name'              => 'admin_valid',
        'is_auto_increment' => 0,
        'default_value'     => '1',
    },
    admin_valid => {
        data_type         => 'boolean',
        size              => 1,
        is_nullable       => 0,
        is_auto_increment => 0,
        default_value     => '1',
    },
);

__PACKAGE__->set_primary_key('id');

1;
