import cv2
from skimage.metrics import structural_similarity
import sys
import base64
import numpy as np
import urllib.request
from PIL import Image
import requests
from io import BytesIO
import os
import cv2
import urllib.request
import numpy as np
    # Load images
image1= sys.argv[1]
image2= sys.argv[2]
req = urllib.request.urlopen(image1)
arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
img = cv2.imdecode(arr, -1)

req = urllib.request.urlopen(image2)
arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
img2 = cv2.imdecode(arr, -1)
 
# image1_path="http://localhost:5000/therapistM.png"
# image2_path="http://localhost:5000/therapistM.png"
#  image1_path=image1_path.replace('http://localhost:5000/','upload/patientM.png')
#  image2_path=image2_path.replace('http://localhost:5000/','C:/Users/touns/Desktop/sahtek/Sahtek/server/upload/patientM.png')

 
#  image1 = cv2.imread(image1_path)
#  image2 = cv2.imread(image2_path)
img = cv2.resize(img,(500,500))
img2 = cv2.resize(img2,(500,500))

gray1 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
# image1 = cv2.resize(image1, (image2.shape[1], image2.shape[0]))
# gray_img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
# gray_img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

ssim_score =structural_similarity(gray1,gray2)
 

print(ssim_score)
 
    # image1 = cv2.imread(image1)
    # image2 = cv2.imread(image2)
    # image2 = cv2.resize(image2,(500,500))
    # image1_gray = cv2.cvtColor(image1, cv2.COLOR_GRAY2RGB)
    # image2_gray = cv2.cvtColor(image2, cv2.COLOR_GRAY2RGB)
    
    


# score= compare_images(image1,image2)
