FROM python:3.9-alpine

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Installing psycopg2 and Pillow (dependencies + building)
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev postgresql postgresql-dev \
    && pip install psycopg2 \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install Pillow \
    && apk del build-deps

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN adduser -D heroku
RUN chown heroku /app
USER heroku

RUN python manage.py collectstatic --no-input
RUN python manage.py migrate

CMD gunicorn converic.wsgi:application --bind 0.0.0.0:$PORT