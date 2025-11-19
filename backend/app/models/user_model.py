from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    """
    Schema for user registration.

    Attributes:
        name (str): Full name of the user. Must have at least 1 character.
        email (EmailStr): User's email address.
        password (str): Password for the account. Minimum 6 characters.
    """

    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    """
    Schema for user login.

    Attributes:
        email (EmailStr): User's email address.
        password (str): Password for authentication. Minimum 6 characters.
    """

    email: EmailStr
    password: str = Field(..., min_length=6)


class UserResponse(BaseModel):
    """
    Schema for user response.

    Attributes:
        id (int): Unique identifier for the user.
        name (str): Full name of the user.
        email (EmailStr): User's email address.
    """

    id: int
    name: str
    email: EmailStr
