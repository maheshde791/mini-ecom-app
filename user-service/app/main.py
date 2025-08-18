from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, crud, database, auth

app = FastAPI(title="User Service")

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production use ["http://localhost:3000"] or specific domains
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],  # e.g. Content-Type, Authorization
)

# ✅ Create tables
models.Base.metadata.create_all(bind=database.engine)

@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or user.password != form_data.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    access_token = auth.create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Example protected API
@app.get("/me", response_model=schemas.UserResponse)
def read_users_me(current_user=Depends(auth.get_current_user)):
    return current_user
