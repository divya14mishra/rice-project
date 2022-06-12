"""
SEM Controller API Flask App
"""
from flask import Flask
from flask import request
# from flask import send_directory
# from flask import os
import PyPhenom as ppi

app = Flask(__name__)

def load_sem_internal():
    sem = ppi.Phenom('Simulator', '', '')
    sem.Activate()
    sem.Load()
    return sem

# global variable to be used in all functions, SEM is preloaded
sem = load_sem_internal()

@app.route('/')
def start():
    print('Welcome to the SEM Controller API!')
    return 'Welcome to the SEM Controller API!'

@app.route('/get_instrument_mode', methods=['GET'])
def get_instrument_mode():
    sem = ppi.Phenom('Simulator', '', '')
    instrument_mode = sem.GetInstrumentMode()
    print(str(instrument_mode))
    return str(instrument_mode)

@app.route('/get_operational_mode', methods=['GET'])
def get_operational_mode():
    operational_mode = sem.GetOperationalMode()
    return str(operational_mode)

@app.route('/get_sem_spot_size', methods=['GET'])
def get_sem_spot_size():
    sem_spot_size = sem.GetSemSpotSize()
    return str(sem_spot_size)

@app.route('/set_sem_spot_size', methods=['POST'])
def set_sem_spot_size():
    global sem
    content = request.json
    sem.SetSemSpotSize(content['value'])
    sem_spot_size = sem.GetSemSpotSize()
    if (sem_spot_size == content['value']):
        return "Success"
    return "Failure"

@app.route('/get_sem_brightness', methods=['GET'])
def get_sem_brightness():
    sem_brightness = sem.GetSemBrightness()
    return str(sem_brightness)

@app.route('/set_sem_brightness', methods=['POST'])
def set_sem_brightness():
    global sem
    content = request.json
    sem.SetSemBrightness(content['value'])
    sem_brightness = sem.GetSemBrightness()
    if (sem_brightness == content['value']):
        return "Success"
    return "Failure"

@app.route('/get_sem_contrast', methods=['GET'])
def get_sem_contrast():
    sem_contrast = sem.GetSemContrast()
    return str(sem_contrast)

@app.route('/set_sem_contrast', methods=['POST'])
def set_sem_contrast():
    global sem
    content = request.json
    sem.SetSemContrast(content['value'])
    sem_contrast = sem.GetSemContrast()
    if (sem_contrast == content['value']):
        return "Success"
    return "Failure"

@app.route('/get_sem_rotation', methods=['GET'])
def get_sem_rotation():
    sem_rotation = sem.GetSemRotation()
    return str(sem_rotation)

@app.route('/set_sem_rotation', methods=['POST'])
def set_sem_rotation():
    global sem
    content = request.json
    sem.SetSemRotation(content['value'])
    sem_rotation = sem.GetSemRotation()
    if (sem_rotation == content['value']):
        return "Success"
    return "Failure"

@app.route('/sem_auto_contrast_brightness', methods=['POST'])
def sem_auto_contrast_brightness():
    global sem
    sem.SemAutoContrastBrightness()
    return "Success"

@app.route('/sem_auto_focus', methods=['POST'])
def sem_auto_focus():
    global sem
    sem.SemAutoFocus()
    return "Success"

@app.route('/sem_move_sample', methods=['POST'])
def sem_move_sample():
    global sem
    content = request.json
    sem.MoveTo(content['x'], content['y'])
    return "Success"

# @app.route('/sem_acquire_image', methods=['GET'])
# def sem_acquire_image():
#     filename = 'NavCam.tiff'
#     acqCamParams = ppi.CamParams()
#     acqNavCam = sem.NavCamAcquireImage(acqCamParams)
#     ppi.Save(acqNavCam, filename)
#     return send_from_directory(os.getcwd() + filename, filename=filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')