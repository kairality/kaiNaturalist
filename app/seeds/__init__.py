from flask.cli import AppGroup

from .observations import undo_observations
from .identifications import undo_identifications
from .users import seed_users, undo_users
from .taxa import seed_kingdoms, seed_phyla, seed_class, seed_order, seed_family, undo_taxa
import time

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here

@seed_commands.command('taxa')
def taxa():
    kingdoms = seed_kingdoms()
    phyla = seed_phyla()
    time.sleep(15)
    classes = seed_class()
    time.sleep(15)
    orders = seed_order()

@seed_commands.command('family')
def family():
    families = seed_family()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_observations()
    undo_identifications()
    # Add other undo functions here

@seed_commands.command('detax')
def detax():
    undo_taxa()
