from pathlib import Path
import sys
import os
from django.core.management.utils import get_random_secret_key

BASE_DIR = Path(__file__).resolve().parent.parent
APPS_DIR = BASE_DIR / 'apps'
sys.path.append(str(APPS_DIR))


# get profile (production or development)
profile = os.getenv('PROFILE')
if not profile or (profile != 'dev' and profile != 'prod'):
    print(f"Invalid profile set: {profile}\nDefaulting to dev")
    profile = 'dev'
print(f"Profile set: {profile}")

if profile == 'prod':
    DEBUG = False
    SECRET_KEY = get_random_secret_key()
else:
    DEBUG = True
    SECRET_KEY = "dev_secret_key_unsecure"

ALLOWED_HOSTS = [
    "https://shad-ai.gravic.com",
    "http://shad-ai.gravic.com",
    "http://10.0.1.69",
    "django-prod",
]

# Application definition

DEFAULT_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

LOCAL_APPS = [
    'apps.authx',
    'apps.api',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'corsheaders',
    # 'django_extensions',
]

INSTALLED_APPS = DEFAULT_APPS + LOCAL_APPS + THIRD_PARTY_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'America/New_York'
USE_I18N = True
USE_TZ = True



# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#csrf setup
CSRF_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_HTTPONLY = False
SESSION_COOKIE_HTTPONLY = True
CSRF_TRUSTED_ORIGINS = [
    "https://shad-ai.gravic.com",
    "http://shad-ai.gravic.com",
    "http://10.0.1.69",
    # react
    "http://react-prod:5173",
    "http://react-dev:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://0.0.0.0:5173",
    # nginx
    "http://nginx",
    "http://localhost",
    "http://127.0.0.1",
    "http://0.0.0.0",
]

#cors setup
# CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "https://shad-ai.gravic.com",
    "http://shad-ai.gravic.com",
    "http://10.0.1.69",
    "http://127.0.0.1:5173",
    "http://0.0.0.0:5173",
    "http://localhost",
    "http://127.0.0.1",
    "http://0.0.0.0",
]
CORS_ALLOW_METHODS = (
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
)
CORS_ALLOW_HEADERS = (
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
)

# static files
STATIC_ROOT = BASE_DIR / "static"
STATIC_URL = 'static/'

# media files
MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = 'media/'
