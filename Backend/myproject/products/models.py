from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=100)
    company = models.ForeignKey(Company, related_name='products', on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
