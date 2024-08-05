# products/admin.py
from django.contrib import admin
from .models import Company, Product

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # Fields to display in the list view
    search_fields = ('name',)      # Add a search box to search by company name

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'company', 'category')  # Fields to display in the list view
    list_filter = ('company', 'category')  # Filters to narrow down the list of products
    search_fields = ('name', 'company__name', 'category')  # Add a search box for products
