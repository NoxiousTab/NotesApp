from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from . import schemas, crud, models
from .database import Base, engine, SessionLocal
from .crud import verify_password
from .token import create_access_token
from sqlalchemy.orm import Session
from .schemas import NoteCreate, NoteResponse
from .models import Note

app = FastAPI()
Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/auth/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already registered")

    return crud.create_user(db, user.username, user.password)

@app.post("/auth/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token({"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username

@app.get("/notes", response_model=list[NoteResponse])
def get_notes(current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_notes_for_user(db, current_user)



@app.post("/notes", response_model=NoteResponse)
def create_note(note: NoteCreate, current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_note_for_user(db, current_user, note.title, note.content)

@app.put("/notes/{note_id}", response_model=NoteResponse)
def update_note_endpoint(note_id: int, note: NoteCreate, current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    updated = crud.update_note(db, note_id, note.title, note.content, current_user)
    if not updated:
        raise HTTPException(status_code=404, detail="Note not found")
    return updated

@app.delete("/notes/{note_id}", response_model=NoteResponse)
def delete_note_endpoint(note_id: int, current_user: str = Depends(get_current_user), db: Session = Depends(get_db)):
    deleted = crud.delete_note(db, note_id, current_user)
    if not deleted:
        raise HTTPException(status_code=404, detail="Note not found")
    return deleted