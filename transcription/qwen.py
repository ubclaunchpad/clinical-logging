import torch
import os
from transformers import Qwen2_5_VLForConditionalGeneration, AutoTokenizer, AutoProcessor

def process_image(image_path):
    # Convert relative paths to absolute paths
    abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), image_path))
    print(f"Using image path: {abs_path}")
    if not os.path.exists(abs_path):
        print(f"Warning: Image not found at {abs_path}")
        return None
    return abs_path

# Load the model in half-precision on the available device(s)
model = Qwen2_5_VLForConditionalGeneration.from_pretrained("Qwen/Qwen2.5-VL-3B-Instruct", device_map="auto")
processor = AutoProcessor.from_pretrained(
    "Qwen/Qwen2.5-VL-3B-Instruct", 
    min_pixels=200*400, 
    max_pixels=350*700,
    use_fast=True
)

image_path = process_image("../assets/kkl2.jpg")
if image_path:
    conversation = [
        {
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "url": image_path
                },
                {
                    "type": "text",
                    "text": "Transcribe the image."
                }
            ]
        }
    ]

    inputs = processor.apply_chat_template(
        conversation,
        add_generation_prompt=True,
        tokenize=True,
        return_dict=True,
        return_tensors="pt"
    ).to(model.device)

    # Inference: Generation of the output
    output_ids = model.generate(**inputs, max_new_tokens=2048)
    generated_ids = [output_ids[len(input_ids):] for input_ids, output_ids in zip(inputs.input_ids, output_ids)]
    output_text = processor.batch_decode(generated_ids, skip_special_tokens=True, clean_up_tokenization_spaces=True)
    print(output_text)