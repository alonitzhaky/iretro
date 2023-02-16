FROM python:3.10

# ENV PYTHONUNBUFFERED 1

# RUN git clone https://github.com/alonitzhaky/iretro-store.git

# WORKDIR /iretro-store/backend

# RUN pip install virtualenv

# RUN virtualenv env

# RUN . env/bin/activate

# RUN pip install --no-cache-dir -r requirements.txt

# RUN pip install python-decouple

# ENV DJANGO_SETTINGS_MODULE=project.settings

# COPY .env /app/

# RUN python manage.py makemigrations

# RUN python manage.py migrate

# EXPOSE 8000

FROM python:3.10

ENV PYTHONUNBUFFERED 1

RUN git clone https://github.com/alonitzhaky/iretro-store.git

WORKDIR /iretro-store/backend

RUN pip install virtualenv

RUN virtualenv env

RUN . env/bin/activate

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install python-decouple

ENV DJANGO_SETTINGS_MODULE=project.settings

COPY .env /iretro-store/backend/project/

RUN python -m decouple.config /iretro-store/backend/project/.env python manage.py runserver 0.0.0.0:8000

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]