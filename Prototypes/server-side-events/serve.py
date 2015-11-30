#!/usr/bin/env python
import datetime
import time
import flask

app = flask.Flask(__name__)
app.secret_key = 'asdf'

def event_stream():
        count = 0
        while True:
            count += 1
            yield 'data: %d\n\n' % count
            time.sleep(1)

@app.route('/stream')
def stream():
        return flask.Response(event_stream(), mimetype="text/event-stream")

@app.route('/')
def home():
        return """
        <!doctype html>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <title>blah</title>
        <pre id="out"></pre>
        <script>
            function sse() {
                var source = new EventSource('/stream');
                var out = document.getElementById('out');
                source.onmessage = function(e) {
                    out.innerHTML = e.data + '\\n' + out.innerHTML;
                };
            }

            sse();
        </script>

        """

if __name__ == '__main__':
    app.debug = True
    app.run()
