# Generated by Django 4.1.5 on 2023-02-02 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_product_quantity"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="image",
            field=models.ImageField(default="user_avatar.png", upload_to=""),
        ),
    ]
