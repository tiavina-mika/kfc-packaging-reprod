## Description

### Contexte :
Nous souhaitons donner à l'atelier de barquettage/conditionnement, la possibilité de peser de nouveau une ou plusieurs sections     

### Solution :
Suivre le Figma

Ajouter un moreMenu "Faire une contre-pesée/reprod"  (Figma)

Ouvrir la modale de sélection des recettes (Figma)

Une fois la recette sélectionnée, ouvrir la modale de contre-pesée.

 

### Focus modale de sélection des recettes :
Dans l'input ce qu'on remonte ce sont les packagingExecutions en barquettage le jour sélectionné, mais on n'affiche que leur uniqueCode et nom. L'input doit être un auto-complete sur la chaine de caractères uniqueCode + nom.
Il faut afficher un message d'erreur si l'on clique sur valider sans sélectionner de recette. Figma

### Focus modale de contre-pesée.
Figma
Dans cette modale, on propose de changer le poids sorti de production pour toutes les sections du packagingExecution.  L'utilisateur peut n'en remplir qu'une ou que certaines (on ne va pas nécessairement peser tous les bacs)
Gérer l'input de quantité et les tuiles d'affichage du motif de la contre-pesée    

### Message d'erreurs
Si aucune quantité n'a été rentrée pour aucune section : Figma

Si la contre-pesée pour une section a été remplie mais qu'aucun motif n'a été saisi  : Figma

### Modale de contre-pesée, cas spécifique : nouvelle contre-pesée sur une section
S'il y a déjà eu une contre-pesée sur la section, afficher par défaut dans l'input la précédente contre-pesée.
Et donner la possibilité d'en saisir une nouvelle
Figma

# NOTE
This is not primarily a TypeScript project; it's just a UI display