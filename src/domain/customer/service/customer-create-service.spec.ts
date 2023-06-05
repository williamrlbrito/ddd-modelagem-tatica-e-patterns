import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CustomerCreateService from "./customer-create-service";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";

describe("Customer create service tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customerCreateService = new CustomerCreateService(customerRepository);

    const name = "John Doe";
    const street = "Main street";
    const number = 123;
    const zip = "12345";
    const city = "New York";

    const id = await customerCreateService.execute(
      name,
      street,
      number,
      zip,
      city
    );

    const customer = await customerRepository.find(id);

    expect(customer.name).toBe(name);
    expect(customer.Address.street).toBe(street);
    expect(customer.Address.number).toBe(number);
    expect(customer.Address.zip).toBe(zip);
    expect(customer.Address.city).toBe(city);
  });
});
