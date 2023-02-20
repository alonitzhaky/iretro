# Generated by Django 4.1.5 on 2023-02-20 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0010_alter_customuser_age_alter_orderdetail_order_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.PositiveSmallIntegerField(
                choices=[
                    (1, "Smart Watches and Apple Chips"),
                    (2, "iPhone Kits"),
                    (3, "Game Consoles"),
                ]
            ),
        ),
    ]