import yaml, os
from jinja2 import Environment, FileSystemLoader

with open('products.yaml') as f:
    products = yaml.safe_load(f)['products']

env = Environment(loader=FileSystemLoader('.'))

index_html = env.from_string('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fashion Catalogue</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css">
    <meta name="description" content="Mobile-first fashion catalogue. Fast, SEO-optimized, zero-cost.">
</head>
<body class="bg-gray-50 min-h-screen p-4">
    <header class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Fashion Catalogue</h1>
        <p class="text-gray-600 mt-2">Curated for every season</p>
    </header>
    <main class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {% for p in products %}
        <a href="/product/{{ p.sku }}.html" class="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <img src="{{ p.image_url }}" alt="{{ p.title }}" loading="lazy" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="p-4">
                <h2 class="font-semibold text-lg text-gray-800">{{ p.title }}</h2>
                <p class="text-green-600 font-bold text-xl mt-1">${{ p.price }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ p.colours|join(', ') }}</p>
            </div>
        </a>
        {% endfor %}
    </main>
</body>
</html>
''')

detail_html = env.from_string('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ p.title }} - ${{ p.price }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="../style.css">
    <meta name="description" content="{{ p.title }} in {{ p.sizes|join(', ') }}. {{ p.season }} collection.">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "{{ p.title }}",
      "sku": "{{ p.sku }}",
      "image": "{{ p.image_url }}",
      "description": "{{ p.title }} - {{ p.season }} season garment.",
      "offers": {
        "@type": "Offer",
        "price": "{{ p.price }}",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "brand": {"@type": "Brand", "name": "RISN Fashion"},
      "color": "{{ p.colours[0] }}",
      "size": "{{ p.sizes|join(', ') }}"
    }
    </script>
</head>
<body class="bg-gray-50 min-h-screen p-4">
    <a href="/" class="inline-block mb-6 text-blue-600 hover:underline text-sm">&larr; Back</a>
    <article class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src="{{ p.image_url }}" alt="{{ p.title }}" loading="lazy" class="w-full h-80 object-cover">
        <div class="p-6 md:p-8">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ p.title }}</h1>
            <p class="text-3xl font-bold text-green-600 mt-3">${{ p.price }}</p>
            <div class="mt-4 space-y-3 text-gray-700">
                <p><strong>Season:</strong> {{ p.season }}</p>
                <p><strong>Sizes:</strong> {{ p.sizes|join(', ') }}</p>
                <p><strong>Colours:</strong> {{ p.colours|join(', ') }}</p>
                <p class="text-sm text-gray-500"><strong>SKU:</strong> {{ p.sku }}</p>
            </div>
        </div>
    </article>
</body>
</html>
''')

# Write minimal Tailwind overrides
with open('style.css', 'w') as f:
    f.write('''
@tailwind base;
@tailwind components;
@tailwind utilities;
img { @apply transition-transform duration-300; }
''')

# Generate files
with open('index.html', 'w') as f:
    f.write(index_html.render(products=products))

os.makedirs('product', exist_ok=True)
for p in products:
    with open(f'product/{p["sku"]}.html', 'w') as f:
        f.write(detail_html.render(p=p))

print("Build complete! Site ready in ~/fashion_site")
