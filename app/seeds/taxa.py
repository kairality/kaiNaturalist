import requests
from app.models import db, Taxon, TaxonKingdom, TaxonPhylum, TaxonClass, TaxonFamily, TaxonOrder
from app.models.taxon_mixin import TaxonRank;
import time;

api = "https://api.inaturalist.org/v1/";
kingdom_params = {"rank" : "kingdom", "per_page": 200};
phylum_params = {"rank": "phylum", "per_page": 200}
class_params = {"rank": "class", "per_page": 200}
order_params = {"rank": "order", "per_page": 200}
family_params = {"rank": 'family', "per_page": 200}

kingdom_filter = {"Plantae", "Animalia", "Fungi"}

def seed_kingdoms():
    kingdom_data = requests.get(url = api + "taxa", params= kingdom_params)
    kingdoms = kingdom_data.json()
    if not kingdoms:
        raise Exception("Oops you're probably throttled")
    kingdoms = kingdoms.get("results");
    for kingdom in kingdoms:
        name = kingdom.get("name");
        if name not in kingdom_filter:
            continue;
        else:
            print(kingdom)
            dbKingdom = TaxonKingdom()
            dbTaxon = Taxon()
            dbKingdom.scientific_name = kingdom.get("name");
            dbKingdom.common_name =kingdom.get("preferred_common_name")
            dbKingdom.external_id = kingdom.get("id")
            print(TaxonRank.KINGDOM)
            dbKingdom.rank = TaxonRank.KINGDOM
            dbKingdom.parent_rank = None;
            dbTaxon.taxon_kingdom = dbKingdom
            try:
                default_photo = kingdom.get("default_photo")
                photo_url = default_photo.get("medium_url")
                dbTaxon.external_url = photo_url
            except:
                print("No Photo")
            dbTaxon.external_rank = kingdom.get("observations_count")
            db.session.add(dbKingdom)
    db.session.commit()
    return TaxonKingdom.query.all()

def seed_phyla():
    kingdoms = [t for t in Taxon.query.all() if t.rank == TaxonRank.KINGDOM]
    print(kingdoms)
    print("*************************")
    print("*************************")
    print("*************************")
    print("*************************")
    for kingdom in kingdoms:
        taxon_kingdom = kingdom.coalesce;
        phylum_params["taxon_id"] = taxon_kingdom.external_id
        phyla_data = requests.get(url = api + "taxa", params=phylum_params)
        phyla = phyla_data.json()
        if not phyla:
            raise Exception("Oops you're probably throttled")
        phyla = phyla.get("results")
        for phylum in phyla:
            if phylum.get('observations_count') < 100:
                continue
            if phylum.get('extinct') is True:
                continue
            else:
                print(phylum)
                dbPhylum = TaxonPhylum()
                dbTaxon = Taxon()
                dbPhylum.scientific_name = phylum.get("name");
                dbPhylum.common_name = phylum.get("preferred_common_name")
                dbPhylum.external_id = phylum.get("id")
                dbPhylum.parent_taxon_id = kingdom.id
                dbPhylum.rank = TaxonRank.PHYLUM
                dbPhylum.parent_rank =  TaxonRank.KINGDOM
                dbTaxon.kingdom_id = taxon_kingdom.id
                dbTaxon.taxon_phylum = dbPhylum
                try:
                    default_photo = phylum.get("default_photo")
                    photo_url = default_photo.get("medium_url")
                    dbTaxon.external_url = photo_url
                except:
                    print("No Photo")
                dbTaxon.external_rank = phylum.get("observations_count")
                db.session.add(dbPhylum)
    db.session.commit()
    return TaxonPhylum.query.all()

# def seed_class():
#     phyla = TaxonPhylum.query.all()
#     count = 0;
#     for phylum in phyla:
#         count = count + 1;
#         if count >= 60:
#             print("sleeping...")
#             time.sleep(60)
#             print("waking  up...")
#             count = 0;
#         class_params["taxon_id"] = phylum.external_id
#         class_data = requests.get(url = api + "taxa", params=class_params)
#         classes = class_data.json()
#         if not classes:
#             raise Exception("Oops you're probably throttled")
#         classes = classes.get("results")
#         for tClass in classes:
#             if tClass.get('observations_count') < 100:
#                 continue
#             if tClass.get('extinct') is True:
#                 continue
#             else:
#                 print(tClass)
#                 dbClass = TaxonClass()
#                 dbTaxon = Taxon()
#                 dbClass.scientific_name = tClass.get("name");
#                 dbClass.common_name = tClass.get("preferred_common_name")
#                 dbClass.external_id = tClass.get("id")
#                 dbClass.parent_taxon_id = phylum.taxon.id
#                 dbClass.rank = TaxonRank.CLASS
#                 dbClass.parent_rank = TaxonRank.PHYLUM
#                 dbTaxon.kingdom_id = phylum.parent_taxon_id
#                 dbTaxon.phylum_id = phylum.id
#                 dbTaxon.taxon_class = dbClass
#                 try:
#                     default_photo = tClass.get("default_photo")
#                     photo_url = default_photo.get("medium_url")
#                     dbTaxon.external_url = photo_url
#                 except:
#                     print("No Photo")
#                 dbTaxon.external_rank = tClass.get("observations_count")
#                 db.session.add(dbClass)
#     db.session.commit()
#     return TaxonClass.query.all()

