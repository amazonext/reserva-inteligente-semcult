from pydantic import BaseModel, Field


class AuthCreate(BaseModel):
    """
    Schema for user registration.

    Attributes:
        name (str): Full name of the user. Must have at least 1 character.
        email (EmailStr): Auth's email address.
        password (str): Password for the account. Minimum 6 characters.
    """

    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    password: str = Field(..., min_length=6)

from pydantic import BaseModel, Field


class AuthCreate(BaseModel):
    """
    Schema for user registration.

    Attributes:
        name (str): Full name of the user. Must have at least 1 character.
        email (EmailStr): Auth's email address.
        password (str): Password for the account. Minimum 6 characters.
    """

    name: str = Field(..., min_length=1)
    email: str = Field(..., min_length=1)
    password: str = Field(..., min_length=6)


class AuthLogin(BaseModel):
    """
    Schema for user login.

    Attributes:
        email (EmailStr): Auth's email address.
        password (str): Password for authentication. Minimum 6 characters.
    """

    email: str
    password: str = Field(..., min_length=6)


class AuthResponse(BaseModel):
    """
    Schema for user response.

    Attributes:
        id (str): Unique identifier for the user.
        name (str): Full name of the user.
        email (EmailStr): Auth's email address.
    """

    id: str
    name: str
    email: str

class AuthLogin(BaseModel):
    """
    Schema for user login.

    Attributes:
        email (EmailStr): Auth's email address.
        password (str): Password for authentication. Minimum 6 characters.
    """

    email: str
    password: str = Field(..., min_length=6)


class AuthResponse(BaseModel):
    """
    Schema for user response.

    Attributes:
        id (str): Unique identifier for the user.
        name (str): Full name of the user.
        email (EmailStr): Auth's email address.
    """

    id: str
    name: str
    email: str
