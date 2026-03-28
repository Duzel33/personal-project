from zen_tasks.models import Categories


# ----- CREATE CATEGORIES -----

lawncare = Categories(
    title='Lawncare'
)
lawncare.save()

pressureWash = Categories(
    title='Pressure Wash'
)
pressureWash.save()
