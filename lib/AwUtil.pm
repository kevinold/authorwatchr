package AwUtil;

sub normalize {
    my $name = shift;

    #convert lowercase
    $name = lc $name;

    #replace non-alpha, non-numeric with underscore
    $name =~ s/[^a-z0-9]/_/g;

    #remove multiple underscores
    $name =~ s/_{2,}/_/g;

    return $name;
}

sub urlify_author {
    my $name = shift;

    #convert lowercase
    $name = lc $name;

    #replace non-alpha, non-numeric with pluses
    $name =~ s/[^a-z0-9]/+/g;

    #remove multiple pluses
    $name =~ s/\+{2,}/+/g;

    return $name;
}

1;
