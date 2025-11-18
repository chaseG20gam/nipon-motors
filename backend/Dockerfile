# Backend Dockerfile - Django + Gunicorn
# production-ready python env for django

# use python 3.11 slim image
FROM python:3.11-slim

# env variables to optimize python behavior

# prevents python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# frces python to output directly
ENV PYTHONUNBUFFERED=1

# set working directory
WORKDIR /app

# install system dependencies
# gcc: compiler needed for some Python packages
# postgresql-client: tools to interact with postgreSQL
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# copy requirements file first
# if requirements don't change, this layer is cached and won't reinstall
COPY shared/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# install gunicorn (production WSGI server)
RUN pip install --no-cache-dir gunicorn

# copy the entire backend code
COPY backend/ .

# create directory for uploaded images
RUN mkdir -p /app/media/car_images

# collect static files for django admin, drf, etc.
# this bundles all static files into one directory
RUN python manage.py collectstatic --noinput

# expose port 8000 (django will listen here)
EXPOSE 8000

# command to run when container starts
# --bind 0.0.0.0:8000 : listen on all network interfaces, port 8000
# --workers 3 : run 3 worker processes (handles concurrent requests)
# project.wsgi:application : points the django wsgi application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "project.wsgi:application"]
