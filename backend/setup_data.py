import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zen_site.settings')
django.setup()

from zen_tasks.models import Service


# ----- CREATE SERVICESS -----

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zen_site.settings')
django.setup()

from zen_tasks.models import Service


# ----- CREATE SERVICESS -----

services = [
    'Lawn Care',
    'Pressure Wash',
    'Interior Clean',
    'Interior Repair',
    'Exterior Repair'
]
 
for title in services:
    obj, created = Service.objects.get_or_create(title=title)
    if created:
        print(f"  Created: {title}")
    else:
        print(f"  Already exists (skipped): {title}")
 
print("Done.")