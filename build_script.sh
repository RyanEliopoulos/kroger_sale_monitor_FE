git pull
cd ./src
grep -rl localhost . | xargs sed -i 's%http://localhost:[0-9]*/%/api/sale_monitor/%'
npm install
npm run build
