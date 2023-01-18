# Generated by Django 4.1.5 on 2023-01-18 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0003_alter_customuser_birth_date_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="address",
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name="customuser",
            name="phone_number",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
