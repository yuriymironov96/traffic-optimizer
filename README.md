## Entities
### DB entities and relations
For the sake of simplicity and quicker MVP development, currently only the very basic entities should be implemented. Therefore features like multi-point routes, delivery time constraints and so on are omitted for now, but can be added later.

![img](./docs/database/database_design.png)

See the full database scheme https://app.quickdatabasediagrams.com/#/d/SXURVB

### API endpoint conventions
All endpoints should follow the standard scheme:
* "/api/[entity_name]/[id]" for GET, POST, PUT, DELETE an individual entity by its ID
* "/api/[entity_name]" for GET for all the entities of this type
* "/api/reports/routes" for GET for the calculated routes in the form of "vehicle - departure point - destination point"

Routes will be calculated on the fly for the sake of interactivity and simplicity and will not be cached in the DB.