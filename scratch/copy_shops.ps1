$source = 'c:\Users\Advik\OneDrive\Desktop\CIDC\Shops\shop system'
$dest = 'c:\Users\Advik\OneDrive\Desktop\CIDC\Shops'

Get-ChildItem -Path $source | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force
}
Write-Output "Shops copied to top-level successfully"
