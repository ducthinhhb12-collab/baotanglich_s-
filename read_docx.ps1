Add-Type -AssemblyName System.IO.Compression.FileSystem
$docx = 'C:\Users\ADMIN\.gemini\antigravity\brain\4db86d4c-ab82-48db-a50c-db49c2d1b30f\.user_uploaded\media_1793605019335_ecb08d9b.docx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($docx)
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()

[xml]$xml = $xmlText
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphs = $xml.SelectNodes("//w:p", $ns)
foreach ($p in $paragraphs) {
    $textNodes = $p.SelectNodes(".//w:t", $ns)
    $line = ""
    foreach ($t in $textNodes) {
        $line += $t.InnerText
    }
    if ($line.Trim().Length -gt 0) {
        Write-Output $line
    }
}
