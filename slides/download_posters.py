import urllib.request
import json
import os
import re

output_dir = "assets"
os.makedirs(output_dir, exist_ok=True)

def scrape_wiki_image(url, filename):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode()
            # Find the infobox image
            match = re.search(r'<table class="infobox[^>]*>.*?<img.*?src="//(upload\.wikimedia\.org/wikipedia/en/[^"]+)"', html, re.DOTALL)
            if match:
                img_url = "https://" + match.group(1).replace('thumb/', '').split('/220px')[0].split('/250px')[0].split('/270px')[0]
                # cleanup thumb URL
                img_url = re.sub(r'/\d+px-[^/]+$', '', img_url)
                print(f"Downloading {filename} from {img_url}")
                img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(img_req) as img_resp, open(os.path.join(output_dir, filename), 'wb') as out:
                    out.write(img_resp.read())
            else:
                print(f"No image found in {url}")
    except Exception as e:
        print(f"Failed wiki scrape: {e}")

scrape_wiki_image("https://en.wikipedia.org/wiki/La_La_Land", "La_La_Land.jpg")
scrape_wiki_image("https://en.wikipedia.org/wiki/Interstellar_(film)", "Interstellar.jpg")
scrape_wiki_image("https://en.wikipedia.org/wiki/Spider-Man:_Into_the_Spider-Verse", "Spider-Man.jpg")
scrape_wiki_image("https://en.wikipedia.org/wiki/The_Dark_Knight", "The_Dark_Knight.jpg")
