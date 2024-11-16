from flask import Flask
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort


app = Flask(__name__)
api = Api(app)

def florence():
    import requests
    import torch
    from PIL import Image
    from transformers import AutoProcessor, AutoModelForCausalLM
    import supervision as sv 

    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model = AutoModelForCausalLM.from_pretrained("microsoft/Florence-2-large", torch_dtype=torch_dtype, trust_remote_code=True).to(device)
    processor = AutoProcessor.from_pretrained("microsoft/Florence-2-large", trust_remote_code=True)

    prompt = "<OCR>"

    url = "../assets/logos/20230806 FlowLeaflets Logo Grey-03.png"
    image = Image.open(url).convert("RGB")

    inputs = processor(text=prompt, images=image, return_tensors="pt").to(device, torch_dtype)

    generated_ids = model.generate(
        input_ids=inputs["input_ids"],
        pixel_values=inputs["pixel_values"],
        max_new_tokens=1024,
        num_beams=3,
        do_sample=False
    )
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=False)[0]

    parsed_answer = processor.post_process_generation(generated_text, task="<OCR>", image_size=(image.width, image.height))

    print(parsed_answer)

    return parsed_answer

    # bounding_box_annotator = sv.BoundingBoxAnnotator(color_lookup=sv.ColorLookup.INDEX)
    # label_annotator = sv.LabelAnnotator(color_lookup=sv.ColorLookup.INDEX)

    # detections = sv.Detections.from_lmm(sv.LMM.FLORENCE_2, parsed_answer, resolution_wh=image.size)
    # annotated = bounding_box_annotator.annotate(image, detections=detections)
    # annotated = label_annotator.annotate(annotated, detections=detections)
    # sv.plot_image(annotated)

@app.route('/')
def ocr_img():
    florence()
    return florence()

if __name__ == '__main__':
    app.run(debug=True, port=5000)