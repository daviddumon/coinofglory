#!/bin/sh
curl -X POST -H "Content-Type: application/json" -d '{"posData":"'$1'", "status":"confirmed"}' https://riotous-refuge-9554.herokuapp.com/bitpay-notifications?v=16acdb1f-23ad-41fc-9930-8b3dd41ba4e9cc504ed3-cb1c-4080-b666-8367b283b480

