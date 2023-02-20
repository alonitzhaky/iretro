FROM python:3.10

ENV PYTHONUNBUFFERED 1

# RUN git clone https://github.com/alonitzhaky/iretro-store.git

WORKDIR /iretro-store/backend

COPY . .

RUN pip install virtualenv

RUN virtualenv env

RUN . env/bin/activate

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install python-decouple

ENV DJANGO_SETTINGS_MODULE=project.settings

ENV SECRET_KEY "django-insecure-@)^nelgw@q3@2+c$fvoh&ncwe#9hy#l1uj3d1d+uez&fgsg62j"

ENV DATABASE_URL "postgres://iretro_database_d4da_user:mr5cG2uSo5GTcuCElZgyKfe493Jukm8g@dpg-cfpphdqrrk0fd9vp4nj0-a.frankfurt-postgres.render.com/iretro_database_d4da"

RUN python manage.py makemigrations

RUN python manage.py migrate

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]