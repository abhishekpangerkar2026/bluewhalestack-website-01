# Scope of Work — source & regeneration

The Scope of Work PDF is generated from `sow.html` (a single, self-contained,
branded HTML document — edit it to change the SOW).

**Output:** `../BlueWhale-Stack-Website-Scope-of-Work.pdf`

## Regenerate the PDF

From `docs/` (Git Bash), using headless Chrome:

```bash
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
OUT='D:/BlueWhale Stack/BlueWhale Stack Website/docs/BlueWhale-Stack-Website-Scope-of-Work.pdf'
IN='D:/BlueWhale Stack/BlueWhale Stack Website/docs/sow/sow.html'
"$CHROME" --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --user-data-dir="$TEMP/chrome-pdf-profile" \
  --print-to-pdf="$OUT" "$IN"
```

Notes:
- Use **absolute** output/input paths — Chrome resolves a relative `--print-to-pdf`
  against its own working directory (Program Files), which fails with "access denied".
- Microsoft Edge works identically: swap the `CHROME` path to
  `/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`.
- The HTML uses print CSS (`@page`, page-break rules, a fixed running footer) and
  system fonts, so it renders without any network access.
