Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead('C:\$Recycle.Bin\S-1-5-21-2871755539-1092005615-2816516554-1001\$R3HE0XQ.zip')
$srcEntries = $archive.Entries | Where-Object { $_.FullName -like "*src*" }
Write-Output "Found src entries: $($srcEntries.Count)"
$srcEntries | Select-Object -First 30 FullName | ForEach-Object { Write-Output $_.FullName }
$archive.Dispose()
