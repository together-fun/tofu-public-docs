param(
  # 强制重新安装依赖：.\start-local.ps1 -Install
  [switch]$Install
)

$ErrorActionPreference = "Continue"

function Write-Step {
  param([string]$Message)
  Write-Host "[TOFU Docs] $Message" -ForegroundColor Cyan
}

function Write-Err {
  param([string]$Message)
  Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# --- 0. Always run from the script's own directory ---
Set-Location $PSScriptRoot

# --- 1. Node.js version check ---
Write-Step "Checking Node.js..."
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
  Write-Err "Node.js not installed. Download: https://nodejs.org/"
  Read-Host "Press Enter to exit"
  exit 1
}
$nodeVersionText = (node -v).Trim()
if ($nodeVersionText -match "^v(\d+)\.") {
  $major = [int]$Matches[1]
  if ($major -lt 20) {
    Write-Err "Node.js $nodeVersionText is too old (required: >= 20)"
    Read-Host "Press Enter to exit"
    exit 1
  }
} else {
  Write-Host "[WARN] Could not parse Node.js version: $nodeVersionText"
}
Write-Host "  Node.js: $nodeVersionText" -ForegroundColor Green

# --- 2. Free up port 3100 if a stale dev server is holding it ---
Write-Step "Checking port 3100..."
$portInUse = netstat -ano | Select-String ":3100\s" | Select-Object -First 1
if ($portInUse) {
  $pid3100 = ($portInUse -split "\s+")[-1]
  Write-Host "  Port 3100 in use by PID $pid3100, stopping it..." -ForegroundColor Yellow
  Stop-Process -Id $pid3100 -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 2
}

# --- 3. Ensure pnpm is available ---
Write-Step "Checking pnpm..."
$pnpmCmd = Get-Command pnpm -ErrorAction SilentlyContinue
if ($pnpmCmd) {
  Write-Host "  pnpm: $((pnpm -v 2>&1).Trim())" -ForegroundColor Green
} else {
  Write-Step "pnpm not found, enabling via Corepack..."
  corepack enable 2>&1 | Out-Null
  corepack prepare pnpm@latest --activate 2>&1 | Out-Null
  $pnpmCmd = Get-Command pnpm -ErrorAction SilentlyContinue
  if (-not $pnpmCmd) {
    Write-Err "pnpm not available. Please install: npm install -g pnpm"
    Read-Host "Press Enter to exit"
    exit 1
  }
  Write-Host "  pnpm: $((pnpm -v 2>&1).Trim()) (activated via Corepack)" -ForegroundColor Green
}

# --- 4. Install dependencies (first run only, or forced with -Install) ---
if ($Install -or -not (Test-Path (Join-Path $PSScriptRoot "node_modules"))) {
  Write-Step "Installing dependencies..."
  pnpm install
  if ($LASTEXITCODE -ne 0) {
    Write-Err "pnpm install failed (exit code $LASTEXITCODE)"
    Read-Host "Press Enter to exit"
    exit 1
  }
} else {
  Write-Step "Dependencies present - skipping pnpm install (use -Install to force)"
}

# --- 5. Start dev server ---
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "  TOFU docs dev server starting..." -ForegroundColor Green
Write-Host "  http://localhost:3100" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

pnpm dev

# --- 6. Keep window open if server exits ---
Write-Host ""
if ($LASTEXITCODE -ne 0) {
  Write-Err "Dev server exited with code $LASTEXITCODE"
} else {
  Write-Host "[TOFU Docs] Dev server stopped." -ForegroundColor Cyan
}
Read-Host "Press Enter to close this window"
