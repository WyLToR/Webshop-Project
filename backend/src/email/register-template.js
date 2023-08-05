export default function (to, params, templateId) {
  return ({
    to,
    templateId: templateId || 2,
    params,
    headers: {
      'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
      charset: 'iso-8859-1',
    },
  });
}
