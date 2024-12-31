from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

# Create your models here.


class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(_("First Name"), max_length=100)
    last_name = models.CharField(_("Last Name"), max_length=100)
    email = models.EmailField(_("Email Address"), max_length=254, unique=True)
    user_location = models.CharField(max_length=255, blank=True, null=True, default="myCity") 
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_joined =  models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class CustomUser(AbstractUser):
#     email = models.EmailField(unique=True)
#     user_location = models.CharField(max_length=255, blank=True, null=True, default="myCity") 

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     def __str__(self):
#         return self.email

