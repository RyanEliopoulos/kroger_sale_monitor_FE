git pull                                                                                                                                                                                                                                2 cd ./src                                                                                                                                                                                                                        2 grep -rl localhost . | xargs sed -i 's%http://localhost:[0-9]*/%/api/sale_monitor/%'
cd ./src
grep -rl localhost . | xargs sed -i 's%http://localhost:[0-9]*/%/api/sale_monitor/%'
npm install
npm run build
