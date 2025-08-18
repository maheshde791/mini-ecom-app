from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    class Config:
        from_attributes = True   # instead of orm_mode (fix warning)

class Token(BaseModel):
    access_token: str
    token_type: str


