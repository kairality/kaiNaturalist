from app.models import db, User


def undo_observations():
    db.session.execute('TRUNCATE observations RESTART IDENTITY CASCADE;')
    db.session.commit()
