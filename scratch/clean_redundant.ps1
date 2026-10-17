$paths = @(
    "Borrow\.git",
    "old\.git",
    "Borrow\CIDC",
    "Borrow\Clubs",
    "Borrow\Student-details",
    "Borrow\Faculty directory",
    "Borrow\Feed",
    "Borrow\homepage",
    "Borrow\alumini directory",
    "Borrow\shared",
    "Borrow\legacy-campustask",
    "Borrow\__MACOSX",
    "Borrow\.DS_Store",
    "Borrow\node_modules",
    "Complain\Complain",
    "Complain\node_modules",
    "Student-details\Campus-sync"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        Write-Output "Removing $p..."
        Remove-Item -Path $p -Recurse -Force -ErrorAction SilentlyContinue
    }
}
Write-Output "All redundant nested directories cleaned."
