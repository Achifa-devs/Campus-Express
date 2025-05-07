import pool from "../../db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return Response.json({ error: 'Missing user_id' }, { status: 400 });
  }

  try {

    const [shippingInfo, payoutInfo, shopInfo] = await Promise.all([
    //   pool.query(`SELECT * FROM customer_care WHERE user_id = '${user_id}'`).then(r => r.rows),
    //   pool.query(`SELECT * FROM return WHERE user_id = '${user_id}'`).then(r => r.rows),
      pool.query(`SELECT * FROM shipping WHERE user_id = '${user_id}'`).then(r => r.rows),
      pool.query(`SELECT * FROM payment WHERE user_id = '${user_id}'`).then(r => r.rows),
      pool.query(`SELECT * FROM shopss WHERE user_id = '${user_id}'`).then(r => r.rows),
    ]);

    const ship = shippingInfo?.[0] || {};
    // const refund = returnAddress?.[0] || {};
    const payment = payoutInfo?.[0] || {};
    // const shop = customerCare?.[0] || {};

    const hasShippingInfo = Object.keys(ship).length > 0;
    // const hasReturnAddress = Object.keys(refund).length > 0;
    const hasPayoutInfo = Object.keys(payment).length > 0;
    // const hasShopInfo = Object.keys(shop).length > 0;

    const shipping_return_bool = hasShippingInfo;

    return Response.json({
      paymentInfo: hasPayoutInfo,
      shopInfo: true,
      shippingInfo: shipping_return_bool,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
