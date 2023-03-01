const wikiCondition = {
  'wiki.condition': 'Condition',
  'wiki.condition.always': 'Toujours',
  'wiki.condition.always.not': 'Jamais',
  'wiki.condition.active': 'actif',
  'wiki.condition.active.not': 'n\'est pas actif',
  'wiki.condition.is_active_f': 'est active',
  'wiki.condition.is_active_f.not': 'n\'est pas active',
  'wiki.condition.follow': 'Suis',
  'wiki.condition.follow.not': 'Ne suis pas',
  'wiki.condition.is_level': 'est au moins niveau',
  'wiki.condition.level': 'au moins niveau',
  'wiki.condition.emperor': 'L\'empereur du SERG',
  'wiki.condition.has_reform': 'Utilise la réforme gouvernementale',
  'wiki.condition.has_reform.not': 'N\'utilise pas la réforme gouvernementale',
  'wiki.condition.government': 'Gouvernement',
  'wiki.condition.government.not': 'N\'a pas un gouvernement',
  'wiki.condition.normal_or_historical_nations': 'Configuration des pays en normal ou historique',
  'wiki.condition.normal_or_historical_nations.not': 'Configuration des pays pas en normal ou historique',
  'wiki.condition.not': 'Aucune des conditions suivantes',
  'wiki.condition.or': 'N\'importe quelle condition suivante est validée',
  'wiki.condition.and': 'Toutes les conditions suivante sont validées',
  'wiki.condition.if': 'Si',
  'wiki.condition.else_if': 'Sinon si',
  'wiki.condition.else': 'Sinon',
  'wiki.condition.limit': 'Uniquement si les conditions suivantes sont validées',
  'wiki.condition.any_subject_country': 'N\'importe quelle de nos dépendance',
  'wiki.condition.tag': 'Est',
  'wiki.condition.tag.not': 'N\'est pas',
  'wiki.condition.advisor': 'A engagé un',
  'wiki.condition.advisor.not': 'N\'a pas engagé un',
  'wiki.condition.has_country_modifier': 'Possède le modificateur',
  'wiki.condition.has_country_modifier.not': 'Ne possède pas le modificateur',
  'wiki.condition.has_ruler_modifier': 'Possède le modificateur',
  'wiki.condition.has_ruler_modifier.not': 'Ne possède pas le modificateur',
  'wiki.condition.has_country_flag': 'A l\'indicateur',
  'wiki.condition.has_country_flag.not': 'N\'a pas l\'indicateur',
  'wiki.condition.has_province_flag': 'A l\'indicateur',
  'wiki.condition.has_province_flag.not': 'N\'a pas l\'indicateur',
  'wiki.condition.has_global_flag': 'L\'indicateur',
  'wiki.condition.has_global_flag.not': 'L\'indicateur',
  'wiki.condition.has_ruler_flag': 'Le roi a l\'indicateur',
  'wiki.condition.has_ruler_flag.not': 'Le roi n\'a pas l\'indicateur',
  'wiki.condition.is_playing_custom_nation': 'Joue un pays personnalisé',
  'wiki.condition.is_playing_custom_nation.not': 'Ne joue pas un pays personnalisé',
  'wiki.condition.ai': 'Est un pays IA',
  'wiki.condition.ai.not': 'Est un pays humain',
  'wiki.condition.monthly_income': 'Revenu mensuel d\'au moins',
  'wiki.condition.monthly_income.not': 'Revenu mensuel inférieur à',
  'wiki.condition.is_strongest_trade_power': 'Est la première puissance commerciale du nœud',
  'wiki.condition.full_idea_group': 'A terminé le groupe d\'idées',
  'wiki.condition.current_age': 'L\'age actuel est',
  'wiki.condition.current_age.not': 'L\'age actuel n\'est pas',
  'wiki.condition.has_dlc': 'Utilise le DLC',
  'wiki.condition.has_dlc.not': 'N\'utilise pas le DLC',
  'wiki.condition.adm': 'Compétence administrative du dirigent d\'au moins',
  'wiki.condition.adm.not': 'Compétence administrative du dirigent inférieure à',
  'wiki.condition.dip': 'Compétence diplomatique du dirigent d\'au moins',
  'wiki.condition.dip.not': 'Compétence diplomatique du dirigent inférieure à',
  'wiki.condition.mil': 'Compétence militaire du dirigent d\'au moins',
  'wiki.condition.mil.not': 'Compétence militaire du dirigent inférieure à',
  'wiki.condition.stability': 'Stabilité d\'au moins',
  'wiki.condition.stability.not': 'Stabilité inférieure à',
  'wiki.condition.ruler_religion': 'Le roi est de religion',
  'wiki.condition.ruler_religion.not': 'Le roi n\'est pas de religion',
  'wiki.condition.ruler_religion.root': 'Le roi est de la religion du pays',
  'wiki.condition.ruler_religion.root.not': 'Le roi n\'est pas de la religion pays',
  'wiki.condition.heir_religion': 'L\'héritier est de religion',
  'wiki.condition.heir_religion.not': 'L\'héritier n\'est pas de religion',
  'wiki.condition.heir_religion.root': 'L\'héritier est de la religion du pays',
  'wiki.condition.heir_religion.root.not': 'L\'héritier n\'est pas de la religion pays',
  'wiki.condition.has_owner_religion': 'Est de la religion de son propriétaire',
  'wiki.condition.has_owner_religion.not': 'N\'est pas de la religion de son propriétaire',
  'wiki.condition.religion': 'Est de religion',
  'wiki.condition.religion.not': 'N\'est pas de religion',
  'wiki.condition.religion.root': 'Est de la religion de son propriétaire',
  'wiki.condition.religion.root.not': 'N\'est pas de la religion de son propriétaire',
  'wiki.condition.religion.emperor': 'Est de la même religion que l\'empereur du SERG',
  'wiki.condition.religion.emperor.not': 'N\'est pas de la même religion que l\'empereur du SERG',
  'wiki.condition.religion.country': 'Est de la même religion que',
  'wiki.condition.religion.country.not': 'N\'est pas de la même religion que',
  'wiki.condition.alliance_with': 'Est allié à',
  'wiki.condition.alliance_with.not': 'N\'est pas allié à',
  'wiki.condition.alliance_with.root': 'Est allié avec nous',
  'wiki.condition.alliance_with.root.not': 'N\'est pas allié avec nous',
  'wiki.condition.alliance_with.emperor': 'Est allié à l\'empereur du SERG',
  'wiki.condition.alliance_with.emperor.not': 'N\'est pas allié à l\'empereur du SERG',
  'wiki.condition.alliance_with.country': 'Est allié à',
  'wiki.condition.alliance_with.country.not': 'N\'est pas allié à',
  'wiki.condition.overlord_of': 'Est le suzerain de',
  'wiki.condition.overlord_of.not': 'N\'est pas le suzerain de',
  'wiki.condition.overlord_of.root': 'Est notre suzerain',
  'wiki.condition.overlord_of.root.not': 'N\'est pas notre suzerain',
  'wiki.condition.overlord_of.emperor': 'Est le suzerain de l\'empereur du SERG',
  'wiki.condition.overlord_of.emperor.not': 'N\'est pas le suzerain de l\'empereur du SERG',
  'wiki.condition.overlord_of.country': 'Est le suzerain de',
  'wiki.condition.overlord_of.country.not': 'N\'est pas le suzerain de',
  'wiki.condition.dominant_religion': 'La religion dominante est',
  'wiki.condition.dominant_religion.not': 'La religion dominante n\'est pas',
  'wiki.condition.is_defender_of_faith': 'Est le défenseur de la foi',
  'wiki.condition.is_defender_of_faith.not': 'N\'est pas le défenseur de la foi',
  'wiki.condition.is_at_war': 'Est en guerre',
  'wiki.condition.is_at_war.not': 'N\'est pas en guerre',
  'wiki.condition.is_elector': 'Est un électeur du SERG',
  'wiki.condition.is_elector.not': 'N\'est un électeur du SERG',
  'wiki.condition.is_part_of_hre': 'Est dans le SERG',
  'wiki.condition.is_part_of_hre.not': 'N\'est pas dans le SERG',
  'wiki.condition.is_emperor': 'Est empereur du SERG',
  'wiki.condition.is_emperor.not': 'N\'est pas empereur du SERG',
  'wiki.condition.is_in_deficit': 'Est en déficit',
  'wiki.condition.is_in_deficit.not': 'N\'est pas en déficit',
  'wiki.condition.treasury': 'Trésorerie d\'au moins',
  'wiki.condition.treasury.not': 'Trésorerie inférieure à',
  'wiki.condition.num_of_loans': 'Nombre d\'emprunts d\'au moins',
  'wiki.condition.num_of_loans.not': 'Nombre d\'emprunts inférieur à',
  'wiki.condition.corruption': 'Corruption d\'au moins',
  'wiki.condition.corruption.not': 'Corruption inférieure à',
  'wiki.condition.war_with': 'Est en guerre',
  'wiki.condition.war_with.not': 'N\'est pas en guerre',
  'wiki.condition.war_with.emperor': 'Est en guerre contre l\'empereur du SERG',
  'wiki.condition.war_with.emperor.not': 'N\'est pas en guerre contre l\'empereur du SERG',
  'wiki.condition.war_with.country': 'Est en guerre contre',
  'wiki.condition.war_with.country.not': 'N\'est pas en guerre contre',
  'wiki.condition.reverse_has_opinion': 'A une opinion de nous d\'au moins',
  'wiki.condition.reverse_has_opinion.not': 'A une opinion de nous inférieure à',
  'wiki.condition.reverse_has_opinion.emperor': 'L\'empereur du SERG a une opinion de nous d\'au moins',
  'wiki.condition.reverse_has_opinion.emperor.not': 'L\'empereur du SERG a une opinion de nous inférieure à',
  'wiki.condition.reverse_has_opinion.country': ' a une opinion de nous d\'au moins',
  'wiki.condition.reverse_has_opinion.country.not': ' a une opinion de nous inférieure à',
  'wiki.condition.has_opinion': 'Nous avons une opinion d\'au moins',
  'wiki.condition.has_opinion.not': 'Nous avons une opinion inférieure à',
  'wiki.condition.has_opinion.emperor': 'Nous avons une opinion de l\'empereur du SERG d\'au moins',
  'wiki.condition.has_opinion.emperor.not': 'Nous avons une opinion de l\'empereur du SERG inférieure à',
  'wiki.condition.has_opinion.country': 'Nous avons une opinion de ',
  'wiki.condition.has_opinion.country.2': 'd\'au moins',
  'wiki.condition.has_opinion.country.2.not': 'inférieure à',
  'wiki.condition.has_estate_privilege': 'A le privilège',
  'wiki.condition.has_estate_privilege.not': 'N\'a pas le privilège',
  'wiki.condition.is_religion_enabled': 'La religion',
  'wiki.condition.is_religion_enabled.not': 'La religion',
  'wiki.condition.owns_core_province': 'Possède légitimement la province de',
  'wiki.condition.owns_core_province.not': 'Ne possède pas légitimement la province de',
  'wiki.condition.owns': 'Possède la province de',
  'wiki.condition.owns.not': 'Ne possède pas la province de',
  'wiki.condition.owns_or_non_sovereign_subject_of': 'Nous possédons ou une dépendance non tributaire possède',
  'wiki.condition.owns_or_non_sovereign_subject_of.not': 'Nous ne possédons pas et aucune dépendance non tributaire ne possède',
  'wiki.condition.is_subject': 'Est une dependence',
  'wiki.condition.is_subject.not': 'N\'est pas une dependence',
  'wiki.condition.is_subject_of': 'Est une dependence de',
  'wiki.condition.is_subject_of.not': 'N\'est pas une dependence de',
  'wiki.condition.is_subject_of.root': 'Est une de nos dependence',
  'wiki.condition.is_subject_of.root.not': 'N\'est pas une de nos dependence',
  'wiki.condition.was_never_end_game_tag_trigger': 'N\'a jamais été un « pays de fin »',
  'wiki.condition.was_never_end_game_tag_trigger.not': 'A été un « pays de fin »',
  'wiki.condition.exists': 'existe',
  'wiki.condition.exists.not': 'N\'existe pas',
  'wiki.condition.primary_culture': 'Est de culture principale',
  'wiki.condition.primary_culture.not': 'N\'est pas de culture principale',
  'wiki.condition.culture': 'Est de culture',
  'wiki.condition.culture.not': 'N\'est pas de culture',
  'wiki.condition.culture.root': 'Est de la culture de son propriétaire',
  'wiki.condition.culture.root.not': 'N\'est pas de la culture de son propriétaire',
  'wiki.condition.culture.country': 'Est de la culture de',
  'wiki.condition.culture.country.not': 'N\'est pas de la culture de',
  'wiki.condition.culture.emperor': 'Est de la même culture que l\'empereur du SERG',
  'wiki.condition.culture.emperor.not': 'N\'est pas de la même culture que l\'empereur du SERG',
  'wiki.condition.is_capital_of': 'Est la capitale',
  'wiki.condition.is_capital_of.not': 'N\'est pas la capitale',
  'wiki.condition.is_capital_of.root': 'Est la capitale de son propriétaire',
  'wiki.condition.is_capital_of.root.not': 'N\'est pas la capitale de son propriétaire',
  'wiki.condition.is_capital_of.country': 'Est la capitale de',
  'wiki.condition.is_capital_of.country.not': 'N\'est pas la capitale de',
  'wiki.condition.is_capital_of.emperor': 'Est la capitale que l\'empereur du SERG',
  'wiki.condition.is_capital_of.emperor.not': 'N\'est pas la capitale que l\'empereur du SERG',
  'wiki.condition.is_free_or_tributary_trigger': 'Est indépendant ou tributaire',
  'wiki.condition.is_free_or_tributary_trigger.not': 'N\'est indépendant ou tributaire',
  'wiki.condition.is_state': 'Relève d\'un État',
  'wiki.condition.is_state.not': 'Ne relève pas d\'un État',
  'wiki.condition.num_of_owned_provinces_with': 'Au moins {nb, plural, =0 {Aucun province ne remplit} =1 {une province remplit} other {# provinces remplissent}} les conditions suivantes',
  'wiki.condition.num_of_owned_provinces_with.not': 'Moins de {nb, plural, =0 {0 remplit} =1 {une province remplit} other {# provinces remplissent}} les conditions suivantes',
  'wiki.condition.culture_group': 'Est de du groupe culturel',
  'wiki.condition.culture_group.not': 'N\'est pas du groupe culturel',
  'wiki.condition.religion_group': 'Est de du groupe religieux',
  'wiki.condition.religion_group.not': 'N\'est pas du groupe religieux',
  'wiki.condition.adm_tech': 'A découvert la Technologie administrative',
  'wiki.condition.adm_tech.not': 'N\'a découvert la technologie administrative',
  'wiki.condition.dip_tech': 'A découvert la technologie diplomatique',
  'wiki.condition.dip_tech.not': 'N\'a découvert la technologie diplomatique',
  'wiki.condition.mil_tech': 'A découvert la technologie militaire',
  'wiki.condition.mil_tech.not': 'N\'a découvert la technologie militaire',
  'wiki.condition.overextension_percentage': 'Surexpansion supérieure à',
  'wiki.condition.overextension_percentage.not': 'Surexpansion inférieure à',
  'wiki.condition.has_secondary_religion': 'Suis une religion secondaire',
  'wiki.condition.secondary_religion': 'comme religion secondaire',
  'wiki.condition.has_secondary_religion.not': 'Ne suis pas de religion secondaire',
  'wiki.condition.is_lesser_in_union': 'Est le partenaire mineur d\'une union personnelle',
  'wiki.condition.is_lesser_in_union.not': 'N\'est pas le partenaire mineur d\'une union personnelle',
  'wiki.condition.any_neighbor_country': 'N\'importe quel pays voisin remplit les conditions suivantes',
  'wiki.condition.any_neighbor_country.not': 'Aucun quel pays voisin ne remplit les conditions suivantes',
  'wiki.condition.any_owned_province': 'N\'importe quelle province possédée remplit les conditions suivantes',
  'wiki.condition.any_owned_province.not': 'Aucune province possédée remplit les conditions suivantes',
  'wiki.condition.any_core_province': 'N\'importe quelle province légitime remplit les conditions suivantes',
  'wiki.condition.any_core_province.not': 'Aucune province légitime remplit les conditions suivantes',
  'wiki.condition.religion_enforced': 'La religion d\'état a été imposée',
  'wiki.condition.religion_enforced.not': 'La religion d\'état n\'a été imposée',
  'wiki.condition.uses_piety': 'A recourt à la piété',
  'wiki.condition.uses_piety.not': 'N\'a pas recourt à la piété',
  'wiki.condition.uses_devotion': 'A recourt à la dévotion',
  'wiki.condition.uses_devotion.not': 'N\'a pas recourt à la dévotion',
  'wiki.condition.piety': 'Piété d\'au moins',
  'wiki.condition.piety.not': 'Piété inférieure à',
  'wiki.condition.owned_by': 'Appartient à',
  'wiki.condition.owned_by.not': 'N\'appartient pas à',
  'wiki.condition.owned_by.root': 'Nous appartient',
  'wiki.condition.owned_by.root.not': 'Ne nous appartient pas',
  'wiki.condition.is_core': 'Est une province légitime',
  'wiki.condition.is_core.not': 'N\'est pas une province légitime',
  'wiki.condition.is_core.root': 'Est une province légitime',
  'wiki.condition.is_core.root.not': 'N\'est pas une province légitime',
  'wiki.condition.has_government_attribute': 'Utilise le mécanisme gouvernemental',
  'wiki.condition.has_government_attribute.not': 'N\'utilise le mécanisme gouvernemental',
  'wiki.condition.region': 'Est dans la région',
  'wiki.condition.region.not': 'N\'est pas dans la région',
  'wiki.condition.government_rank': 'Est de rang gouvernemental au moins',
  'wiki.condition.government_rank.not': 'Est de rang gouvernemental inférieur à',
  'wiki.condition.legitimacy': 'A une légitimité d\'au moins',
  'wiki.condition.legitimacy.not': 'A une légitimité inférieure à',
  'wiki.condition.legitimacy_equivalent': 'A une légitimité d\'au moins',
  'wiki.condition.legitimacy_equivalent.not': 'A une légitimité inférieure à',
  'wiki.condition.republican_tradition': 'A une tradition républicaine d\'au moins',
  'wiki.condition.republican_tradition.not': 'A une tradition républicaine inférieure à',
  'wiki.condition.is_female': 'La dirigeante est une femme',
  'wiki.condition.is_female.not': 'Le dirigeant est un homme',
  'wiki.condition.has_regency': 'A une régence',
  'wiki.condition.has_regency.not': 'N\'est pas en régence',
  'wiki.condition.religious_school': 'Suis l\'école religieuse',
  'wiki.condition.religious_school.not': 'Ne suis pas l\'école religieuse',
  'wiki.condition.has_idea': 'A l\'idée',
  'wiki.condition.years_of_income': 'A une trésorerie équivalente à au moins',
  'wiki.condition.years_of_income.not': 'A une trésorerie inférieure à',
  'wiki.condition.years_of_income.2': '{nb, plural, =0 {an} =1 {an} other {ans}} de revenue',
  'wiki.condition.has_idea.not': 'N\'a pas l\'idée',
  'wiki.condition.adm_power': 'Réserve de points administratifs d\'au moins',
  'wiki.condition.dip_power': 'Réserve de points diplomatiques d\'au moins',
  'wiki.condition.mil_power': 'Réserve de points militaires d\'au moins',
  'wiki.condition.adm_power.not': 'Réserve de points administratifs inférieure à',
  'wiki.condition.dip_power.not': 'Réserve de points diplomatiques inférieure à',
  'wiki.condition.mil_power.not': 'Réserve de points militaires inférieure à',
  'wiki.condition.has_province_modifier': 'Possède le modificateur',
  'wiki.condition.has_province_modifier.not': 'Ne possède pas le modificateur',
  'wiki.condition.base_manpower': 'Développement militaire d\'au moins',
  'wiki.condition.base_manpower.not': 'Développement militaire inférieur à',
  'wiki.condition.base_tax': 'Développement administratif d\'au moins',
  'wiki.condition.base_taw.not': 'Développement administratif inférieur à',
  'wiki.condition.base_production': 'Développement diplomatique d\'au moins',
  'wiki.condition.base_production.not': 'Développement diplomatique inférieur à',
  'wiki.condition.is_empty': 'N\'est pas colonisée',
  'wiki.condition.is_empty.not': 'Est colonisée',
  'wiki.condition.is_former_colonial_nation': 'Est une ancienne colonie',
  'wiki.condition.is_former_colonial_nation.not': 'N\'est pas une ancienne colonie',
  'wiki.condition.is_colonial_nation': 'Est une colonie',
  'wiki.condition.is_colonial_nation.not': 'N\'est pas une colonie',
  'wiki.condition.controls': 'Contrôle',
  'wiki.condition.controls.not': 'Ne contrôle pas',
  'wiki.condition.has_flagship': 'A un vaisseau amiral',
  'wiki.condition.has_flagship.not': 'N\'a pas de vaisseau amiral',
  'wiki.condition.capital': 'A sa capitale à',
  'wiki.condition.capital.not': 'N\'a pas sa capitale à',
  'wiki.condition.has_factions': 'Le gouvernement permet les factions',
  'wiki.condition.has_factions.not': 'Ne gouvernement ne permet pas les factions',
  'wiki.condition.has_faction': 'Le gouvernement permet la faction',
  'wiki.condition.has_faction.not': 'Ne gouvernement ne permet pas la faction',
  'wiki.condition.is_year': 'Est au moins en',
  'wiki.condition.is_year.not': 'Est avant',
  'wiki.condition.has_heir': 'A un héritier',
  'wiki.condition.has_heir.not': 'N\'a pas d\'héritier',
  'wiki.condition.has_idea_group': 'A le groupe d\'idées',
  'wiki.condition.has_idea_group.not': 'N\'a pas le groupe d\'idées',
  'wiki.condition.capital_scope': 'La capitale',
  'wiki.condition.dynasty': 'La dynastie régnante est',
  'wiki.condition.dynasty.not': 'La dynastie régnante n\'est pas',
  'wiki.condition.technology_group': 'Est du groupe technologique',
  'wiki.condition.technology_group.not': 'N\'est pas du groupe technologique',
  'wiki.condition.trade_goods': 'Produit',
  'wiki.condition.trade_goods.not': 'Ne produit pas',
  'wiki.condition.has_estate': 'A l\'ordre',
  'wiki.condition.has_estate.not': 'N\'a pas l\'ordre',
  'wiki.condition.has_institution': 'A adopté l\'institution',
  'wiki.condition.is_religion_reformed': 'A réformé sa religion',
  'wiki.condition.is_religion_reformed.not': 'N\'a pas réformé sa religion',
  'wiki.condition.has_institution.not': 'N\'a pas adopté l\'institution',
  'wiki.condition.is_nomad': 'Est un peuple nomade',
  'wiki.condition.num_of_cities': 'Possède au moins',
  'wiki.condition.num_of_cities.not': 'Possède mois de',
  'wiki.condition.num_of_cities.2': '{nb, plural, =0 {ville} =1 {ville} other {villes}}',
  'wiki.condition.num_of_ports': 'Possède au moins',
  'wiki.condition.num_of_ports.not': 'Possède mois de',
  'wiki.condition.num_of_ports.2': '{nb, plural, =0 {port} =1 {port} other {ports}}',
  'wiki.condition.num_of_merchants': 'Possède au moins',
  'wiki.condition.num_of_merchants.not': 'Possède mois de',
  'wiki.condition.num_of_merchants.2': '{nb, plural, =0 {marchand} =1 {marchand} other {marchands}}',
  'wiki.condition.is_nomad.not': 'N\'est pas un peuple nomade',
  'wiki.condition.faction_in_power.1': 'Les',
  'wiki.condition.faction_in_power': 'sont au pouvoir',
  'wiki.condition.faction_in_power.not': 'ne sont pas au pouvoir',
  'wiki.condition.trust': 'A une confiance d\'au moins',
  'wiki.condition.trust.2': 'envers nous',
  'wiki.condition.trust.country': 'a une confiance d\'au moins',
  'wiki.condition.trust.country.2': 'envers nous',
  'wiki.condition.has_discovered': 'A découvert',
  'wiki.condition.has_discovered.not': 'N\'a pas découvert',
  'wiki.condition.super_region.clause': 'N\'importe quelle province sur le continent {super_region}',
  'wiki.condition.region.clause': 'N\'importe quelle province dans la région {region}',
  'wiki.condition.area.clause': 'N\'importe quelle province dans l\'état {area}',
  'wiki.condition.owner': 'Le propriétaire',
  'wiki.condition.trust.not': 'A une confiance inférieure à',
  'wiki.condition.papal_influence': 'A une influence papale d\'au moins',
  'wiki.condition.papal_influence.not': 'A une influence papale inférieure à',
  'wiki.condition.num_of_rebel_armies': 'Le nombre d\'armées rebelles dans le pays est d\'au moins',
  'wiki.condition.num_of_rebel_armies.not': 'Le nombre d\'armées rebelles dans le pays est inférieur à',
  'wiki.condition.num_of_rebel_controlled_provinces': 'Le nombre de provinces contrôlées par les rebelles dans le pays est d\'au moins',
  'wiki.condition.num_of_rebel_controlled_provinces.not': 'Le nombre de provinces contrôlées par les rebelles dans le pays est est inférieur à',
  'wiki.condition.faction.influence': 'ont une influence d\'au moins',
  'wiki.condition.faction.influence.2': ' ',
}

export default wikiCondition;
