FROM python:3.13-bookworm

WORKDIR /src

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD gunicorn --bind 0.0.0.0:8000 --workers 3 zen_site.wsgi:application