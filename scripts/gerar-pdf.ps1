# Regenera public/curriculo.pdf a partir de curriculo-print.html
$root = Split-Path -Parent $PSScriptRoot
$html = Join-Path $root "curriculo-print.html"
$pdf = Join-Path $root "public\curriculo.pdf"
$edge = @(
  "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $edge) {
  Write-Error "Microsoft Edge não encontrado."
  exit 1
}

$uri = [uri]::new($html).AbsoluteUri
& $edge --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="$pdf" $uri
Start-Sleep -Seconds 2

if (Test-Path $pdf) {
  Write-Host "PDF gerado: $pdf"
} else {
  Write-Error "Falha ao gerar PDF."
  exit 1
}
