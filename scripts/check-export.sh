printf '%s\n' 'HTML src/href:'
grep -rhoE '(src|href)="/[^"]*"' out --include=*.html | sort -u
printf '%s\n' 'Abweichungen src/href:'
grep -rhoE '(src|href)="/[^"]*"' out --include=*.html | sort -u | grep -v '="/demo/levelone/'
printf '%s\n' 'CSS url() in HTML/CSS:'
grep -rhoE 'url\([^)]*\)' out --include=*.html --include=*.css | sort -u
printf '%s\n' 'Absolute CSS-Pfade:'
grep -rhoE 'url\(["\x27]?/[^)]*\)' out --include=*.html --include=*.css | sort -u
printf '%s\n' 'Verbotene Exportdateien:'
find out \( -name sitemap.xml -o -name robots.txt -o -name .htaccess -o -name BUILD_ID -o -name cache -o -name dist \) -print
printf '%s\n' 'out/index.html:'
test -f out/index.html && echo vorhanden
