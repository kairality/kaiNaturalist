"""empty message

Revision ID: d633d5ff1fe1
Revises: ffdc0a98111c
Create Date: 2022-06-06 23:28:54.853641

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd633d5ff1fe1'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('taxon_kingdoms',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('scientific_name', sa.String(length=255), nullable=False),
    sa.Column('common_name', sa.String(length=255), nullable=True),
    sa.Column('parent_taxon_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('taxon_phyla',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('scientific_name', sa.String(length=255), nullable=False),
    sa.Column('common_name', sa.String(length=255), nullable=True),
    sa.Column('parent_taxon_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parent_taxon_id'], ['taxon_kingdoms.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('taxon_classes',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('scientific_name', sa.String(length=255), nullable=False),
    sa.Column('common_name', sa.String(length=255), nullable=True),
    sa.Column('parent_taxon_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['parent_taxon_id'], ['taxon_phyla.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('taxon_orders',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('scientific_name', sa.String(length=255), nullable=False),
    sa.Column('common_name', sa.String(length=255), nullable=True),
    sa.Column('parent_taxon_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parent_taxon_id'], ['taxon_classes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('taxon_families',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('scientific_name', sa.String(length=255), nullable=False),
    sa.Column('common_name', sa.String(length=255), nullable=True),
    sa.Column('parent_taxon_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['parent_taxon_id'], ['taxon_orders.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('taxa',
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('kingdom_id', sa.Integer(), nullable=False),
    sa.Column('phylum_id', sa.Integer(), nullable=True),
    sa.Column('class_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('family_id', sa.Integer(), nullable=True),
    sa.Column('external_url', sa.String(length=255), nullable=True),
    sa.Column('external_rank', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['class_id'], ['taxon_classes.id'], ),
    sa.ForeignKeyConstraint(['family_id'], ['taxon_families.id'], ),
    sa.ForeignKeyConstraint(['kingdom_id'], ['taxon_kingdoms.id'], ),
    sa.ForeignKeyConstraint(['order_id'], ['taxon_orders.id'], ),
    sa.ForeignKeyConstraint(['phylum_id'], ['taxon_phyla.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('taxa')
    op.drop_table('taxon_families')
    op.drop_table('taxon_orders')
    op.drop_table('taxon_classes')
    op.drop_table('taxon_phyla')
    op.drop_table('taxon_kingdoms')
    # ### end Alembic commands ###
