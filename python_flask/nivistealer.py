from colorama import Fore, Back, Style
from flask import Flask, render_template, url_for, request, jsonify,Response
import time
import os
if(os.path.exists('audio')):
       print("present")
else:
     os.mkdir('audio')       

PATH_TO_AUDIO_DIR = 'audio'
app = Flask(__name__)
import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route('/')
def index():
   return Response(open('index.html').read(), mimetype="text/html")

@app.route('/audio', methods=['POST'])
def audio():

    i = request.files['audio_data']  # get the audio
    f = ('%s.wav' % time.strftime("%Y%m%d-%H%M%S"))
    i.save('%s/%s' % (PATH_TO_AUDIO_DIR, f))
    print(Fore.YELLOW + "Audio Saved Successfully")

    return Response("%s saved" % f)
    
if __name__ == "__main__":
  app.run(debug=False,host='0.0.0.0')
