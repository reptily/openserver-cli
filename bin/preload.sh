#!/bin/bash

# костыль, каюсь!, но используется старая версия JSONStream с косиком
FILE_JSONStrea_INDEX=node_modules/docker-modem/node_modules/JSONStream/index.js
sed '/\#\! \/usr\/bin\/env node/d' $FILE_JSONStrea_INDEX > tmp/json_stream_index.js
cp tmp/json_stream_index.js $FILE_JSONStrea_INDEX
rm tmp/json_stream_index.js
