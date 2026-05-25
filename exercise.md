+ Create a fastify application for a pizza production backend service;
+ Create a healthcheck controller that returns 'OK' text response;
+ Create pizza ingredients stock management controller that receives request with a       body that provides details of a received ingredient shipment
+ Implement validation for the request body, using one of the following:
    Built-in Fastify validator;
    Zod;
    fastify-typeprovider-zod -> BONUS POINTS;
    fastify-api-contracts -> BONUS POINTS.
+ Implement an automated test (see USEFUL_REFERENCES.md for some tips) that makes requests to the stock management endpoint, cover the following scenarios:
    400 response to an invalid request;
    200 response to a valid request;
Create ShipmentService for your application, 
+ which implements registerShipment method, 
+ that needs to include the following logic, using the Strategy pattern (https://refactoring.guru/design-patterns/strategy), 
+ and expecting the following parameters: 
    + targetWarehouse (string), 
    + ingredients (id: string, units: number) - array:
+ If ingredient shipment is submitted out of the working hours for the target warehouse, reject it;
+ If ingredient shipment has less than minimum amount of units of the warehouse, reject it;
+ If ingredient shipment has more than maximum amount of units for the warehouse, split it into multiple shipments of up to 1000 units (see USEFUL_ALGORITHMS.md for a splitting algorithm);
+ Support multiple warehouses with different working hours and minimum  and maximum amounts of units.
Create OrderService for your application, which implements placeOrder method, which needs to include the following logic, 
+ using the Strategy pattern (https://refactoring.guru/design-patterns/strategy):
+ If order is submitted out of the working hours, reject it;
+ If order is submitted out of peak hours, apply Y%
+ (specific to country) discount;
+ Ir order is above X EUR (specific to country) total cost, apply Y% (specific to country) discount
+ In case several discounts are applied, the larger one wins, they are not summed.
+ Support multiple countries with different working hours and discount thresholds and sizes.
+ Implement tests that validate all of the rules for the service;
+ Implement persistence layer with drizzle (https://orm.drizzle.team/docs/get-started/postgresql-new):
+ Create drizzle configuration file;
+ Create drizzle table schema definition file;
+ Generate migrations from schema definition file;
+ Run migrations on a PostgreSQL instance (from Docker or locally installed)
    Docker: https://docs.docker.com/desktop/setup/install/windows-install/ / https://docs.docker.com/desktop/setup/install/mac-install/
    Direct PostgreSQL installation: https://www.postgresql.org/download/
<<<<<<< HEAD
+ Create a repository that implements the following methods:
+ createShipment method;
+ getShipmentById method;
+ getAllShipments method;
+ deleteShipment method;
+ Implement tests for all the methods
+ Adjust service to use the repository for creating shipments.
=======
Create a repository that implements the following methods:
+ createOrder method;
+ getOrderById method;
+ getAllOrders method;
deleteOrder method;
Implement tests for all the methods
Adjust service to use the repository for creating orders.
>>>>>>> inclass-2
