FROM python:3.10

ENV PYTHONUNBUFFERED 1

RUN git clone https://github.com/alonitzhaky/iretro-store.git

WORKDIR /iretro-store/backend

RUN pip install virtualenv

RUN virtualenv env

RUN . env/bin/activate

RUN pip install --no-cache-dir -r requirements.txt

ENV DJANGO_SETTINGS_MODULE=project.settings

RUN python manage.py makemigrations

RUN python manage.py migrate

EXPOSE 8000

CMD ["python", "manage.py", "runserver"]