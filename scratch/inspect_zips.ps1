Add-Type -AssemblyName System.IO.Compression.FileSystem
$zips = @(
    'C:\$Recycle.Bin\S-1-5-21-2871755539-1092005615-2816516554-1001\$R3HE0XQ.zip',
    'C:\$Recycle.Bin\S-1-5-21-2871755539-1092005615-2816516554-1001\$RU6THZ6.zip'
)
foreach ($zip in $zips) {
    if (Test-Path $zip) {
        Write-Output "=== $zip ==="
        $archive = [System.IO.Compression.ZipFile]::OpenRead($zip)
        $archive.Entries | Select-Object -First 20 FullName | ForEach-Object { Write-Output $_.FullName }
        $archive.Dispose()
    }
}
