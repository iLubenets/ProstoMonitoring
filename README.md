Prosto Monitoring
==========

System for collecting timestamped events and deriving metrics.

node bin/listener.js 2>&1 >> listener.log &

ps aux | grep -e 'bin/listener' | grep -v grep | awk '{print $2}' | xargs -i kill -SIGINT {}