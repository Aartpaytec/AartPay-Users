export default async function handler(req, res) {
  const body = req.body;
  if (body?.event === "charge.completed" && body?.data?.status === "successful") {
    console.log("ESCROW PAID:", body.data.amount, body.data.tx_ref);
  }
  res.status(200).json({ ok: true });
}
