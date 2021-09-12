import json

from django.http.response import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.contrib.auth import get_user_model, login, authenticate, logout
from django.contrib.auth.views import login_required
from django.middleware import csrf
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def account_session(request):
    """Get information about current user session (bound to the request)."""
    if not request.user.is_authenticated:
        return JsonResponse({'is_authenticated': False})

    data = {
        'is_authenticated': True,
        'email': request.user.email,
        'username': request.user.username,
    }

    return JsonResponse(data)


def get_csrf(request):
    """Generated random session token (cookie) for CSRF Auth protection."""
    # Set request Set-Cookie header + return token
    session_token = csrf.get_token(request)
    return JsonResponse({'detail': 'CSRF cookie set'},
                        headers={'X-CSRFToken': session_token})


@require_POST
def register(request):
    """Create new user account from the POSTed credentials."""
    # Get credentials from request body (application/json)
    if not request.body:
        return JsonResponse({'detail': 'You must provide email and password for new account.'}, status=400)

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email = body.get('email')
    password = body.get('password')
    username = body.get('username')

    # Validate email & password existance
    if email is None or password is None:
        return JsonResponse({'detail': 'You must provide email and password for new account.'}, status=400)

    # Create new user
    try:
        Account = get_user_model()
        account = Account.users.create_user(
            email=email, password=password, username=username)
        # Will run Accout model validations
        account.save()
    except Exception as e:
        return HttpResponseBadRequest(f"Invalid credentials: {e}")

    # Login/bind request (session) into newly created account
    login(request, account)

    return JsonResponse({'detail': 'Successfuly created new account'})


@require_POST
def account_login(request):
    """Log in user into specified account."""
    # Get credentials from request body (application/json)
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email = body.get('email')
    password = body.get('password')

    # Validate email & password existance
    if email is None or password is None:
        return JsonResponse({'detail': 'You must provide email and password.'}, status=400)

    # Try to authenticate
    account = authenticate(email=email, password=password)

    if account is None:
        return HttpResponseBadRequest("Invalid credentials.")

    login(request, account)
    return JsonResponse({'detail': 'Successfuly loged in'})


@login_required
@ensure_csrf_cookie
@require_POST
def account_logout(request):
    """Log out user (must be sent on POST from the website with CSRF token)."""
    # Remove user from request + flush session data
    logout(request)
    return JsonResponse({'detail': 'Successfuly loged out'})
