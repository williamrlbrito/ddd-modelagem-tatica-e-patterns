import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendConsoleLogHandler
  implements EventHandlerInterface<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    const { id, name, address } = event.eventData;

    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${address}`
    );
  }
}
