import requests
from app.models import db, Taxon, TaxonKingdom, TaxonPhylum, TaxonClass, TaxonFamily
import time;

api = "https://api.inaturalist.org/v1/";
kingdom_params = {"rank" : "kingdom", "per_page": 200};
phylum_params = {"rank": "phylum", "per_page": 200}
class_params = {"rank": "class", "per_page": 200}
family_params = {"rank": 'family', "per_page": 200}

kingdom_filter = {"Plantae", "Animalia", "Fungi"}

kingdoms_set = set()
phyla_set = set()
classes_set = set()
orders_set = set()
families_set = set()



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
            dbKingdom.scientific_name = dbTaxon.scientific_name = kingdom.get("name");
            dbKingdom.common_name = dbTaxon.common_name = kingdom.get("preferred_common_name")
            dbTaxon.taxon_kingdom = dbKingdom
            try:
                default_photo = kingdom.get("default_photo")
                photo_url = default_photo.get("medium_url")
                dbTaxon.external_url = photo_url
            except:
                print("No Photo")
            dbTaxon.external_rank = kingdom.get("observations_count")
            db.session.add(dbKingdom)
            kingdoms_set.add(kingdom.get("id"));
        db.session.commit()
        return {"message": "success"}

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
