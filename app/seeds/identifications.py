from app.models import db, User

def undo_identifications():
    db.session.execute('TRUNCATE identifications RESTART IDENTITY CASCADE;')
    db.session.commit()
