import joblib
import cv2
import numpy as np
import glob
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Load the trained model
model = joblib.load("model/baybayinbottom_model")

def defineBottom(img_path):
    # Read the image
    im = cv2.imread(img_path)
    im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    im_gray = cv2.GaussianBlur(im_gray, (9, 9), 0)

    # Threshold the image
    _, im_th = cv2.threshold(im_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Check if the image is mostly white
    white_threshold = 0.95  # You can adjust this threshold based on your images
    non_white_pixels = cv2.countNonZero(im_th)
    total_pixels = im_th.size
    white_ratio = non_white_pixels / total_pixels

    if white_ratio > white_threshold:
        return "∈"  # Return a special value for mostly white images

    roi = cv2.resize(im_th, (28, 28), interpolation=cv2.INTER_AREA)

    rows, cols = roi.shape

    X = []

    # Fill the data array with pixels one by one.
    for i in range(rows):
        for j in range(cols):
            k = roi[i, j]
            X.append(k)

    # Make a prediction
    predictions = model.predict([X])
    predicted_label = predictions[0]

    # Display the result on the console
    return predicted_label
