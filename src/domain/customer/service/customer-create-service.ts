import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer-created.event";
import SendConsoleLog01Handler from "../event/handler/send-console-log-01.handler";
import SendConsoleLog02Handler from "../event/handler/send-console-log-02.handler";
import CustomerFactory from "../factory/customer.factory";
import CustomerRepositoryInterface from "../repository/customer-repository.interface";
import Address from "../value-object/address";

export default class CustomerCreateService {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(
    name: string,
    street: string,
    number: number,
    zip: string,
    city: string
  ): Promise<string> {
    const address = new Address(street, number, zip, city);
    const customer = CustomerFactory.createWithAddress(name, address);

    await this.customerRepository.create(customer);

    const eventDispatcher = new EventDispatcher();
    const console01Handler = new SendConsoleLog01Handler();
    const console02Handler = new SendConsoleLog02Handler();

    eventDispatcher.register("CustomerCreatedEvent", console01Handler);
    eventDispatcher.register("CustomerCreatedEvent", console02Handler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zip: customer.Address.zip,
      city: customer.Address.city,
    });

    eventDispatcher.notify(customerCreatedEvent);

    return customer.id;
  }
}
