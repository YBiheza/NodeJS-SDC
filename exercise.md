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
Create a repository that implements the following methods:
+ createOrder method;
+ getOrderById method;
+ getAllOrders method;
deleteOrder method;
Implement tests for all the methods
Adjust service to use the repository for creating orders.