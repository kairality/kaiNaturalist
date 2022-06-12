from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='exploring_dora', email='dora@noswiping.com', password='password')
    jobu = User(
        username='jobu_tupaki', email='everything@everywhere.com', password='allatonce')
    yshtola = User(
        username='yshtola_rhul', email='yshtola@littlesun.com', password='littlesun')
    bananamilk = User(
        username='bananamilk', email='bananamilk@modone.com', password='banana')
    varvarbinks = User(
        username='var_var_binks', email='var@var.com', password='banana')
    princesszelda = User(
        username='princess_zelda', email='zelda@hyrule.com', password='ilovelink')
    kipooak = User(
        username='kipo_oak', email='kipo@wonderbeasts.com', password='dad')
    marge = User(
        username='marge_gunderson', email='marge@fargo.gov', password='arbys')
    norm = User(
        username='norm_gunderson', email='norm@normspaintings.com', password='arbys')
    jerry = User(
        username='jerry_lundegaard', email='jerr@gustafsonmotors.com', password='gustafson')
    carl = User(
        username='carl_showalter', email='carl@badguys.com', password='buscemi')

    db.session.add_all([
        demo,
        jobu,
        yshtola,
        bananamilk,
        varvarbinks,
        princesszelda,
        kipooak,
        marge,
        norm,
        jerry,
        carl,
    ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
