rm -f ../data/raw/tpe/* ../data/raw/ntp/*
wget -i download_tpe.txt -P ../data/raw/tpe/
wget -i download_ntp.txt -P ../data/raw/ntp/
gzip -d ../data/raw/tpe/*.gz
gzip -d ../data/raw/ntp/*.gz
for f in ../data/raw/tpe/*; do mv -- "$f" "$f.json"; done
for f in ../data/raw/ntp/*; do mv -- "$f" "$f.json"; done