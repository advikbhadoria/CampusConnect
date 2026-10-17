Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = 'C:\$Recycle.Bin\S-1-5-21-2871755539-1092005615-2816516554-1001\$RU6THZ6.zip'
$archive = [System.IO.Compression.ZipFile]::OpenRead($zip)

$destRoot = 'c:\Users\Advik\OneDrive\Desktop\CIDC\Complain'
foreach ($entry in $archive.Entries) {
    if ($entry.FullName.StartsWith('Complain/src/') -or $entry.FullName.StartsWith('Complain/public/') -or $entry.FullName.StartsWith('Complain/scripts/') -or $entry.FullName -eq 'Complain/package.json' -or $entry.FullName -eq 'Complain/vite.config.js') {
        $relPath = $entry.FullName.Substring(9)
        if ($relPath -ne '') {
            $targetPath = Join-Path $destRoot $relPath
            if ($entry.FullName.EndsWith('/')) {
                New-Item -ItemType Directory -Force -Path $targetPath | Out-Null
            } else {
                $parent = Split-Path $targetPath -Parent
                if (-not (Test-Path $parent)) {
                    New-Item -ItemType Directory -Force -Path $parent | Out-Null
                }
                [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $targetPath, $true)
            }
        }
    }
}
$archive.Dispose()
Write-Output "FAST EXTRACT COMPLETED"
