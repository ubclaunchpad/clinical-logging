def trocr():
    from transformers import TrOCRProcessor, VisionEncoderDecoderModel
    from PIL import Image
    import requests

    # load image from the IAM database
    #open from kkl.jpg in assets folder instead
    url = '../assets/kkl.jpg'
    image = Image.open(url).convert("RGB")

    processor = TrOCRProcessor.from_pretrained('microsoft/trocr-base-handwritten')
    model = VisionEncoderDecoderModel.from_pretrained('microsoft/trocr-base-handwritten')
    pixel_values = processor(images=image, return_tensors="pt").pixel_values

    generated_ids = model.generate(pixel_values)
    generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

    print(generated_text)


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

    url = "../assets/kkl.jpg"
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

    # bounding_box_annotator = sv.BoundingBoxAnnotator(color_lookup=sv.ColorLookup.INDEX)
    # label_annotator = sv.LabelAnnotator(color_lookup=sv.ColorLookup.INDEX)

    # detections = sv.Detections.from_lmm(sv.LMM.FLORENCE_2, parsed_answer, resolution_wh=image.size)
    # annotated = bounding_box_annotator.annotate(image, detections=detections)
    # annotated = label_annotator.annotate(annotated, detections=detections)
    # sv.plot_image(annotated)

florence()