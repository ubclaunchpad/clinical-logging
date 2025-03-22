import cv2
import matplotlib.pyplot as plt

# Load the image
image_path = "../assets/transcription-images/kkl1.png"
image = cv2.imread(image_path)

# Resize image to fixed resolution (600x960)
new_width, new_height = 600, 960
image = cv2.resize(image, (new_width, new_height))

# Define regions manually based on new resolution
regions = {
    "surgical_plan": (0, 0, int(new_width * 0.88), int(new_height * 0.33)),  # Top 20%
    "flags": (int(new_width * 0.88), 0, new_width, int(new_height * 0.33)),  # Next 25%
    "operative_notes": (0, int(new_height * 0.33), new_width, int(new_height * 0.63)),  # Next 25%
    "learning_points": (0, int(new_height * 0.63), new_width, new_height)  # Bottom 30%
}

# Process and save cropped regions
cropped_regions = []
for name, (x, y, w, h) in regions.items():
    cropped = image[y:h, x:w]
    output_path = f"../assets/transcription-images/{image_path.split('/')[-1]}_{name}.png"
    cv2.imwrite(output_path, cropped)
    cropped_regions.append((name, cropped, output_path))
    print(f"Saved: {output_path}")

# Display the cropped images
fig, axes = plt.subplots(1, 4, figsize=(15, 5))
for ax, (name, region, _) in zip(axes, cropped_regions):
    ax.imshow(cv2.cvtColor(region, cv2.COLOR_BGR2RGB))
    ax.set_title(name)
    ax.axis("off")
plt.show()
