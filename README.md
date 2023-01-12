[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2022_Victor-Merino_Back-Final-Project-202209-BCN&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2022_Victor-Merino_Back-Final-Project-202209-BCN)
# PUBLIC ENDPOINTS

## USERS PROTECTED ENDPOINTS

**[POST]/user/register**

- Recibe datos al registrarse un usuario.
- STATUS 201

**[POST]/user/login**

- Recibe datos del usuario en el login y comprueba si existe en la DB.
- STATUS 200

## RECIPES NOT PROTECTED ENDPOINTS

**[GET]/recipes**

- Devuelve un array con todas las recetas.
- STATUS 200

**[GET]/recipes/:idRecipes**

- Recibe un objeto Recipe
- STATUS 200

**[POST]/recipes/create**

- Recibe un objeto Recipe sin id para crearlo en la BD y devuelve el mismo objeto con id creada.
- STATUS 201

**[PUT]/recipes/update**

- Recibe una Recipe completa, realiza las modificaciones en la BD con la misma id y devuelve el objeto recipe modificado.
- STATUS 201

**[DELETE]/recipes/delete/:idRecipe**

- Elimina de la BD el destino por id y devuelve el objeto eliminado.
- STATUS 200

# ERRORS STATUS

**400** Bad Request.

**401** Unauthorized.

**403** Forbbiden.

**404** Not found.

**409** Conflicts.

**500** Internal Server Error.
