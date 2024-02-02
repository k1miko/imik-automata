import joblib
import cv2
import numpy as np
import glob
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Load the trained model
model = joblib.load("model/baybayin_model")

# Folder containing test images
test_images_folder = "test_images/"

# Loop through test images
for img_path in glob.glob(test_images_folder + "*.jpg"):
    # Read the image
    im = cv2.imread(img_path)
    im_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    im_gray = cv2.GaussianBlur(im_gray, (11, 11), 0)

    # Threshold the image
    _, im_th = cv2.threshold(im_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
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
    print(f"Image: {img_path}, Prediction: {predicted_label}")
