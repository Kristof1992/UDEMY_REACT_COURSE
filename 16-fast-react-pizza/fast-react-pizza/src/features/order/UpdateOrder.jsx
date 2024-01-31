import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateName } from '../user/userSlice';
import { updateOrder } from '../../services/apiRestaurant';

/**
 * In order to update data we do not use fetcher.load() function, but
 * a Form Component that the Fetcher provides.
 * fetcher.Form won't navigate away from the page, it will submit and revalidate
 * the page.
 *
 * @param {Object} order Object from Create Order Component when Router calls
 */
function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button>Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

/**
 * We are calling the API here to update the object.
 *
 * store.dispatch(clearCart());
 *
 * @param {Object} request Object from Create Order Component when Router calls
 * the url "/order/:{orderID}"
 * via the async function action({ request }) {
 *    ...
 *    store.dispatch(clearCart());
 *    return redirect(`/order/${newOrder.id}`)
 * }
 * Then it updates the React Component when the update is finished
 */
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
