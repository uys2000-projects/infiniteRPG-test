/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */

String.ti;
export default async function (req, res) {
  try {
    console.log(`Request URL: ${req.url}`);
    return res.status(200).send({ status: "OK" });
  } catch (err) {
    console.log(err);
  }
  // If can not GET data, return 500 - NotSuccess
  return res.status(500).send({ status: "NOT OK" });
}
