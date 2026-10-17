$source = 'C:\$Recycle.Bin\S-1-5-21-2871755539-1092005615-2816516554-1001\$RO12I64'
$dest = 'c:\Users\Advik\OneDrive\Desktop\CIDC\Complain'

if (Test-Path $source) {
    Copy-Item -Path "$source\*" -Destination $dest -Recurse -Force
    Write-Output "Restored from $source"
} else {
    $zip = 'C:\$Recycle.Bin\S-1-5-21-2871755539-1092005615-2816516554-1001\$R3HE0XQ.zip'
    Expand-Archive -Path $zip -DestinationPath $dest -Force
    Write-Output "Restored from zip $zip"
}
