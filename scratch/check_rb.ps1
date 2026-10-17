$shell = New-Object -ComObject Shell.Application
$bin = $shell.Namespace(0xa)
foreach ($item in $bin.Items()) {
    if ($item.Name -like "*Complain*" -or $item.Path -like "*Complain*") {
        Write-Output "Found: $($item.Name) - $($item.Path)"
    }
}
