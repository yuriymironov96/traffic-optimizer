# Generated by Django 2.1.2 on 2018-10-28 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license_plate_number', models.CharField(max_length=8, unique=True)),
                ('model', models.CharField(max_length=256)),
                ('vendor', models.CharField(max_length=256)),
                ('max_load', models.DecimalField(decimal_places=5, default=0, max_digits=14)),
                ('fuel_consumption', models.DecimalField(decimal_places=5, default=0, max_digits=14)),
                ('fuel_capacity', models.DecimalField(decimal_places=5, default=0, max_digits=14)),
            ],
        ),
    ]
