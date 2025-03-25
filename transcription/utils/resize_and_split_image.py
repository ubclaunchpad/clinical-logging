import cv2
import matplotlib.pyplot as plt

def plot_cropped_images(cropped_regions):
    # Display the cropped images
    fig, axes = plt.subplots(1, len(cropped_regions), figsize=(20, 5))
    if len(cropped_regions) == 1:
        axes = [axes]
    for ax, (name, region, _) in zip(axes, cropped_regions):
        ax.imshow(cv2.cvtColor(region, cv2.COLOR_BGR2RGB))
        ax.set_title(name)
        ax.axis("off")
    plt.show()

def structure_image(image, regions):
    # Process and save cropped regions
    cropped_regions = []
    for name, (x, y, w, h) in regions.items():
        cropped = image[y:h, x:w]
        output_path = f"../assets/transcription-images/{name}.png"
        cv2.imwrite(output_path, cropped)
        cropped_regions.append((name, cropped, output_path))
        print(f"Saved: {output_path}")
    return cropped_regions


# Load the image
image_paths = ["../../assets/kkl2.jpg", "../../assets/kkl3.jpg"]
new_width, new_height = 600, 960
# Define regions manually based on new resolution
regions = [{
            "surgical_plan": (0, 0, int(new_width * 0.88), int(new_height * 0.3)),
            "flags": (int(new_width * 0.88), 0, new_width, int(new_height * 0.33)),
            "operative_notes": (0, int(new_height * 0.3), new_width, int(new_height * 0.55)),
            "post_op_notes": (0, int(new_height * 0.55), new_width, int(new_height * 0.75)),
            "learning_points": (0, int(new_height * 0.75), new_width, int(new_height * 0.95))
},
{
    "basics": (0, 0, new_width, int(new_height * 0.171)),
    "case_details": (0, int(new_height * 0.171), new_width, int(new_height * 0.22)),
    "hpi": (0, int(new_height * 0.22), int(new_width*0.5), int(new_height * 0.30)),
    "social": (int(new_width*0.5), int(new_height * 0.22), new_width, int(new_height * 0.30)),
    "PMHx": (0, int(new_height * 0.30), int(new_width*0.2), int(new_height * 0.45)),
    "medications": (int(new_width*0.2), int(new_height * 0.30), int(new_width*0.7), int(new_height * 0.45)),
    "allergies": (int(new_width*0.7), int(new_height * 0.30), new_width, int(new_height * 0.45)),
    "exam": (0, int(new_height * 0.45), int(new_width*0.385), int(new_height * 0.54)),
    "veins": (int(new_width*0.385), int(new_height * 0.45), int(new_width*0.55), int(new_height * 0.66)),
    "allen_test": (int(new_width*0.55), int(new_height * 0.45), int(new_width*0.69), int(new_height * 0.66)),
    "INVx": (0, int(new_height * 0.54), int(new_width * 0.4), int(new_height * 0.70)),
    "CXR/CT": (int(new_width * 0.65), int(new_height * 0.612), new_width, int(new_height * 0.762)),
}]

for i in range(len(image_paths)):
    image = cv2.imread(image_paths[i])
    image = cv2.resize(image, (new_width, new_height))
    cropped_regions = structure_image(image, regions[i])
    plot_cropped_images(cropped_regions)

