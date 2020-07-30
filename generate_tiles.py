from PIL import Image, ImageDraw, ImageFont, ImageFilter
import textwrap
import os
import warnings

# taken from https://gist.github.com/sigilioso/2957026
def resize_and_crop(img_path, modified_path, size, crop_type='middle'):
    """
    Resize and crop an image to fit the specified size.

    args:
    img_path: path for the image to resize.
    modified_path: path to store the modified image.
    size: `(width, height)` tuple.
    crop_type: can be 'top', 'middle' or 'bottom', depending on this
    value, the image will cropped getting the 'top/left', 'middle' or
    'bottom/right' of the image to fit the size.
    raises:
    Exception: if can not open the file in img_path of there is problems
    to save the image.
    ValueError: if an invalid `crop_type` is provided.
    """
    # If height is higher we resize vertically, if not we resize horizontally
    img = Image.open(img_path)
    # Get current and desired ratio for the images
    img_ratio = img.size[0] / float(img.size[1])
    ratio = size[0] / float(size[1])
    #The image is scaled/cropped vertically or horizontally depending on the ratio
    if ratio > img_ratio:
        img = img.resize((size[0], int(round(size[0] * img.size[1] / img.size[0]))),
            Image.ANTIALIAS)
        # Crop in the top, middle or bottom
        if crop_type == 'top':
            box = (0, 0, img.size[0], size[1])
        elif crop_type == 'middle':
            box = (0, int(round((img.size[1] - size[1]) / 2)), img.size[0],
                int(round((img.size[1] + size[1]) / 2)))
        elif crop_type == 'bottom':
            box = (0, img.size[1] - size[1], img.size[0], img.size[1])
        else :
            raise ValueError('ERROR: invalid value for crop_type')
        img = img.crop(box)
    elif ratio < img_ratio:
        img = img.resize((int(round(size[1] * img.size[0] / img.size[1])), size[1]),
            Image.ANTIALIAS)
        # Crop in the top, middle or bottom
        if crop_type == 'top':
            box = (0, 0, size[0], img.size[1])
        elif crop_type == 'middle':
            box = (int(round((img.size[0] - size[0]) / 2)), 0,
                int(round((img.size[0] + size[0]) / 2)), img.size[1])
        elif crop_type == 'bottom':
            box = (img.size[0] - size[0], 0, img.size[0], img.size[1])
        else :
            raise ValueError('ERROR: invalid value for crop_type')
        img = img.crop(box)
    else :
        img = img.resize((size[0], size[1]),
            Image.ANTIALIAS)
    # If the scale is the same, we do not need to crop
    img.save(modified_path)

def getMetadata(postPath):
    with open(postPath, 'r') as file:
        headerMet = 0
        image = None
        title = None
        for line in file:
            if line == '---':
                if headerMet == 2:
                    break
                headerMet += 1
            if line.startswith('title: '):
                title = line[len('title: '):].strip().strip('\'').strip('"').strip()
            if line.startswith('image: '):
                image = line[len('image: '):].strip().strip('\'').strip('"').strip()
        return image, title


class Candidate:
  def __init__(self, title, imagePath, tilePath, socialPath):
     self.title = title
     self.imagePath = imagePath
     self.tilePath = tilePath
     self.socialPath = socialPath

def findCandidates():
    candidates = []
    for root, dirs, files in os.walk("source/"):
        for file in files:
            if not file.endswith('.md'):
                continue
            mdPath = os.path.join(root, file)
            image, title = getMetadata(mdPath)
            if (image is None):
                continue
            imagePath = "source" + image
            if (not os.path.isfile(imagePath)):
                raise Exception("Image " + imagePath + " defined in " + mdPath + " doesn't exist!")
            if (any(c.imagePath == imagePath for c in candidates)):
                raise Exception("Image " + imagePath + " in " + mdPath + " is already defined!")
            tilePath = imagePath.replace('.jpg', '_tile.jpg')
            socialPath = imagePath.replace('.jpg', '_social.png')
            if (os.path.isfile(tilePath)):
                continue
            candidates.append(Candidate(title, imagePath, tilePath, socialPath))
    return candidates


def generateTile(candidate):
    print("Generating tile " + candidate.tilePath)
    resize_and_crop(candidate.imagePath, candidate.tilePath, (600, 300))

def generateSocial(candidate):
    print("Generating social " + candidate.socialPath + " with title: " + candidate.title)
    resize_and_crop(candidate.imagePath, candidate.socialPath, (1200, 600))
    image = Image.open(candidate.socialPath)
    socialMask = Image.open("source/images/social_mask.png")
    image.paste(socialMask, (0,0), mask=socialMask)
    width, height = image.size
    font = ImageFont.truetype('source/fonts/Lato/LatoLatin-Heavy.ttf', size=72)
    draw = ImageDraw.Draw(image)
    textWrapper = textwrap.TextWrapper(width=25)
    text = os.linesep.join(textWrapper.wrap(candidate.title))
    fontWidth, fontHeight = draw.textsize(text, font=font)
    (x, y) = ((width - fontWidth)/2, (height - fontHeight)/2)
    draw.text((x, y), text, fill='rgb(10, 10, 10)', font=font, align='center')
    image.save(candidate.socialPath)

candidates = findCandidates()

for c in candidates:
    generateTile(c)
    generateSocial(c)