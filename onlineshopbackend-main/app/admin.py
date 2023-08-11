from django.contrib import admin
from app.models import *
# Registing all the models here

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