# def seed_order():
#     classes = TaxonClass.query.all()
#     count = 0;
#     for tClass in classes:
#         count = count + 1;
#         if count >= 60:
#             print("sleeping...")
#             time.sleep(60)
#             print("waking  up...")
#             count = 0;
#         order_params["taxon_id"] = tClass.external_id
#         order_data = requests.get(url = api + "taxa", params=order_params)
#         orders = order_data.json()
#         if not orders:
#             raise Exception("Oops you're probably throttled")
#         orders = orders.get("results")
#         for order in orders:
#             if order.get('observations_count') < 100:
#                 continue
#             if order.get('extinct') is True:
#                 continue
#             else:
#                 print(order)
#                 dbOrder = TaxonOrder()
#                 dbTaxon = Taxon()
#                 dbOrder.scientific_name = order.get("name");
#                 dbOrder.common_name = order.get("preferred_common_name")
#                 dbOrder.external_id = order.get("id")
#                 dbOrder.parent_taxon_id = tClass.id
#                 dbTaxon.phylum_id = tClass.parent_taxon_id;
#                 dbTaxon.kingdom_id = tClass.parent_taxon.parent_taxon_id;
#                 dbTaxon.class_id = tClass.id
#                 dbOrder.rank = TaxonRank.ORDER
#                 dbOrder.parent_rank = TaxonRank.CLASS
#                 dbTaxon.taxon_order = dbOrder
#                 try:
#                     default_photo = order.get("default_photo")
#                     photo_url = default_photo.get("medium_url")
#                     dbTaxon.external_url = photo_url
#                 except:
#                     print("No Photo")
#                 dbTaxon.external_rank = order.get("observations_count")
#                 db.session.add(dbOrder)
#     db.session.commit()
#     return TaxonOrder.query.all()

# def seed_taxa():
#     count = 0;
#     kingdom_data = requests.get(url = api + "taxa", params= kingdom_params)
#     kingdoms = kingdom_data.json().get("results")
#     for kingdom in kingdoms:
#         name = kingdom.get("name");
#         if name not in kingdom_filter:
#             return;
#         else:
#             # print(kingdom);
#             dbKingdom = TaxonKingdom()
#             dbTaxon = Taxon()
#             dbKingdom.scientific_name = dbTaxon.scientific_name = kingdom.get("name");
#             dbKingdom.common_name = dbTaxon.common_name = kingdom.get("preferred_common_name")
#             dbTaxon.taxon_kingdom = dbKingdom
#             phylum_params["taxon_id"] = kingdom.get("id");
#             phyla_data = requests.get(url = api + "taxa", params=phylum_params);
#             phyla = phyla_data.json().get("results")
#             for phylum in phyla:
#                  # print(phylum)
#                 if phylum.get("extinct") is True:
#                     continue
#                 count = count + 1;
#                 if (count >= 60):
#                     print("sleeping ...")
#                     time.sleep(60)
#                     print("waking up")
#                     count = 0;
#                 dbPhylum = TaxonPhylum()
#                 dbTaxonPhylum = Taxon()
#                 dbPhylum.scientific_name = phylum.get('name')
#                 dbPhylum.common_name = phylum.get('preferred_common_name')
#                 dbPhylum.parent_taxon = dbKingdom
#                 dbTaxonPhylum.taxon_kingdom = dbKingdom
#                 dbTaxonPhylum.taxon_phylum = dbPhylum
#                 db.session.add(dbTaxonPhylum)
#                 class_params["taxon_id"] = phylum.get("id")
#                 class_data = requests.get(url = api + "taxa", params=class_params);
#                 try:
#                     classes = class_data.json();
#                     classes = classes.get("results");
#                 except Exception:
#                     continue;
#                 for tClass in classes:
#                     # print(tClass)
#                     if tClass.get("extinct") is True:
#                         continue
#                     count = count + 1;
#                     if (count >= 60):
#                         print("sleeping ...")
#                         time.sleep(60)
#                         print("waking up")
#                         count = 0;
#                     dbClass = TaxonClass()
#                     dbTaxonClass = Taxon()
#                     dbClass.scientific_name = tClass.get('name')
#                     dbClass.common_name = tClass.get('preferred_common_name')
#                     dbClass.parent_taxon = dbPhylum
#                     dbTaxonClass.taxon_kingdom = dbKingdom
#                     dbTaxonClass.taxon_phylum = dbPhylum
#                     dbTaxonClass.taxon_class = dbClass
#                     db.session.add(dbTaxonClass)
#                     family_params['taxon_id'] = tClass.get("id")
#                     family_data = requests.get(url = api + "taxa", params=family_params);
#                     families = family_data.json().get("results")
#                     print(families);
#                     for family in families:
#                         if family.get("extinct") is True:
#                             continue
#                         count = count + 1;
#                         if (count >= 60):
#                             print("sleeping ...")
#                             time.sleep(60)
#                             print("waking up")
#                             count = 0;
#                         dbFamily = TaxonFamily()
#                         dbTaxonFamily = Taxon()
#                         dbFamily.scientific_name = family.get('name')
#                         dbFamily.common_name = family.get('preferred_common_name')
#                         dbFamily.parent_taxon = dbClass;
#                         dbTaxonFamily.taxon_kingdom = dbKingdom
#                         dbTaxonFamily.taxon_phylum = dbPhylum
#                         dbTaxonFamily.taxon_class = dbClass
#                         dbTaxonFamily.taxon_family = dbFamily;
#                         db.session.add(dbTaxonFamily)
#             db.session.commit()

def undo_taxa():
    db.session.execute('TRUNCATE taxa RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE taxon_kingdoms RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE taxon_phyla RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE taxon_classes RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE taxon_families RESTART IDENTITY CASCADE;')
    db.session.commit()
