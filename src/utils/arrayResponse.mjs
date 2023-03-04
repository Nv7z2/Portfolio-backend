/** Idk why, but lowDB returns object, but I really need to use Array methods
 * @params {Object} res - response from lowDB
 */
export default function arrayResponse(res) {
  return Object.values(res);
}
