from sqlalchemy.orm import Session
from . import models
from .models import Note
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_user(db: Session, username: str, password: str):
    hashed_pw = get_password_hash(password)
    db_user = models.User(username=username, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_notes_for_user(db: Session, username: str):
    return db.query(Note).filter(Note.owner == username).all()

def create_note_for_user(db: Session, username: str, title: str, content: str):
    note = Note(title=title, content=content, owner=username)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

def update_note(db: Session, note_id: int, title: str, content: str, username: str):
    note = db.query(Note).filter(Note.id == note_id, Note.owner == username).first()
    if not note:
        return None
    note.title = title
    note.content = content
    db.commit()
    db.refresh(note)
    return note

def delete_note(db: Session, note_id: int, username: str):
    note = db.query(Note).filter(Note.id == note_id, Note.owner == username).first()
    if not note:
        return None
    db.delete(note)
    db.commit()
    return note