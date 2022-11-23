## Kroger Sale Monitor
A price monitoring system for Kroger-affiliated grocery stores that alerts users when targeted products meet price thresholds.
Don't miss out on steak and seafood sales ever again! 
<br>

Backend: https://github.com/RyanEliopoulos/kroger_sale_monitor_be
<br>
Instance: https://ryanpaulos.dev/apps/sale_monitor
<br>

## Deployment
Current configuration assumes the project will be hosted in a subdirectory at /apps/sale_monitor and the API endpoints
are available at /api/sale_monitor.  <br>

package.json must be manually updated to include "homepage": "/apps/sale_monitor" <br>
build_script.sh handles the other config changes assuming conversion from a dev environment using localhost.

